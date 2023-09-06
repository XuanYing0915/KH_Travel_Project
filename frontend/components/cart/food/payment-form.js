import React, { useState } from "react"
import { useFoodCart } from '@/hooks/use-food-cart'
import axios from 'axios'
import moment from 'moment-timezone'
import Swal from 'sweetalert2'


function FoodPaymentForm(props) {

    const { foodItems, clearFoodCart } = useFoodCart()
    const [isLoading, setIsLoading] = useState(false);
    const sumFood = foodItems.map(t => t.itemTotal).reduce((a, b) => a + b, 0)
    //三位一撇
    function three(num) {
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');// '$' +
    }
    const [receiveData, setReceiveData] = useState({
        member_id: props.memberID,
        shipping_method: '寄送到家',
        receiver_name: '',
        receiver_phone: '',
        shipping_address: '',
        shipping_fee: 100,
        order_total: sumFood,
        grand_total: sumFood + 100,
        payment_status: '尚未付款',
        order_status: '未成立'
    })
    const generateOrderNumber = () => {
        const datePart = moment().tz('Asia/Taipei').format().slice(2, 10).replace(/-/g, '')
        const timePart = moment().tz('Asia/Taipei').format().slice(11, 16).replace(/:/g, '');

        let shipPart = 0;
        if (receiveData.shipping_method == "寄送到家") {
            shipPart = 2
        } else if (receiveData.shipping_method == "超商取貨") {
            shipPart = 3
        } else {
            shipPart = 9
        }

        const randomPart = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')
        return `${datePart}${timePart}2${shipPart}0${randomPart}`
    }
    const orderNumber = parseInt(generateOrderNumber())

    const userData = {
        user_id: props.memberID,
        receiver_name: props.username,
        shipping_address: props.useraddress,
        receiver_phone: props.userphone
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setReceiveData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSyncWithUserData = () => {
        setReceiveData((prevData) => ({
            ...prevData,
            receiver_name: userData.receiver_name,
            receiver_phone: userData.receiver_phone,
            shipping_address: userData.shipping_address
        }));
    };

    const changeShipping = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setReceiveData((prevData) => ({
            ...prevData,
            shipping_method: value,
            shipping_fee: value === "寄送到家" ? 100 : 60,
            grand_total: value === "寄送到家" ? prevData.order_total + 100 : prevData.order_total + 60
        }));
    };

    const submitForm = async (event) => {
        event.preventDefault();
        if (!/^[\u4e00-\u9fa5]{2,4}$/.test(receiveData.receiver_name)) {
            Swal.fire({
                showConfirmButton: false,
                title: '請輸入正確的中文姓名',
                timer: 1500

            })
            return;
        }

        if (!/^09\d{8}$/.test(receiveData.receiver_phone)) {
            Swal.fire({
                showConfirmButton: false,
                title: '請輸入10碼電話號碼',
                timer: 1500
            })
            return;
        }

        if (receiveData.shipping_address.trim() === '' || receiveData.shipping_address.length < 5) {
            Swal.fire({
                showConfirmButton: false,
                title: '請輸入有效的地址',
                timer: 1500
            })
            return;
        }

        // 1.送訂單資料進資料庫
        const submitMessage = async (foodpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const orderResponse = await axios.post(
                    'http://localhost:3005/cart/payment/foodcheckout',
                    foodpayment
                )
                return orderResponse.data
            } catch (error) {
                console.error('An error occurred while submitting the message:', error)
                // 你也可以在這裡顯示錯誤通知給使用者
                return null
            }
        }
        // 2.送訂單明細進資料庫
        const submitDetailMessage = async (fooddetailpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const detailResponse = await axios.post(
                    'http://localhost:3005/cart/payment/fooddetailcheckout',
                    fooddetailpayment
                )
                return detailResponse.data
            } catch (error) {
                console.error('An error occurred while submitting the message:', error)
                // 你也可以在這裡顯示錯誤通知給使用者
                return null
            }
        }
        async function asyncForEach(array) {
            for (let index = 0; index < array.length; index++) {
                array[index]["fd_orderdetails_index"] = index + 1
                array[index]["fd_order_id"] = orderNumber
                await submitDetailMessage(array[index]);
            }
        }


        let foodOrderData = { ...receiveData, fd_order_id: orderNumber, order_status: '已成立' };
        // 3.接收後端回傳表單
        const submitPayment = async (foodpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const orderResponse = await axios.post(
                    'http://localhost:3005/cart/payment/foodpayment',
                    foodpayment
                )
                const formHTML = orderResponse.data;
                // console.log(formHTML)
                if (formHTML) {

                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = formHTML;
                    document.body.appendChild(wrapper);
                    document.getElementById('_form_aiochk').submit();
                } else {
                    // 處理錯誤，沒有獲取到表單HTML
                }
            } catch (error) {
                console.error('An error occurred while submitting the message:', error)
                // 你也可以在這裡顯示錯誤通知給使用者
                return null
            }
        }
        const response = await submitMessage(foodOrderData)
        if (response && response.ok) {
            asyncForEach(foodItems)

            setIsLoading(true);
            setTimeout(() => {
                clearFoodCart()
                setIsLoading(false);
                submitPayment(foodOrderData)
            }, 1500);
        } else {
            Swal.fire({
                title: '付款失敗！',
                showConfirmButton: false,
                timer: 1500,
            })
        }


    };

    return (
        <form id="paymentForm" onSubmit={submitForm}>
            {isLoading && <img src="/loading.svg" alt="正在加载..." style={{ position: 'absolute', left: '40%', top: '35%' }} />}
            <div className="my-3 px-2 d-flex flex-wrap">

                <div className="col-md-8 ps-4 col-12">

                    <div id="send-data">
                        <label for="shipping_method"><span>運送方式</span>
                            <select id="shipping_method" name="shipping_method" value={receiveData.shipping_method} onChange={changeShipping}>
                                <option value="寄送到家">寄送到家(100元)</option>
                                {/* <option value="超商取貨">超商取貨(60元)</option> */}
                            </select>
                        </label><br/>

                        <label for="shipping_address"><span>地址</span><input type="text" id="shipping_address" name="shipping_address" value={receiveData.shipping_address} onChange={handleInputChange} required />
                        </label><br/>


                        <label for="receiver_name"><span>姓名</span>
                            <input type="text" id="receiver_name" name="receiver_name" value={receiveData.receiver_name} onChange={handleInputChange} /></label><br/>

                        <label for="receiver_phone"><span>連絡電話</span>
                            <input type="text" id="receiver_phone" name="receiver_phone" value={receiveData.receiver_phone} onChange={handleInputChange} /></label>

                    </div>
                    <div className="col-12 d-flex align-items-end">
                        <input type="button" onClick={handleSyncWithUserData} className="btn mt-4" value="同會員資料" style={{ background: '#7fb8b6', color: '#fff' }} />
                    </div>

                </div>
                <div className="col-md-4 col-12 d-flex  justify-content-between flex-wrap">
                
                    <div className="col-8 pt-5">
                        <p>商品金額</p>
                        <p>運費</p>
                        <hr />

                        <p className="fw-bolder">訂單總金額</p>
                    </div>
                    <div className="col-4 product-price pt-5">
                        <p className="text-right">${three(sumFood)}</p>
                        <p className="text-right">${three(receiveData.shipping_fee)}</p>
                        <hr />
                        <p className="fw-bolder text-primary">${three(receiveData.grand_total)}</p>
                    </div>

                    <div className="submit-btn col-12 d-flex align-items-end justify-content-end">
                        <input type="submit" value="確定購買" className="btn btn-secondary" style={{ color: '#fff', letterSpacing: '2px' }} />
                    </div>
                </div>




            </div>


        </form>
    );
}

export default FoodPaymentForm;