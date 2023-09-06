import React, { useState, useEffect } from "react";

export default function SuccessTicketTable({ orderNumber }) {
  const [orderData, setOrderData] = useState(null);
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    if (orderNumber) {
      const fetchOrderData = async () => {
        try {
          const response = await fetch("http://localhost:3005/cart/payment/ticketsuccess", {
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
          const response = await fetch("http://localhost:3005/cart/payment/ticketdetailsuccess", {
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


  return (
    <>
      {orderData && orderData[0] && (
        <div>
          <ul>
            <li>訂單編號<span style={{ marginLeft: '15px' }}>{orderNumber}</span></li>
            <li>訂單狀態<span style={{ marginLeft: '15px' }}>{orderData[0].order_status}</span></li>
            <li>付款狀態<span style={{ marginLeft: '15px' }}>{orderData[0].payment_status}</span></li>
            <li>訂購日期<span style={{ marginLeft: '15px' }}>{orderData[0].order_date.slice(0, 10)}</span></li>
          </ul>
          <hr />
          <p>{orderData[0].receiver_name}</p>
          <p>{orderData[0].receiver_phone}</p>
          <hr />
        </div>



      )}
      {orderData && orderData[0] && detailData && detailData.length > 0 && (
        <div>

          <table className="col-12">
            <thead>
              <tr>
                <th className="col-6">品項</th>
                <th>單價</th>
                <th>數量</th>
                <th>小計</th>
              </tr>
            </thead>
            <tbody>
              {detailData.map((item, index) => (
                <tr key={index}>
                  <td> {item.product_name}</td>
                  <td>{item.product_price}</td>
                  <td>{item.product_quantity}</td>
                  <td> {item.item_total}</td>
                </tr>
              ))}
              <tr>
                <td>訂單總計</td>
                <td></td>
                <td></td>
                <td>{orderData[0].grand_total}</td>
              </tr>


            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
