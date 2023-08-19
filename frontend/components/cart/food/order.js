import React from "react";
import { useState } from "react";
import { useFoodCart } from '@/hooks/use-food-cart';
export default function FoodOrder() {
    const { foodItems } = useFoodCart()
    const [active, setActive] = useState('active')
    //三位一撇
    function three(num) {
        const parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');// '$' +
    }

    return (
        <div id="food-confirm">

            <table className="col-12 mb-5 order-confirm">
                <thead >
                    <tr >
                        <th>訂單商品</th>

                        <th>單價</th>
                        <th>數量</th>
                        <th>小計</th>
                    </tr>
                </thead>
                <tbody >
                    {foodItems.map((f) => {
                        return (
                            <tr key={f.id}>

                                <td>
                                    <img src={'/images/food/' + `${f.img_src}`} alt={f.img_src}></img>


                                    <span>{f.name}</span>
                                </td>
                                <td>${three(f.price)}</td>
                                <td>{f.quantity}</td>
                                <td>${three(f.itemTotal)}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}
