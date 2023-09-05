import React, { useState, useEffect } from "react";

export default function SuccessFoodTable({ orderNumber }) {
    const [orderData, setOrderData] = useState(null);
    const [detailData, setDetailData] = useState([]);

    useEffect(() => {
        if (orderNumber) {

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
                        // console.log(data);
                    } else {
                        console.error('Error fetching order data');
                    }
                } catch (error) {
                    console.error('Error fetching order data', error);
                }
            };
            const fetchDetailData = async () => {
                try {
                    const response = await fetch("http://localhost:3005/cart/payment/fooddetailsuccess", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ orderId: parseInt(orderNumber) })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setDetailData(data);
                        console.log(detailData);
                    } else {
                        console.error('Error fetching order data');
                    }
                } catch (error) {
                    console.error('Error fetching order data', error);
                }
            };

            fetchOrderData();
            fetchDetailData();
        }
    }, [orderNumber]);
    // console.log(orderData)
    function three(num) {
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');// '$' +
    }

    return (
        <>
            {orderData && orderData[0] && (
                <div >
                    {orderData[0].order_status == "已成立" && (
                        <h4 className="text-center pt-3 fw-bold">訂單已成立!</h4>
                    )}
                    <ul className="my-4 mx-3">
                        <li>訂單編號<span className="ms-4">{orderNumber}</span></li>
                        <li>訂單狀態<span className="ms-4">{orderData[0].order_status}</span></li>
                        <li>付款狀態<span className="ms-4">{orderData[0].payment_status}</span></li>

                        <li>訂購日期<span className="ms-4">{orderData[0].order_date.slice(0, 10)}</span></li>
                        <li>運送方式<span className="ms-4">{orderData[0].shipping_method}</span></li>
                    </ul>
                    <hr />
                    <div className="ms-5">
                        <p>{orderData[0].receiver_name}</p>
                        <p>{orderData[0].receiver_phone}</p>
                        <p>{orderData[0].shipping_address}</p>
                    </div>

                    <hr />
                </div>



            )}
            {orderData && orderData[0] && detailData && detailData.length > 0 && (
                <div className="overflow-hidden mx-5">
                    <table className="col-12 my-4 " >
                        <thead >
                            <tr>
                                <th className="col-6 pb-2 ps-3" style={{fontSize:'18px'}}>品項</th>
                                <th style={{fontSize:'18px'}}>單價</th>
                                <th style={{fontSize:'18px'}}>數量</th>
                                <th className="text-end pe-4 col-2" style={{fontSize:'18px'}}>小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailData.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 ">◦ {item.product_name}</td>
                                    <td className="py-2 ">${three(item.product_price)}</td>
                                    <td className="py-2 ps-3">{item.product_quantity}</td>
                                    <td className="text-end pe-4 col-2 py-2" > ${three(item.item_total)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="fw-bolder pt-3 pb-2 border-top">商品總計</td>
                                <td className="pt-3 pb-2 border-top"></td>
                                <td className="pt-3 pb-2  border-top"></td>
                                <td className="fw-bolder pt-3 pb-2 border-top text-end pe-4 col-2">${three(orderData[0].order_total)}</td>
                            </tr>
                            <tr>
                                <td className="pb-3 border-bottom">運費</td>
                                <td className="pb-3 border-bottom"></td>
                                <td className="pb-3 border-bottom"></td>
                                <td className="pb-3 border-bottom text-end pe-4 col-2">${orderData[0].shipping_fee}</td>
                            </tr>
                            <tr>
                                <td className="fw-bold text-primary" style={{fontSize:'18px'}}>訂單總金額</td>
                                <td></td>
                                <td></td>
                                <td className="fw-bold text-primary py-3 text-end pe-4 col-2" style={{fontSize:'18px'}}>${three(orderData[0].grand_total)}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
