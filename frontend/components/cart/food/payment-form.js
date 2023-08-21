import React, { useState } from "react"
import { useFoodCart } from '@/hooks/use-food-cart'
import axios from 'axios'
import moment from 'moment-timezone'



function FoodPaymentForm(props) {
    const { foodItems, clearFoodCart } = useFoodCart()

    const sumFood = foodItems.map(t => t.itemTotal).reduce((a, b) => a + b, 0)
    const [receiveData, setReceiveData] = useState({
        member_id: props.memberID,
        shipping_method: '寄送到家',
        payment: '信用卡線上付款',
        receiver_name: '',
        receiver_phone: '',
        shipping_address: '',
        shipping_fee: 100,
        order_total: sumFood,
        grand_total: sumFood + 100
    });

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

    const handleSyncWithUserData = () => {
        setReceiveData((prevData) => ({
            ...prevData,
            receiver_name: userData.receiver_name,
            receiver_phone: userData.receiver_phone,
            shipping_address: userData.shipping_address
        }));
    };

    const changeShipping = (event) => {
        const { value } = event.target;
        setReceiveData((prevData) => ({
            ...prevData,
            shipping_method: value,
            shipping_fee: value === "寄送到家" ? 100 : 60,
            grand_total: value === "寄送到家" ? prevData.order_total + 100 : prevData.order_total + 60
        }));
    };

    // 訂單編號生成
    const generateOrderNumber = () => {
        const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '')
        const timePart = moment().tz('Asia/Taipei').format().slice(11, 19).replace(/:/g, '');

        let shipPart = 0
        if (receiveData.shipping_method != "超商取貨" && receiveData.shipping_method != "寄送到家") {
            shipPart = 9
        } if (receiveData.shipping_method == "寄送到家") {
            shipPart = 2
        } if (receiveData.shipping_method == "超商取貨") {
            shipPart = 3
        }


        const randomPart = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')
        console.log(`${datePart}${timePart}3${shipPart}2${randomPart}`
        )
        return `${datePart}${timePart}3${shipPart}2${randomPart}`
    }

    const submitForm = async (event) => {
        event.preventDefault();
        console.log(receiveData);
        // clearFoodCart()
        const orderNumber = generateOrderNumber() // 生成訂單號

    };

    return (
        <form onSubmit={submitForm}>
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

                    <button onClick={handleSyncWithUserData} className="btn btn-primary my-2">同會員資料</button></div>

                <div>
                    <input type="submit" value="確定購買" className="btn btn-secondary" />
                </div>

            </div>

        </form>
    );
}

export default FoodPaymentForm;