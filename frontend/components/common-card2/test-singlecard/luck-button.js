import { useState, useEffect, useContext } from 'react'
import { CartContext } from '@/components/hotel/CartContext'
import Luckcard from '@/components/common-card2/test-singlecard/luck-card'
//彈跳視窗
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證
import MemberError from './member-error'



const cardlist = [
  { value: '展覽優惠', matched: false },
  { value: '展覽優惠', matched: false },
  { value: '展覽優惠', matched: false },
  { value: '展覽優惠', matched: false },
  { value: '展覽優惠', matched: false },
  { value: '展覽優惠', matched: false },
  { value: '展覽優惠', matched: false },
]

export default function Counter() {
  const [cards, setCards] = useState([]) //卡片

  const [show, setShow] = useState(false) //判斷彈跳視窗

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [imgstyle, setImgstyle] = useState(1)
  //會員狀態
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id

  const { discount, setDiscount } = useContext(CartContext) //有類別優惠 ('1111')





  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardlist]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    // setShow(true)
  }
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth > 1199) {
        setImgstyle(1)
      }
      if (windowWidth < 1200) {
        setImgstyle(2)
      }
      if (windowWidth < 800) {
        setImgstyle(3)
      }
    }

    // 初始設置
    handleResize()

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize)

    // 在清理 effect 時取消事件監聽
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [authJWT.isAuth, discount])


  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        dialogClassName="draw-box"
        contentClassName='modal-back'
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            本次幸運抽獎
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Container>
            <Row sl={{ cols: 4 }} xl={{ cols: 4 }}>
              {cards.map((card, i) => (
                <Col>
                  <Luckcard
                    key={card.id}
                    card={card}
                    handleClose={handleClose}
                    setShow={setShow}
                    i={i}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
  return (
    <>
      <div>
        <button
          className={
            (discount == '1111') ? 'test-draw test-draw-open' : 'test-draw'
          }
          onClick={() => {
            if (numberid) {
              handleShow()
              shuffleCards()
            } else {
              MemberError('抽獎')
            }
          }}
          disabled={!(discount == '1111')}
        >
          <img
            src={
              imgstyle == 1
                ? '/images/ticket/luckday.svg'
                : imgstyle == 2
                ? '/images/ticket/luckday3.svg'
                : '/images/ticket/luckday5.svg'
            }
          ></img>
        </button>
        <MyVerticallyCenteredModal
          show={show}
          onHide={() => handleClose()}
          backdrop="static"
          keyboard={false}
        />
      </div>
    </>
  )
}
