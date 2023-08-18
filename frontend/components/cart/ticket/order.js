import React from "react";
import { useFoodCart } from '@/hooks/use-food-cart';
import { useTicketCart } from "@/hooks/use-ticket-cart";
export default function TicketOrder() {
    const { ticketItems } = useTicketCart()
    //三位一撇
    function three(num) {
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');// '$' +
    }

    return (
        <div id="ticket-confirm">

            <table className="col-12 mb-5 order-confirm">
                <thead>
                    <tr>
                        <th>訂單商品</th>

                        <th>單價</th>
                        <th>數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody className="toggle">
                    {ticketItems.map((t) => {
                        return (
                            <tr key={t.id}>

                                <td>
                                    <img src={"/images/ticket/" + `${t.img}`} alt={t.name}></img>


                                    <span>{t.name}</span>
                                </td>
                                <td>${three(t.price)}</td>
                                <td>{t.quantity}</td>
                                <td>${three(t.itemTotal)}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}
