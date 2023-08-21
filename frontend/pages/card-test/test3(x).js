import { useEffect, useState } from "react"
import SingleCard from '@/components/common-card2/test-singlecard/test-singlecard'


//需要放入的屬性值
const cardlist = [
    { 'src': '/images/ticket/人生紀念品-1.webp', matched: false },
    { 'src': '/images/ticket/人生紀念品-2.jpg', matched: false },
    { 'src': '/images/ticket/人生紀念品-3.jpg', matched: false },
    { 'src': '/images/ticket/千野村日式景觀餐廳.jpeg', matched: false },
    { 'src': '/images/ticket/小蒙牛頂級麻辣養生鍋餐卷.png', matched: false },
    { 'src': '/images/ticket/打狗英國領事館2.jpg', matched: false },
]

export default function Counter() {

    const [cards, setCards] = useState([]) //卡片
    const [turns, setTurns] = useState(0) //判斷第幾輪？
    const [choiceOne, setChoiceOne] = useState(null) //one card
    const [choiceTwo, setChoiceTwo] = useState(null) //two card
    const [disabled, setDisabled] = useState(false) //two card


    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardlist, ...cardlist]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }
    // console.log(cards, turns);

    //handle a chice
    const handleChoice = (card) => {
        console.log(card)
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare 2 selected cards
    useEffect(() => {
        setDisabled(true)
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                // console.log('those cards match')
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }

                    })
                })
                resetTurn()
            } else {
                // console.log('those cards do not match');
                setTimeout(() => resetTurn(), 1000)

            }
        }

    }, [choiceOne, choiceTwo])
    // console.log(cards)
    //reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1) //原始值+1
        setDisabled(false)
    }

    // start a new game automagically
    useEffect(() => { shuffleCards() }, [])
    return (
        <>
            <div className="test-draw">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <button onClick={shuffleCards}>test click</button>


                <div className="card-grid">
                    {cards.map(card => (
                        <SingleCard
                            key={card.id}
                            card={card}
                            handleChoice={handleChoice}
                            flipped={card === choiceOne || card == choiceTwo || card.matched} />
                    ))}
                </div>
                <div>{turns}</div>
            </div>
        </>
    );





}