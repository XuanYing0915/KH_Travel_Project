import React, { useState } from 'react'

// 渲染畫面
export default function memberCenter() {
  // selectedImageIndex 紀錄當前輪播圖片位置

  return (
    <><div className='container'>
      <div className='row'>
        <div className="mt-5 col-4 d-flex justify-content: center;" >
         <div>您好</div>
         <div>會員訂單查詢</div>
         <div>我的收藏</div>
         <div>會員帳號管理</div>
         <div>登出</div>
        </div>
        <div className="mt-5 col-9 ;" style={{margin:'auto'}}>
        <form class="row g-3 needs-validation" novalidate style={{marginTop:'160px',marginBottom:'160px'}}>
          <div class="col-md-4 position-relative">
            <label for="validationTooltip01" class="form-label">First name</label>
            <input type="text" class="form-control" id="validationTooltip01" value="Mark" required />
            <div class="valid-tooltip">
              Looks good!
            </div>
          </div>
          <div class="col-md-4 position-relative">
            <label for="validationTooltip02" class="form-label">Last name</label>
            <input type="text" class="form-control" id="validationTooltip02" value="Otto" required />
            <div class="valid-tooltip">
              Looks good!
            </div>
          </div>
          <div class="col-md-4 position-relative">
            <label for="validationTooltipUsername" class="form-label">Username</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
              <input type="text" class="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required />
              <div class="invalid-tooltip">
                Please choose a unique and valid username.
              </div>
            </div>
          </div>
          <div class="col-md-6 position-relative">
            <label for="validationTooltip03" class="form-label">City</label>
            <input type="text" class="form-control" id="validationTooltip03" required />
            <div class="invalid-tooltip">
              Please provide a valid city.
            </div>
          </div>
          <div class="col-md-3 position-relative">
            <label for="validationTooltip04" class="form-label">State</label>
            <select class="form-select" id="validationTooltip04" required>
              <option selected disabled value="">Choose...</option>
              <option>...</option>
            </select>
            <div class="invalid-tooltip">
              Please select a valid state.
            </div>
          </div>
          <div class="col-md-3 position-relative">
            <label for="validationTooltip05" class="form-label">Zip</label>
            <input type="text" class="form-control" id="validationTooltip05" required />
            <div class="invalid-tooltip">
              Please provide a valid zip.
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit">Submit form</button>
          </div>
        </form>
        </div>
      </div>
      </div>
    </>
  )
}
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import MemberAside from './memberAside';
// import MemberBack from './memberBack';
// // import './memberprofileEdit.css';
// import SweetPEY from './sweetalert/SweetPEY';
// import SweetNUP from './sweetalert/SweetNUP';
// import SweetPhoneN from './sweetalert/SweetPhoneN';
// // 渲染畫面
// function MemberprofileEdit(props){
//   const{auth}=props;
//     const {dataCheck}=props;
//     // 使用 useRouter 取得 router 資訊
//   const router = useRouter();

//   // 確認使用者是否已登入，若未登入或無會員資料，則導向指定頁面
//   useEffect(() => {
//     if (!auth) {
//       router.push(`${process.env.REACT_APP_URL}/member`);
//     }
//     if (!dataCheck) {
//       router.push(`${process.env.REACT_APP_URL}/member/NewData`);
//     }
//   }, [auth, dataCheck, router]);

//   // const thismemberid=localStorage.getItem("true");
//   // const account=localStorage.getItem("account");

//   // const [UPname,setUPname]=useState(localStorage.getItem("name"))
//   // const [UPnick,setUPnick]=useState(localStorage.getItem("nick"))
//   // const [UPbirth,setUPbirth]=useState(localStorage.getItem("birth"))
//   // const [UPphone,setUPphone]=useState(localStorage.getItem("phone"))
//   // const [UPaddress,setUPaddress]=useState(localStorage.getItem("address"))
//   // const [UPImg, setUPImg] = useState(localStorage.getItem("photo"))
//   // if(UPImg==""){
//   //   setUPImg("housecoffee.png")
//   // }//

//   const [UPPPP,setUPPP]=useState()

