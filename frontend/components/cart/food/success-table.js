import React, { useState, useEffect } from "react";

export default function SuccessFoodTable({ orderNumber }) {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch("http://localhost:3005/cart/payment/foodsuccess", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ orderId: parseInt(orderNumber) })
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrderData(data);
                    console.log(data);
                } else {
                    console.error('Error fetching order data');
                }
            } catch (error) {
                console.error('Error fetching order data', error);
            }
        };

        fetchOrderData();
    }, [orderNumber]);


    return (
        <div>
            {orderData && (
                <div>
                    <ul>
                        <li>訂單編號<span style={{ marginLeft: '15px' }}>{orderNumber}</span></li>
                        <li>訂購日期<span style={{ marginLeft: '15px' }}>{orderData[0].order_date.slice(0, 10)}</span></li>
                        <li>付款方式<span style={{ marginLeft: '15px' }}>{orderData[0].payment}</span></li>
                        <li>運送方式<span style={{ marginLeft: '15px' }}>{orderData[0].shipping_method}</span></li>
                    </ul>
                    <hr />
                    <p>{orderData[0].receiver_name}</p>
                    <p>{orderData[0].receiver_phone}</p>
                    <p>{orderData[0].shipping_address}</p>
                    <hr />
                </div>



            )}
        </div>
    );
}
