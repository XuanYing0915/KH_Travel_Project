import React, { useState } from "react";
import { useTicketCart } from "@/hooks/use-ticket-cart";

function TicketPaymentForm(props) {
    const {ticketItems} = useTicketCart()
    const sumTicket = ticketItems.map(t => t.itemTotal).reduce((a, b) => a + b, 0)
    const [receiveData, setReceiveData] = useState({
        member_id: props.memberID,
        shipping_method: '無實體商品',
        payment: '信用卡線上付款',
        receiver_name: '',
        receiver_phone: '',
        shipping_fee: '0',
        order_total:sumTicket,
        grand_total:sumTicket
    });

    const userData = {
        receiver_name: props.username,
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
        }));
    };

    const submitForm = (event) => {
        event.preventDefault();
        console.log(receiveData);
    };

    return (
        <form onSubmit={submitForm}>
            <div className="my-3">
                <label>付款方式</label><br />
                <select id="payment" name="payment" value={receiveData.payment} onChange={handleInputChange}>
                    <option value="信用卡線上付款">信用卡線上付款</option>
                    <option value="ATM付款">ATM付款</option>
                </select><br />

                <label>姓名</label><br />
                <input type="text" id="receiver_name" value={receiveData.receiver_name} onChange={handleInputChange} /><br />

                <label>連絡電話</label><br />
                <input type="text" id="receiver_phone" name="receiver_phone" value={receiveData.receiver_phone} onChange={handleInputChange} /><br />

                <button onClick={handleSyncWithUserData}  className="btn btn-primary">同會員資料</button>
                
            </div>
            <input type="submit" value="確定購買" className="btn btn-secondary"/>
        </form>
    );
}

export default TicketPaymentForm;
