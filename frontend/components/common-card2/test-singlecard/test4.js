import { useEffect, useState } from "react"
import SingleCard2 from '@/components/common-card2/test-singlecard/test-singlecard2'



const cardlist = [
    { 'value': '動物園', 'matched': false, },
    { 'value': '親子遊玩', 'matched': false, },
    { 'value': '樂園優惠', 'matched': false, },
    { 'value': '展覽優惠', 'matched': false, },
    { 'value': '電影優惠', 'matched': false, },
    { 'value': '古蹟', 'matched': false, },
]

export default function Counter() {

    const [cards, setCards] = useState([]) //卡片
    const [turns, setTurns] = useState(0) //拿來判斷 假設turns = 0 關閉遊戲畫面
    const [choiceOne, setChoiceOne] = useState(null) //點選的第一個卡片


    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardlist]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setChoiceOne(null)
        setCards(shuffledCards)
        setTurns(1)
    }


    //handle a chice
    const handleChoice = (card) => {
        // console.log(card)
        setChoiceOne(card)
        setTimeout(() => setTurns(0), 1000)
    }

    // selected cards and change
    //2.未做--> 點選後跳出視窗 並關閉此畫面
    useEffect(() => {

        if (choiceOne) {
            // console.log('those cards match')
            setCards(prevCards => {
                return prevCards.map(card => {
                    if (card.value === choiceOne.value) {
                        return { ...card, matched: true }
                    } else {
                        return card
                    }
                })
            })
        }

    }, [choiceOne])
    // console.log(cards)

    return (
        <>
            <div className="test-draw2">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button onClick={shuffleCards}>test click</button>

                {turns ? <div className="card-grid">
                    {cards.map(card => (
                        <SingleCard2
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card.matched}
                        />
                    ))}
                </div> : ''}

            </div>
        </>
    );





}