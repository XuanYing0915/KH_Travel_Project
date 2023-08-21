import { useState } from "react"


export default function loveIcon({ card, handleChoice, flipped, disabled }) {

    const [turns, setTurns] = useState(0) //判斷第幾輪？



    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }
    return (

        <div className="card" >
            <div className={flipped ? 'flipped' : ''}>
                <img className="front" src={card.src} alt="card front" />
                <img className="back"
                    src='/images/ticket/test-1.jpg'
                    onClick={handleClick}
                    alt='card back' />
            </div>
        </div>

    )
}
