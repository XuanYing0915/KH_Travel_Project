import  { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import Link from 'next/link'
// mui
import  Fab from '@mui/material/Fab'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
// icon
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'


export default function FloatBtnGroup({love, path}) {
// 收藏
// 帶入變數
 const [isFavorite, setFavorite] = useState(love)
//  切換收藏狀態
  const favorite = () => {
    setFavorite(!isFavorite)
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
    // 陰影+懸浮高度+懸浮位置
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: '500',
      }}
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
              width: '60px',
              height: '60px',
              borderRadius: '30px 30px 0 0',
              backgroundColor: '#ffce56',
              boxShadow: 'none',
              color: 'green',
              '&:hover': {
                backgroundColor: 'gold',
              },
            }}
            aria-label="收藏"
            onClick={favorite}
          >
            {/* 收藏ICON */}
            {isFavorite ? (
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
                width: '60px',
                height: '60px',
                borderRadius: '0',
                backgroundColor: '#ffce56',
                boxShadow: 'none',
                color: 'green',
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
              width: '60px',
              height: '60px',
              borderRadius: ' 0 0 30px 30px ',
              backgroundColor: '#ffce56',
              boxShadow: 'none',
              color: 'green',
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
  )
}