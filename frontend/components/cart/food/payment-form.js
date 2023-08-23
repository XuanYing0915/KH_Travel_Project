import React, { useState } from "react"
import { useFoodCart } from '@/hooks/use-food-cart'
import axios from 'axios'
import moment from 'moment-timezone'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'


function FoodPaymentForm(props) {
    const [paymentStatus, setPaymentStatus] = useState('')

    const { foodItems, clearFoodCart } = useFoodCart()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    // 信用卡動畫
    const [creditCard, setCreditCard] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    })

    const sumFood = foodItems.map(t => t.itemTotal).reduce((a, b) => a + b, 0)

    const [receiveData, setReceiveData] = useState({
        member_id: props.memberID,
        payment: '信用卡線上付款',
        shipping_method: '寄送到家',
        receiver_name: '',
        receiver_phone: '',
        shipping_address: '',
        shipping_fee: 100,
        order_total: sumFood,
        grand_total: sumFood + 100,
        payment_status: '尚未付款'

    });
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
        let payPart = 0;
        if (receiveData.payment == "信用卡線上付款") {
            payPart = 1
        } else if (receiveData.payment == "ATM付款") {
            payPart = 2
        } else if (receiveData.payment == "貨到付款") {
            payPart = 3
        } else {
            payPart = 9
        }


        const randomPart = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')
        //     console.log(shipPart)
        // console.log(`${datePart}${timePart}2${shipPart}${payPart}${randomPart}`
        // )
        return `${datePart}${timePart}2${shipPart}${payPart}${randomPart}`
    }
    // 會員資料
    const userData = {
        receiver_name: props.username,
        shipping_address: props.useraddress,
        receiver_phone: props.userphone
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReceiveData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreditCardInputChange = (event) => {
        const { name, value } = event.target;
        setCreditCard((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCreditCardFocus = (evt) => {
        setCreditCard((prev) => ({ ...prev, focus: evt.target.name }))
    }

    const handleSyncWithUserData = (event) => {
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
    const orderNumber = parseInt(generateOrderNumber())
    const foodOrderData = { ...receiveData, fd_order_id: orderNumber }
    const validateCardDetails = (number, name, expiry, cvc) => {
        const cardNumberPattern = /^\d{16}$/ // 16位數字
        const cardNamePattern = /^[a-zA-Z\s\u4e00-\u9fa5]+$/
        const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/ // MM/YY 或 MM/YYYY 格式
        const cvcPattern = /^\d{3}$/ // 3或4位數字

        if (!cardNumberPattern.test(number)) return '卡號無效'
        if (!cardNamePattern.test(name)) return '姓名無效'
        if (!expiryPattern.test(expiry)) return '到期日期無效'
        if (!cvcPattern.test(cvc)) return '安全碼無效'

        return true
    }
    // const handleInputFocus = (evt) => {
    //     setState((prev) => ({ ...prev, focus: evt.target.name }))
    // }
    const submitForm = async (event) => {

        event.preventDefault();
        // clearFoodCart()
        if (receiveData.payment == "信用卡線上付款") {
            const validationMessage = validateCardDetails(
                creditCard.number,
                creditCard.name,
                creditCard.expiry,
                creditCard.cvc
            )
            if (validationMessage !== true) {
                setPaymentStatus(validationMessage) // 使用具體的錯誤消息
                return // 如果信用卡信息無效，則退出函數
            }
        }



        const submitMessage = async (foodpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const response = await axios.post(
                    'http://localhost:3005/cart/payment/foodcheckout',
                    foodpayment
                )
                return response.data
            } catch (error) {
                console.error('An error occurred while submitting the message:', error)
                // 你也可以在這裡顯示錯誤通知給使用者
                return null
            }
        }
        const submitDetailMessage = async (fooddetailpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const response = await axios.post(
                    'http://localhost:3005/cart/payment/fooddetailcheckout',
                    fooddetailpayment
                )
                return response.data
            } catch (error) {
                console.error('An error occurred while submitting the message:', error)
                // 你也可以在這裡顯示錯誤通知給使用者
                return null
            }
        }

        const response = await submitMessage(foodOrderData)


        async function asyncForEach(array) {
            for (let index = 0; index < array.length; index++) {
                array[index]["fd_orderdetails_index"] = index + 1
                array[index]["fd_order_id"] = orderNumber
                console.log(array)
                await submitDetailMessage(array[index]);
            }
        }
        asyncForEach(foodItems)

        if (response && response.ok) {
            setIsLoading(true);
            setTimeout(() => {
                clearFoodCart()
                setIsLoading(false);
                router.push({
                    pathname: 'http://localhost:3000/cart/payment/food/success',
                    query: {
                        orderNumber
                    },
                });
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
        <form onSubmit={submitForm}>
            {isLoading && <img src="/loading.svg" alt="正在加载..." style={{ position: 'absolute', left: '40%', top: '35%' }} />}
            <div className="my-3 px-2 d-flex">
                <div className="col-4">
                    <label>運送方式</label><br />
                    <select id="shipping_method" name="shipping_method" value={receiveData.shipping_method} onChange={changeShipping}>
                        <option value="寄送到家">寄送到家(100元)</option>
                        <option value="超商取貨">超商取貨(60元)</option>
                    </select><br />

                    <label>付款方式</label><br />
                    <select id="payment" name="payment" value={receiveData.payment} onChange={handleInputChange}>
                        <option value="信用卡線上付款">信用卡線上付款</option>
                        <option value="ATM付款">ATM付款</option>
                        <option value="貨到付款">貨到付款</option>
                    </select><br />
                </div>
                <div className="col-6">
                    <label>地址</label><br />
                    <input type="text" id="shipping_address" name="shipping_address" value={receiveData.shipping_address} onChange={handleInputChange} /><br />

                    <label>姓名</label><br />
                    <input type="text" id="receiver_name" name="receiver_name" value={receiveData.receiver_name} onChange={handleInputChange} /><br />

                    <label>連絡電話</label><br />
                    <input type="text" id="receiver_phone" name="receiver_phone" value={receiveData.receiver_phone} onChange={handleInputChange} /><br />

                    <input type="button" onClick={handleSyncWithUserData} className="btn btn-primary my-2" value="同會員資料" />
                </div>

                <div>
                    <input type="submit" value="確定購買" className="btn btn-secondary" />
                </div>

            </div>
            {receiveData.payment === "信用卡線上付款" && (

                <div>
                    <Cards
                        number={creditCard.number}
                        expiry={creditCard.expiry}
                        cvc={creditCard.cvc}
                        name={creditCard.name}
                        focused={creditCard.focus}
                    />
                    <div style={{ margin: '10px' }}>
                        <h4 style={{ color: 'red' }}>{paymentStatus}</h4>
                    </div>
                    <label>卡號</label><br />
                    <input type="text" name="number" placeholder="Card Number"
                        value={creditCard.number} onChange={handleCreditCardInputChange}
                        onFocus={handleCreditCardFocus} required /><br />
                    <label>到期日</label><br />
                    <input type="text" name="expiry" placeholder="MM/YY"
                        value={creditCard.expiry} onChange={handleCreditCardInputChange}
                        onFocus={handleCreditCardFocus} required /><br />
                    <label>CVC</label><br />
                    <input type="text" name="cvc" placeholder="Card CVC"
                        value={creditCard.cvc} onChange={handleCreditCardInputChange}
                        onFocus={handleCreditCardFocus} required /><br />
                    <label>姓名</label><br />
                    <input type="text" name="name" placeholder="Name"
                        value={creditCard.name} onChange={handleCreditCardInputChange}
                        onFocus={handleCreditCardFocus} required /><br />
                </div>
            )}

        </form>
    );
}

export default FoodPaymentForm;