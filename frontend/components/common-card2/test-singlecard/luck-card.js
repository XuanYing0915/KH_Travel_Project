import { useState, useEffect, useContext } from 'react'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證


//全域鉤子
import { CartContext } from '@/components/hotel/CartContext'


export default function loveIcon({ card, handleChoice, flipped, }) {
    //會員狀態
    const { authJWT } = useAuthJWT()
    const numberid = authJWT.userData.member_id

    //全域鉤子
    const { discount, setDiscount } = useContext(CartContext) //有類別優惠 ('null')
    const { times, setTimes } = useContext(CartContext) // 創建到期時間+會員名稱{ 'name': 'qaz2.0', 'time': null }
    const { open, setOpen } = useContext(CartContext);//是否開啟開關
    const [isTimeSet, setIsTimeSet] = useState({ check: 0 }) //開啟倒數true


    //fetch function
    const fetchdata = (data) => {
        fetch('http://localhost:3005/tk/test', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .catch((err) => {
                console.log(err)
            })
    }

    //點擊將 times,discount 後丟到後端資料庫並insert
    const insertclick = (numberid, tag) => {
        const currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 8)
        if (currentDate.getHours() >= 24) {
            currentDate.setDate(currentDate.getDate() + 1)
        }
        currentDate.setMinutes(currentDate.getMinutes() + 60) //此為設定增加1分鐘先做判斷

        const sqlFormattedDate = currentDate
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')
        console.log(sqlFormattedDate) //2023-08-18 01:35:53 格式

        const data = {
            numberid: numberid,
            tag: `${tag}`,
            time: sqlFormattedDate,
            controll: 'insert',
        }
        fetchdata(data)

        setDiscount(`${tag}`)
        setTimes({ ...times, time: sqlFormattedDate })
        setIsTimeSet({ ...isTimeSet, check: 0 })
    }

    //初始狀態

    useEffect(() => {
        console.log('isTimeSet:', isTimeSet)
        console.log('time:', times)
        console.log('discount:', discount)

        //檢查有無使用過的資料fetch
    }, [discount])

    // useEffect 處理當有會員 去資料庫抓資料(目前假定有) 重新設定discount,time V
    useEffect(() => {
        if (numberid) {
            const data = {
                numberid: numberid,
                controll: 'get',
            }
            if (numberid) {
                fetch('http://localhost:3005/tk/test', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                })
                    .then((v) => v.json())
                    .then((data) => {
                        console.log(data.data[0])
                        if (!data.data[0]) {
                        } else {
                            const memberdata = data.data[0]
                            setDiscount(memberdata.tag)
                            setTimes({ ...times, name: numberid, time: memberdata.time })
                            //多一個開啟開關
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }, [authJWT.isAuth])



    const handleClick = () => {
        handleChoice(card)
        insertclick(numberid, card.value)
        setOpen(true)
    }


    return (

        <div className="card" >
            <div className={flipped ? 'flipped' : ''}>
                <div className="front">
                    {card.value}
                </div>
                <img className="back"
                    src='/images/ticket/ticket-back.svg'
                    onClick={handleClick}
                    alt='card back' />
            </div>
        </div>

    )
}
