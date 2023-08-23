import { useEffect, useState } from 'react'
import Luckcard from '@/components/common-card2/test-singlecard/luck-card'
//彈跳視窗
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const cardlist = [
  { value: '動物園', matched: false },
  { value: '親子遊玩', matched: false },
  { value: '樂園優惠', matched: false },
  { value: '展覽優惠', matched: false },
  { value: '電影優惠', matched: false },
  { value: '古蹟', matched: false },
]

export default function Counter() {
  const [cards, setCards] = useState([]) //卡片

  const [show, setShow] = useState(false) //判斷彈跳視窗

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardlist]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    // setShow(true)
  }


  // console.log('choiceOne', choiceOne);

  // selected cards and change
  //2.未做--> 點選後跳出視窗 並關閉此畫面
  // useEffect(() => {
  //   if (choiceOne) {
  //     // console.log('those cards match')
  //     setCards((prevCards) => {
  //       return prevCards.map((card) => {
  //         if (card.value === choiceOne.value) {
  //           return { ...card, matched: true }
  //         } else {
  //           return card
  //         }
  //       })
  //     })
  //   }
  // }, [choiceOne])
  // console.log(cards)
  // 利用bs彈跳視窗

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        dialogClassName="draw-box"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            本次幸運分類
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row sl={{ cols: 3 }} xl={{ cols: 3 }}>
              {cards.map((card) => (
                <Col>
                  <Luckcard
                    key={card.id}
                    card={card}
                    handleClose={handleClose}
                    setShow={setShow}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  return (
    <>
      <div className="test-draw">
        <button
          onClick={() => {
            handleShow()
            shuffleCards()
          }}
        >
          test click
        </button>

        {/* {turns ? ( */}

        <MyVerticallyCenteredModal
          show={show}
          onHide={() => handleClose()}
          backdrop="static"
          keyboard={false}
        />

        {/* ) : ( */}
        {/* '' */}
        {/* )} */}
      </div>
    </>
  )
}
