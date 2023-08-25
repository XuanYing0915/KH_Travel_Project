import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
// mui
import Fab from '@mui/material/Fab'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
// icon
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'

import FavoriteSuccess from './toast-alert/favorite-success'
import FavoriteError from './toast-alert/favorite-error'
import FavoriteRemove from './toast-alert/favorite-remove'
export default function FloatBtnGroup({
  path,
  love,
  id,
  memberId,
  dataBaseTableName,
}) {
  // 收藏
  // 帶入變數  接收當下狀態
  const [isFavorite, setFavorite] = useState({
    path,
    love,
    id,
    memberId,
    dataBaseTableName,
  })

  // 0825 判斷收藏
  useEffect(() => {
    const checkFavorite = async () => {
      if (!memberId) return
      try {
        const response = await axios.get(
          'http://localhost:3005/hotelfavorites',
          {
            params: {
              memberId: memberId,
            },
          }
        )
        console.log('收藏查詢', response)

        const hotelIds = response.data.map((item) => item.hotel_id) // 將收到的資料轉為 hotel_id 的陣列
        if (hotelIds.includes(id)) {
          // 檢查當前頁面的 hotel_id 是否在該陣列中
          setFavorite((prev) => ({ ...prev, love: true }))
        }
      } catch (error) {
        console.error('Error fetching favorite status:', error)
      }
    }
    checkFavorite()
  }, [memberId, id])

  // console.log(
  //   '浮動按鈕接收:' +
  //     isFavorite.love +
  //     isFavorite.id +
  //     isFavorite.memberId +
  //     isFavorite.dataBaseTableName
  // )
  useEffect(() => {
    setFavorite({ love, id, memberId, dataBaseTableName })
  }, [love, id, memberId, dataBaseTableName])

  //  切換收藏狀態
  const favorite = async () => {
    // 發送 POST
    try {
      // 丟狀態給後端判定
      const response = await axios.post(
        'http://localhost:3005/hotelfavorites/like',
        {
          love: isFavorite.love,
          id: isFavorite.id,
          memberId: isFavorite.memberId,
          dataBaseTableName: isFavorite.dataBaseTableName,
        }
      )
      console.log('收藏成功:' + response.data.love)
      setFavorite(response.data)
      // 收藏成功加入彈窗
      if (isFavorite.love) {
        FavoriteRemove('收藏 取消，在逛一下吧!')
      } else {
        FavoriteSuccess('收藏')
      }
    } catch (error) {
      console.error('無法收藏:', error)
      //  收藏失敗加入彈窗
      FavoriteError('收藏')
    }
  }

  //  回首頁
  //  const history = useHistory()
  // 回最上層
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div
        style={
          {
            // position: 'fixed',
            // bottom: '40px',
            // right: '40px',
            // zIndex: '500',
          }
        }
        className="float-btn a-pc"
      >
        <Box
          //   陰影
          sx={{
            backgroundColor: 'transparent',
            boxShadow: '4px 4px 10px  rgba(0, 0, 0, 0.2)',
            borderRadius: '30px',
            border: '2px solid green',
          }}
        >
          <ButtonGroup orientation="vertical" color="primary">
            {/* 收藏 */}
            <Fab
              sx={{
                width: '50px',
                height: '60px',
                borderRadius: '30px 30px 0 0',
                backgroundColor: '#FFB412',
                opacity: '0.7',
                boxShadow: 'none',
                color: 'rgba(0,100,0)',
                '&:hover': {
                  backgroundColor: 'gold',
                },
              }}
              aria-label="收藏"
              onClick={favorite}
            >
              {/* 收藏ICON */}
              {isFavorite.love ? (
                <FavoriteIcon fontSize="large" />
              ) : (
                <FavoriteBorderSharpIcon fontSize="large" />
              )}
            </Fab>
            {/* 收藏結束 */}
            {/* 回首頁 */}
            <Link href={`/${path}`} style={{ textDecoration: 'none' }}>
              <Fab
                aria-label="回首頁"
                // onClick={() => history.push('/attraction')}
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '0',
                  backgroundColor: '#FFB412',
                  opacity: '0.7',
                  boxShadow: 'none',
                  color: 'rgba(0,100,0)',
                  '&:hover': {
                    backgroundColor: 'gold',
                  },
                }}
              >
                <HomeRoundedIcon fontSize="large" />
              </Fab>
            </Link>
            {/* 回首頁結束 */}
            {/* 回最上層 */}
            <Fab
              aria-label="返回最上層"
              onClick={handleScrollToTop}
              sx={{
                width: '50px',
                height: '60px',
                borderRadius: ' 0 0 30px 30px ',
                backgroundColor: '#FFB412',
                opacity: '0.8',
                boxShadow: 'none',
                color: 'rgba(0,100,0)',
                '&:hover': {
                  backgroundColor: 'gold',
                },
              }}
            >
              <ArrowUpwardRoundedIcon fontSize="large" />
            </Fab>
            {/* 回最上層結束 */}
          </ButtonGroup>
        </Box>
      </div>

      <div
        style={
          {
            // position: 'fixed',
            // bottom: '40px',
            // right: '40px',
            // zIndex: '500',
          }
        }
        className="float-btn a-rwd"
      >
        <Box
          //   陰影
          sx={{
            backgroundColor: 'transparent',
            boxShadow: '4px 4px 10px  rgba(0, 0, 0, 0.2)',
            borderRadius: '30px',
            border: '2px solid green',
          }}
        >
          <ButtonGroup orientation="vertical" color="primary">
            {/* 收藏 */}
            <Fab
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '30px 30px 0 0',
                backgroundColor: '#FFB412',
                opacity: '0.7',
                boxShadow: 'none',
                color: 'rgba(0,100,0)',
                '&:hover': {
                  backgroundColor: 'gold',
                },
              }}
              aria-label="收藏"
              onClick={favorite}
            >
              {/* 收藏ICON */}
              {isFavorite.love ? (
                <FavoriteIcon fontSize="medium" />
              ) : (
                <FavoriteBorderSharpIcon fontSize="medium" />
              )}
            </Fab>
            {/* 收藏結束 */}
            {/* 回首頁 */}
            <Link href={`/${path}`} style={{ textDecoration: 'none' }}>
              <Fab
                aria-label="回首頁"
                // onClick={() => history.push('/attraction')}
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0',
                  backgroundColor: '#FFB412',
                  opacity: '0.7',
                  boxShadow: 'none',
                  color: 'rgba(0,100,0)',
                  '&:hover': {
                    backgroundColor: 'gold',
                  },
                }}
              >
                <HomeRoundedIcon fontSize="medium" />
              </Fab>
            </Link>
            {/* 回首頁結束 */}
            {/* 回最上層 */}
            <Fab
              aria-label="返回最上層"
              onClick={handleScrollToTop}
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: ' 0 0 30px 30px ',
                backgroundColor: '#FFB412',
                opacity: '0.8',
                boxShadow: 'none',
                color: 'rgba(0,100,0)',
                '&:hover': {
                  backgroundColor: 'gold',
                },
              }}
            >
              <ArrowUpwardRoundedIcon fontSize="medium" />
            </Fab>
            {/* 回最上層結束 */}
          </ButtonGroup>
        </Box>
      </div>
    </>
  )
}
