import React, { useState } from "react"
import { useTicketCart } from "@/hooks/use-ticket-cart"
import axios from 'axios'
import moment from 'moment-timezone'
import Swal from 'sweetalert2'



function TicketPaymentForm(props) {


    const { ticketItems, clearTicketCart } = useTicketCart()
    const [isLoading, setIsLoading] = useState(false);

    const sumTicket = ticketItems.map(t => t.itemTotal).reduce((a, b) => a + b, 0)
    const [receiveData, setReceiveData] = useState({
        member_id: props.memberID,
        shipping_method: '無實體商品',
        receiver_name: '',
        receiver_phone: '',
        shipping_fee: '0',
        order_total: sumTicket,
        grand_total: sumTicket,
        payment_status: '尚未付款',
        order_status: '未成立'

    });

    const userData = {
        user_id: props.memberID,
        receiver_name: props.username,
        receiver_phone: props.userphone
    };

    const generateOrderNumber = () => {
        const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '')
        const timePart = moment().tz('Asia/Taipei').format().slice(11, 16).replace(/:/g, '');

        const randomPart = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0')

        return `${datePart}${timePart}310${randomPart}`
    }

    const orderNumber = parseInt(generateOrderNumber())


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
    const ticketOrderData = { ...receiveData, tk_order_id: orderNumber }


    const submitForm = async (event) => {

        event.preventDefault();
        // 1.送訂單資料進資料庫
        const submitMessage = async (ticketpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const orderResponse = await axios.post(
                    'http://localhost:3005/cart/payment/ticketcheckout',
                    ticketpayment
                )

                return orderResponse.data
            } catch (error) {
                console.error('An error occurred while submitting the message:', error)
                // 你也可以在這裡顯示錯誤通知給使用者
                return null
            }
        }
        // 2.送訂單明細進資料庫

        const submitDetailMessage = async (ticketdetailpayment) => {
            try {
                const detailResponse = await axios.post(
                    'http://localhost:3005/cart/payment/ticketdetailcheckout',
                    ticketdetailpayment
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
                array[index]["tk_orderdetails_index"] = index + 1
                array[index]["tk_order_id"] = orderNumber
                await submitDetailMessage(array[index]);
            }
        }

        let ticketOrderData = { ...receiveData, tk_order_id: orderNumber, order_status: '已成立' };
        // 3.接收後端回傳表單
        const submitPayment = async (ticketpayment) => {
            try {
                // 假設你的後端 API 端點為 /api/messages
                const orderResponse = await axios.post(
                    'http://localhost:3005/cart/payment/ticketpayment',
                    ticketpayment
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

        const response = await submitMessage(ticketOrderData)
        if (response && response.ok) {

            asyncForEach(ticketItems)

            setIsLoading(true);
            setTimeout(() => {
                clearTicketCart()
                setIsLoading(false);
                submitPayment(ticketOrderData)
            }, 1500);
        } else {
            Swal.fire({
                title: '付款失敗！',
                showConfirmButton: false,
                timer: 1500,
            })
            return
        }
    }

    return (
        <form id="paymentForm" onSubmit={submitForm}>
            {isLoading && <img src="/loading.svg" alt="正在加载..." style={{ position: 'absolute', left: '40%', top: '35%' }} />}

            <div className="my-3 px-2 d-flex">
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
