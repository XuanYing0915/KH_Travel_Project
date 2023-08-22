import React, { useState, useEffect } from "react";

export default function SuccessFoodTable({ orderNumber }) {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch('/cart/payment/foodsuccess', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ orderId: orderNumber })
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrderData(data);
                } else {
                    console.error('Error fetching order data');
                }
            } catch (error) {
                console.error('Error fetching order data', error);
            }
        };

        fetchOrderData();
    }, [orderNumber]);
    console.log(orderData)

    return (
        <div>
            {/* <label>
                Order Number: 
                <input type="text" value={orderNumber} readOnly />
            </label>
            {orderData && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Product</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{orderData.name}</td>
                            <td>{orderData.product}</td>
                            <td>{orderData.price}</td>
                        </tr>
                    </tbody>
                </table>
            )} */}
        </div>
    );
}

// import React,{useState} from "react";

// export default function SuccessFoodTable({ orderNumber }) {
//     const [orderData,setOrderData]=useState(null)

//     const submitMessage = async (foodsucess) => {
//         try {
//             // 假設你的後端 API 端點為 /api/messages
//             const response = await axios.post(
//                 'http://localhost:3005/cart/payment/foodsuccess',
//                 foodsuccess
//             )
//             return response.data
//         } catch (error) {
//             console.error('An error occurred while submitting the message:', error)
//             // 你也可以在這裡顯示錯誤通知給使用者
//             return null
//         }
//     }
//     const successtable = async () => {
//         const response = await submitMessage(orderNumber)
//         console.log(response)
//     }

//     return (
//         <>
            
//         </>
//         );
// }


