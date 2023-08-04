const expressSession = require('express-session');
let FileStore = require('session-file-store')(expressSession); 
app.use(
  expressSession({
    store: new FileStore({
      //用來指定session要存在硬碟裡的路徑
      //這邊寫完之後要到指定的位置去開一個sessions的資料夾
      path: path.join(__dirname, '..', 'sessions'),
    }),

    //secret是session傳輸時用來加密的key
    //這邊寫完之後要到.env裡去加上SESSION_SECRET
    secret: process.env.SESSION_SECRET,

    //resave設成true 表示不管session有沒有改內容 都希望重新儲存一次
    //因為這邊是要用session-file-store存在硬碟 所以設成false
    resave: false,
    
    //saveUninitialized設成true 表示不管有沒有要寫入session 後端都會發給一個session id
    saveUninitialized: false,
  })
);


//原本的設定 只有開啟cors 沒有限制來源等等
//app.use(cors());

app.use(
  cors({
    //為了要讓browser在CORS跨源請求的情況下 還是幫我們送cookie
    //設定接受跨源存取的前端 所以是3000而不是3002(後端)
    origin: ['http://localhost:3000'],

    //credential設為true表示請browser幫我們帶cookie
    credential: true,
  })
  );