//   const ChangeName=(e)=>{
//     setUPname(e.target.value);
//   }
//   const ChangeNick=(e)=>{
//     setUPnick(e.target.value);
//   }
//   const ChangeBirth=(e)=>{
//     setUPbirth(e.target.value);
//   }
//   const ChangePhone=(e)=>{
//     setUPphone(e.target.value);
//   }
//   const ChangeAddress=(e)=>{
//     setUPaddress(e.target.value);
//   }
//   // const UPP=async()=>{
//   //   //console.log("123")
//   //   const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/upphoto`);
//   // }

//     const phone_re = /^09[0-9]{8}$/;
//     const EditBTN=async()=>{

//       if(! phone_re.test(UPphone)){
//         alert("手機格式錯誤");
//       }else{
//         if(UPname.length>0 && UPphone.length==10 &&UPPT==1){
//           const response = await fetch(`${process.env.REACT_APP_API_URL}/account/checkPhone?member_phone=${UPphone}`);
//           const results = await response.json();
//           const response2 = await fetch(`${process.env.REACT_APP_API_URL}/account/checkMyPhone?member_phone=${UPphone}&fk_member_id=${thismemberid}`);
//           const results2 = await response2.json();
//           // //console.log(results)
//           // //console.log(results.total)
//           if(results.total===0||results2.total===1){
//               const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/UPdate?fk_member_id=${thismemberid}&member_name=${UPname}&member_nick=${UPnick}&member_birth=${UPbirth}&member_phone=${UPphone}&member_address=${UPaddress}&member_photo=${UPImg}`);

//           // localStorage.removeItem("name")
//           // localStorage.removeItem("nick")
//           // localStorage.removeItem("birth")
//           // localStorage.removeItem("phone")
//           // localStorage.removeItem("address")
//           // localStorage.removeItem("photo")

//           // localStorage.setItem("name", UPname);
//           // localStorage.setItem("nick", UPnick);
//           // localStorage.setItem("birth", UPbirth);
//           // localStorage.setItem("phone", UPphone);
//           // localStorage.setItem("address", UPaddress);
//           // localStorage.setItem("photo", UPImg);

//           SweetPEY()
//           setTimeout(() => {
//             history.push(`${process.env.REACT_APP_URL}/member/profile`);
//           }, 1500)
//         }else{
//               SweetPhoneN()
//             }
//         }if(UPPT!=1){
//           SweetNUP()

//         }

//   }
// }

//   // 大頭照狀態
//   const [image, setImage] = useState({ preview: '', data: '' })
//   const [status, setStatus] = useState('')
//   const [UPPT, setUPPT] = useState("1")

//   // 大頭照 input 變更事件
//   const handleFileChange = (e) => {
//     const img = {
//       preview: URL.createObjectURL(e.target.files[0]),
//       data: e.target.files[0],
//     }

//     // 尚未上傳 預覽用
//     const output = document.getElementById('avatar')
//     output.src = URL.createObjectURL(e.target.files[0])
//     output.onload = function() {
//       URL.revokeObjectURL(output.src) // free memory
//     }
//     document.querySelector(".UPPTBTN").style.display="block"
//     document.querySelector(".UPPTBTN2").style.display="block"

//     setImage(img)
//     setUPPT(0)
//   }

