import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Swal from 'sweetalert2'

export default function Avatar() {
  const { authJWT, setAuthJWT } = useAuthJWT()
// 新增頭像狀態
const [avatar, setAvatar] = useState('')
const imageBaseUrl = 'http://localhost:3005/public/img/member/';
// const [loadAvatar, setLoadAvatar] = useState('')

// useEffect(() => {
//   const fetchAvatar = async () => {
//     try {
//       // 確保有值
//       if (authJWT.userData && authJWT.userData.client_id) {
//         const response = await axios.get(
//           `http://localhost:3002/member/avatar/${authJWT.userData.client_id}`,
//         )
//         setLoadAvatar(response.data.avatar)
//       }
//     } catch (error) {
//       console.error(error.message)
//     }
//   }

//   fetchAvatar()
// }, [authJWT.userData.client_id])

// const handleFileUpload = async (e) => {
//   try {
//     // 呼叫刪除舊的大頭貼函式
//     deleteOldAvatar()
//     const avatar = e.target.files[0] // 取得上傳的檔案
//     const formData = new FormData() // 建立formData
//     formData.append('avatar', avatar) // 將檔案加入formData

//     const response = await axios.post(
//       `http://localhost:3002/member/avatar/${authJWT.userData.client_id}`,
//       formData,
//     )

//     // 若上傳成功，更新畫面
//     if (response.data && response.data.code === '200') {
//       setLoadAvatar(response.data.avatar)
//     }
//   } catch (error) {
//     console.error(error.message)
//   }
// }

// // 先刪除舊的大頭貼
// const deleteOldAvatar = async () => {
//   try {
//     const response = await axios.delete(
//       `http://localhost:3002/member/avatar/${authJWT.userData.client_id}`,
//     )
//     console.log(response.data)
//   } catch (error) {
//     console.log(error.message)
//   }
// }
// 元件掛載時取得目前使用者的頭像URL
useEffect(() => {
const fetchAvatar = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3005/api/imgupload/${authJWT.userData.member_id}`
    );
    const result = response.data;
    console.log(result)
    if (result.code === '200') {
      setAvatar(result.avatar); // 假設後端返回頭像URL作為 "avatar" 屬性
    }
  } catch (error) {
    console.error("取得頭像失敗", error);
  }
};

fetchAvatar();
}, [authJWT]);

// 這個函式用於處理圖片上傳// 在 handleUpload 函数内部进行图片上传并更新 avatar 状态
const handleUpload = async (e) => {
const file = e.target.files[0];

if (file) {
// 預覽頭像
const reader = new FileReader();
reader.onloadend = () => {
  setAvatar(reader.result);// 用於立即預覽
};
reader.readAsDataURL(file);

const formData = new FormData();
formData.append('avatar', file); // 注意這裡的資料欄名應與後端匹配

try {
  // 這裡我們使用了會員ID作為URL的一部分
  const response = await axios.post(
    `http://localhost:3005/api/imgupload/${authJWT.userData.member_id}`,
    formData
  );
  const result = response.data;
  if (result.code === "200") {
    setAvatar(result.avatar); // 更新 avatar 為服務器上的圖片路徑
    Swal.fire('上傳成功', '頭像已成功上傳。', 'success'); 
    // 创建自定义事件
    const updateEvent = new Event('updateUserData')
    // 触发自定义事件，通知其他组件更新
    window.dispatchEvent(updateEvent)
  } else {
    Swal.fire('上傳失敗', '上傳頭像時出現問題，請稍後再試。', 'error');
  }
} catch (error) {
  Swal.fire('上傳失敗', '哭哭上傳頭像時出現問題，請稍後再試。', 'error');
}
}
};

 
  return (
    <>
     <label htmlFor="fileUpload">
                  <div
                    className="card rounded-circle d-none d-lg-flex border-primary position-relative"
                    style={{
                      cursor: 'pointer',
                      maxWidth: '225px',
                      minWidth: '225px',
                      minHeight: '225px',
                      maxHeight: '225px',
                      backgroundPosition: 'top',
                      backgroundSize: 'cover',
                      borderRadius: '50px',
                      backgroundImage: `url(${imageBaseUrl}${avatar})`, // 使用 avatar 狀態
                      marginLeft: '10px', // 添加這一行以向右側移動 div
                    }}
                  >
                 
                 
                  </div>
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  name="file"
                  accept="image/*"
                  // ref={photoRef}
                  className="position-fixed top-0"
                onChange={handleUpload}
                />
      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
          i {
            margin-bottom: 15px;
          }
          h3 {
            border-bottom: 3px solid#7d7a76;
          }
          .sidebar-frame {
            position: relative;
            width: 250px;
            height: 370px;
            background-color:rgba(255, 255, 255, 0.5);
            border-radius: 0% 0% 0% 0% / 0% 0% 0% 0%;
            
            box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
            transition: all 0.4s ease;
            display: inline-block;
            border-right: 3px solid #abadac;
            {/* border-bottom: 3px solid #a7a6a6; */}
             {
              /* font-size: 1rem; */
            }
            border-radius: 0% 0% 0% 0% / 1% 1% 2% 4%;
            text-transform: ;
            letter-spacing: 0.3ch;
            background: ;
            position: relative;

             {
              /* &::before { */
            }
             {
              /* content: ''; */
            }
             {
              /* border: 2px solid #353535; */
            }
             {
              /* display: block; */
            }
             {
              /* width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg); */
            }
             {
              /* border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%; */
            }
             {
              /* } */
            }
          }
          .sidebar-frame:hover {
            border-radius: 0% 0% 50% 50% / 0% 0% 5% 5%;
            box-shadow: 10px 10px rgba(0, 0, 0, 0.25);
          }

          
          p {
            font-size: 20px;
            color: #272727;
          }
          p:hover {
            color: #1a9da7;
            border-bottom: 3px solid#ffd367;
            font-weight: 700;
          }
          .head {
            font-size: 20px;
            color: black;
          }
          .userName {
            font-size: 18px;
            font-weight: 700;
            display: flex;
            justify-content: center;
            align-item: center;
            margin-bottom: 15px;
          }
          .userHello {
            font-size: 18px;
          }

           {
            /* .sidebar-frame {
            background-color: 	#D0D0D0;
            width: 250px;
            height: 350px;
            box-shadow: 10px 10px 10px #e0e0e0;
            border-spacing: 15px;
            
            
          } */
          }
           {
            /* .nav-ink {
            color: #ffffff;
          } */
          }

          .btn {
            position: relative;
            padding: 1.4rem 4.2rem;
            padding-right: 3.1rem;
            font-size: 1.4rem;
            color: var(--inv);
            letter-spacing: 1.1rem;
            text-transform: uppercase;
            transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);
            cursor: pointer;
            user-select: none;
          }

          .btn:before,
          .btn:after {
            content: '';
            position: absolute;
            transition: inherit;
            z-index: -1;
          }

          .btn:hover {
            color: var(--def);
            transition-delay: 0.5s;
          }

          .btn:hover:before {
            transition-delay: 0s;
          }

          .btn:hover:after {
            background: var(--inv);
            transition-delay: 0.35s;
          }

         
             
            
          
        `}
      </style>
    </>
  )
}
