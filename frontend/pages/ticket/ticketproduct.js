import Title from "@/components/title"
import loveIcon from "@/components/common-card2/love-icon"
import NoLoveIcon from "components/common-card2/nolove-icon"
import Card2 from "@/components/common-card2/common-card2"


//文字排版有誤 X
// 輪播圖理解 X
// 票種svg套入問題 X
// 卡票套入 V

export default function TicketProduct() {
    return (
        <>
            {/* <!-- 圖片及介紹+按鈕 --> */}
            <div className="container ticketPd">
                <section className="sectionbg-E5EFEF">
                    <div className="container ">
                        {/* <!-- 上方標題列 --> */}
                        <div className="">
                            <div className="title col-7 offset-md-2">
                                <h4>【高雄】義大世界入園券</h4>
                                <button className="buttonStyle"><NoLoveIcon /></button>
                            </div>
                            <div className="line-border-3cm col-7 offset-md-2"></div>
                        </div>
                        {/* <!-- 輪播圖 --> */}
                        <div className="col-8 offset-md-2">
                            <img src="" alt="error" />
                        </div>
                        {/* <!-- 下方橫條 --> */}
                        <div className="line-border-3cm col-3 offset-md-2"></div>

                        {/* <!-- 下方文字+按鈕框 --> */}
                        <div className="row">
                            <div className="col-5 offset-md-2 introduction">
                                <div>備註: 台灣 - 高雄</div>
                                <div>全台最大室內親子主題館 不管颳風下雨都能讓親子暢快遊玩 還有全台最高摩天輪、精彩的日間遊行 讓您玩樂一整天</div>
                            </div>
                            <div className="col-3 click-button-box">
                                <p className="button-text">價格最低<b>TWD50</b>起</p>
                                <button className="click-button">選擇方案</button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- 購買按鈕區塊+跳出顯示 站不管 --> */}
                <section>
                    <div className="container ">
                        {/* <!-- 按鈕+外框 --> */}
                        <div className="flex-center">
                            <button className="buy-button" type="button" data-bs-toggle="collapse" data-bs-target="#buy-card-box" id="buy-button">
                                <div className="buy-button-text">選擇方案</div>
                            </button>
                        </div>
                        {/* <!-- 下方顯示框架 --> */}
                        <div id="buy-card-box" class="accordion-collapse collapse show" data-bs-parent="#buy-button">
                            <div className="buy-card">

                            </div>
                            <div className="">
                                card1
                            </div>
                            <div className="">
                                card1
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- 產品說明 --> */}
                <section className="sectionbg-E5EFEF">
                    <div className="container sectionbg-dark nobcakground">
                        <Title title="產品說明" style="title_box_dark" />
                        <p className="text_24 p-style-dark">義大遊樂世界全台首創古希臘情境主題遊樂園，有適合親子同遊的設施、闔家觀賞的表演秀，挑戰膽量的 AR
                            鬼船、天旋地轉，更有亞洲最大VR主題館等你來挑戰，視覺、聽覺、嗅覺及觸覺同步感受。園區強打設施-飛越台灣-全台唯一雙劇院，帶給你雙重感受。

                            全台第一座空中飛行模擬器遊樂設施，除了台灣美景之外，還加入了傳統文化節慶、極限運動等，在3層樓高體驗模擬空中飛行，帶你俯視敖遊台灣19個心曠神怡的絕世美景。

                            入園資訊，現場票價全票 NT$ 899：滿 19 歲（含）以上成人青少年票 NT$ 799：滿 13 歲（含）以上 ~ 未滿 19 歲遊客憑健保卡購買學童票 NT$ 580：滿 6 歲（含）以上 ~ 未滿 13
                            歲兒童憑健保卡購買或兒童身高
                            115 公分以上，未滿 150 公分購買優待票 NT$ 450： 1. 滿 3 歲（含（以上~未滿 6 歲兒童憑健保卡購買或兒童身高 90 公分以上，未滿 115 公分購買 2.
                            凡持有身心障礙手冊者，本人及隨行之必要陪伴者乙名（如持有效之身心障礙證明，需註記【進入公民營風景區、康樂場所與文教設施】，方可享有隨行者優惠） 3. 孕婦本人，憑媽媽手冊購買 4. 滿 60
                            歲（含）以上長者（憑身份證件購買）</p>
                    </div>
                </section>
                {/* <!-- 如何使用 --> */}
                <section>
                    <div className="container sectionbg-dark sectionbg-white">
                        <Title title="如何使用" style="title_box_dark" />
                        <p className="text_24 p-style-dark">憑證使用方式
                            現場請出示 QR code</p>
                    </div>
                </section>
                {/* <!-- 購買須知 --> */}
                <section>
                    <div className="container sectionbg-dark ">
                        <Title title="購買須知" style="title_box_light" />
                        <p className="text_24 p-style-light">－ 義大遊樂世界購買須知 － 義大遊樂世界全年無休，故每日皆排定設施保養工作，因保養作業而致遊具停駛之處，敬請見諒。 設施維護保養公告請參考 義大遊樂世界官網。 90 公分以下兒童或未滿 3 歲兒童免費入園但需家長陪同，為安全起見園區內設施大多數限制身高 90 公分以上兒童方能搭乘；如有心臟病、孕婦、高血壓、酒醉、90 公斤以上或身體不適者，部分遊樂設施依限制規定搭乘。 設施開放時間：於開園後 1.5 小時內陸續分項開放。設施關閉時間：設施於17:00關閉，部分設施將因營業狀況於閉園前1小時陸續關閉，如因維修保養或其他不可抗力因素必須停止運作，依現場公告為準。為維護遊客安全，本園保有調整設施營運之權利。 本園嚴禁攜帶危險物品、酒精飲品、腳踏車、滑板車、寵物入園及大型攝影器材，如：Beta-Cam、S-Vhs、35 厘米大型攝影機、4X5 蛇腹大型攝影器材及遙控無人機(空拍機)。 為顧及您的安全，請遵守各項設施使用規定， 園區全面禁食口香糖及檳榔。 為了您與其他遊客的健康及響應菸害防治規定，請勿於室內空間吸菸。 已入園之遊客於出口處由服務人員於手臂上加蓋「再入園章」即可當日再次入園。 園區內部分設施於搭乘時會有濺濕衣物情形，請自備或於園區購買雨衣或更換衣物。 為避免影響遊客遊玩的歡樂氣氛，園區內不提供廣播尋人之服務，請事先與您的同伴約定好見面時間、地點。 園區內設有投幣式小型置物櫃，可供遊客放物品。本園區不負任何保管責任，不便之處敬請見諒。 本園區提供「寵物寄放」「愛心公物租借」「手機充電」等服務項目，嬰兒推車租借 100元／次，詳情請洽遊客服務中心。 為維護遊園品質及遊客安全當園區遊客量達滿載標準時將實施流量管制，暫停對外開放（含已持票）。 義大摩天輪屬購買樂園門票遊客之額外加贈，義大遊樂世界保留終止贈送之權利。如逢摩天輪因故暫停或保養恕不另行補償或退票。 （本設施禁止孕婦及飲用酒精性飲料者搭乘）相關須知以現場公告為準。 園區獲得穆斯林友善環境認證，園內提供祈禱室、朝拜毯、可蘭經、洗手間等設備，如需使用可向服務人員詢問。 票券最後換票時間 15:30，請於最後換票時間前兌換入園。</p></div>
                </section>
                {/* <!-- 相關推薦 --> */}
                <section>
                    <div className="container">
                        <Title title="相關推薦" style="title_box_dark" />
                        <div className="row">
                            <Card2
                                id={1}
                                img_src="Wl0quzCsyB.jpg"
                                name="狗狗"
                                introduce="目前我是一只狗狗 沒有壓力"
                                like={false}
                                towheresrc="#"
                                status={2}
                                imgrouter='ticket'
                            />
                            <Card2
                                id={2}
                                img_src="Wl0quzCsyB.jpg"
                                name="狗狗"
                                introduce="目前我是一只狗狗 沒有壓力"
                                like={false}
                                towheresrc="#"
                                status={2}
                                imgrouter='ticket'
                            />
                            <Card2
                                id={3}
                                img_src="Wl0quzCsyB.jpg"
                                name="狗狗"
                                introduce="目前我是一只狗狗 沒有壓力"
                                like={false}
                                towheresrc="#"
                                status={2}
                                imgrouter='ticket'
                            />
                            <Card2
                                id={4}
                                img_src="Wl0quzCsyB.jpg"
                                name="狗狗"
                                introduce="目前我是一只狗狗 沒有壓力"
                                like={false}
                                towheresrc="#"
                                status={2}
                                imgrouter='ticket'
                            />
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}