//   // 上傳大頭照
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     let formData = new FormData()
//     formData.append('file', image.data)
//     //console.log(formData);
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/upphoto`, {
//       method: 'POST',
//       body: formData,
//     })
//     const backImg=await response.json();
//     //console.log(backImg)
//     setUPImg(backImg)
//     if (response) setStatus(response.statusText)
//     setUPPT(1)
//     document.querySelector(".UPPTBTN").style.display="none"
//     document.querySelector(".UPPTBTN2").style.display="none"
//   }

//     return(
//         <>

//     <MemberBack/>
//     <div className="container">
//       <div className="row">
//       <MemberAside/>
//         <main className="mMain row col">

//                 <div className="col-4 col-3None">
//                     <div className="proList">
//                         <div className="memberPhotoE">
//                             <img id='avatar' src={`${process.env.REACT_APP_API_URL}/uploads/${UPImg}`}  alt="會員照片"></img>
//                             <label htmlFor='upPhoto' className="changePhoto" >修改照片</label>
//                         </div>
//                         <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'center'}}>
//                           <input
//                             type="file"
//                             id='upPhoto'
//                             name='photo' // 上傳照片的 input name 要跟後端的 upload.single("photo") 中的 ("photo") 一樣
//                             accept="image/*"
//                             onChange={handleFileChange}
//                           ></input>
//                           <button className='coffeeLightBtn UPPTBTN' type='submit' id='photoSubmit'>上傳</button>
//                         </form>
//                         <div className="memberNumber">
//                             <div >會員帳號</div>
//                             <div >{account}</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col proR">
//                     <div className="proMain">
//                     <form>
//                       <div className="proList_m">
//                         <div className="memberPhotoE">
//                             <img id='avatar' src={`${process.env.REACT_APP_API_URL}/uploads/${UPImg}`}  alt="會員照片"></img>
//                             <label htmlFor='upPhoto' className="changePhoto" >修改照片</label>
//                         </div>
//                         <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'center'}}>
//                           <input
//                             type="file"
//                             id='upPhoto'
//                             name='photo' // 上傳照片的 input name 要跟後端的 upload.single("photo") 中的 ("photo") 一樣
//                             accept="image/*"
//                             onChange={handleFileChange}
//                           ></input>
//                           <button className='coffeeLightBtn UPPTBTN UPPTBTN2' type='submit' id='photoSubmit'>上傳</button>
//                         </form>
//                         <div className="memberNumber">
//                             <div >會員帳號</div>
//                             <div >{account}</div>
//                         </div>
//                     </div>
//                         <div className="col-3None">
//                             <div className="proRight">姓名:&emsp; &emsp;&emsp;&emsp;<input type="text" value={UPname}  onChange={ChangeName}></input></div>
//                             <div className="proRight">暱稱:&emsp; &emsp;&emsp;&emsp;<input type="text" value={UPnick} onChange={ChangeNick}></input></div>
//                             <div className="proRight">生日:&emsp; &emsp;&emsp;&emsp;<input type="DATE" value={UPbirth} onChange={ChangeBirth} readOnly ></input></div>
//                             <div className="proRight">手機號碼:&emsp;&emsp; <input type="text" value={UPphone} maxLength="10" pattern="09\d{8}" onChange={ChangePhone}></input></div>
//                             <div className="proRight">地址:&emsp;&emsp;&emsp;&emsp; <input type="text" value={UPaddress} onChange={ChangeAddress}></input> </div>
//                         </div>

//                         <button type='button' onClick={EditBTN} className="memberEdit memberEdit-w">儲存修改</button>
//                         </form>
//                         <form>
//                         <div className="col-wn">
//                           <div className="proRight">
//                             <div>姓名:</div>
//                             <input type="text"  value={UPname}  onChange={ChangeName}></input>
//                             <br></br>
//                           </div>
//                           <div className="proRight">
//                             <div>暱稱:</div>
//                             <input type="text" value={UPnick} onChange={ChangeNick}></input>
//                             <br></br>
//                           </div>
//                           <div className="proRight">
//                             <div>生日:</div>
//                             <input type="date"  value={UPbirth} onChange={ChangeBirth} readOnly ></input>
//                             <br></br>
//                           </div>
//                           <div className="proRight">
//                             <div>手機號碼:</div>
//                             <input type="text" value={UPphone} maxLength="10" pattern="09\d{8}" onChange={ChangePhone}></input>
//                             <br></br>
//                           </div>
//                           <div className="proRight">
//                             <div>地址:</div>
//                             <input type="text" value={UPaddress} onChange={ChangeAddress}></input>
//                             <br></br>
//                           </div>
//                         </div>
//                         <br></br>
//                     <button className="memberEdit memberEdit-m" onClick={EditBTN}>修改</button>
//                     </form>
//                   </div>

//                 </div>

//         </main>
//       </div>
//     </div>
//     <br></br>
//     <br></br>

//     </>
//     )

// }
// export default MemberprofileEdit;





