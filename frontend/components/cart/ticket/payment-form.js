import React, { useState } from "react";
import { useTicketCart } from "@/hooks/use-ticket-cart";
import axios from 'axios'
import moment from 'moment-timezone'
import Swal from 'sweetalert2'

function TicketPaymentForm(props) {
    const { ticketItems, clearTicketCart } = useTicketCart()
    const sumTicket = ticketItems.map(t => t.itemTotal).reduce((a, b) => a + b, 0)
    const [receiveData, setReceiveData] = useState({
        member_id: props.memberID,
        shipping_method: '無實體商品',
        payment: '信用卡線上付款',
        receiver_name: '',
        receiver_phone: '',
        shipping_fee: '0',
        order_total: sumTicket,
        grand_total: sumTicket,
        payment_status: '尚未付款'
    });

    const userData = {
        receiver_name: props.username,
        receiver_phone: props.userphone
    };
    const generateOrderNumber = () => {
        const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '')
        const timePart = moment().tz('Asia/Taipei').format().slice(11, 16).replace(/:/g, '');

        const shipPart = 1;

        let payPart = 0;
        if (receiveData.payment == "信用卡線上付款") {
            payPart = 1
        } else if (receiveData.payment == "ATM付款") {
            payPart = 2
        } else {
            payPart = 9
        }


        const randomPart = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')
        //     console.log(shipPart)
        // console.log(`${datePart}${timePart}2${shipPart}${payPart}${randomPart}`
        // )
        return `${datePart}${timePart}3${shipPart}${payPart}${randomPart}`
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
        }));
    };
    const orderNumber = parseInt(generateOrderNumber())
    const ticketOrderData={...receiveData,tk_order_id: orderNumber}
    console.log(ticketOrderData)


    const submitForm = async (event) => {

        event.preventDefault();
        // clearTicketCart()
        // setReceiveData((prevData) => ({
        //     ...prevData,
        //     tk_order_id: parseInt(orderNumber)
        // }));

        
        const submitMessage = async (ticketpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const response = await axios.post(
                    'http://localhost:3005/cart/payment/ticketcheckout',
                    ticketpayment
                )
                return response.data
            } catch (error) {
                console.error('An error occurred while submitting the message:', error)
                // 你也可以在這裡顯示錯誤通知給使用者
                return null
            }
        }
        const submitDetailMessage = async (ticketdetailpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const response = await axios.post(
                    'http://localhost:3005/cart/payment/ticketdetailcheckout',
                    ticketdetailpayment
                )
                return response.data
            } catch (error) {
                console.error('An error occurred while submitting the message:', error)
                // 你也可以在這裡顯示錯誤通知給使用者
                return null
            }
        }

        const response = await submitMessage(ticketOrderData)

        async function asyncForEach(array) {
            for (let index = 0; index < array.length; index++) {
                array[index]["tk_orderdetails_index"] = index + 1
                array[index]["tk_order_id"] = orderNumber
                console.log(array)
                await submitDetailMessage(array[index]);
            }
        }
        asyncForEach(ticketItems)



        if (response && response.ok) {
            Swal.fire({
                icon: 'success',
                title: '付款成功！',
                showConfirmButton: false,
                timer: 1500,
            })
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
            <div className="my-3 px-2 d-flex">
                <div className="col-4">
                    <label>付款方式</label><br />
                    <select id="payment" name="payment" value={receiveData.payment} onChange={handleInputChange}>
                        <option value="信用卡線上付款">信用卡線上付款</option>
                        <option value="ATM付款">ATM付款</option>
                    </select><br />
                </div>
                <div className="col-6">
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

        </form>
    );
}

export default TicketPaymentForm;
