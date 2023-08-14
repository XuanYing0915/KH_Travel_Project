import TestLikeCollect from '@/components/common-card2/like-collect'

export default function like() {
  return <TestLikeCollect like={true} cardid={3000000007} />
}
  //--------------------------------------這裡要修正 勿用
//1.目前抓取資料為 未登入會員時的全資料
//2.處理會員收藏狀態 假定有登入會員 名稱=('aaa')
//3.資料表依照會員名稱抓取有無收藏後 再將fk_member_id 改為true : false 判斷愛心有無點亮
// data.data.forEach((v) => {
//   v.fk_member_id =
//     v.fk_member_id && v.fk_member_id.includes('aaa') ? true : false
// })
  //--------------------------------------


// 若單一使用 全部傳入值定義
// like={like} 從卡片那邊的like = {fk_member_id} 丟過來的
// cardid={id} 卡片id
// who={who} 資料庫位置+表單  1.景點 2.美食 3.住宿 4.票眷  從卡片 或直接丟1-4
// numberid={900008}   抓取會員id



