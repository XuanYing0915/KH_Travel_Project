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
                <ul>
                    <li>付款方式<span style={{marginLeft:'10px'}}>{orderData[0].payment}</span></li>
                    <li>{orderData[0].receiver_name}</li>
                    <li>{orderData[0].receiver_phone}</li>
                    <li>{orderData[0].shipping_method}</li>
                    {/* Add more li elements for other data */}
                </ul>
                
            )}
        </div>
    );
}
