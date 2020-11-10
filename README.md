# 我的餐廳口袋名單 v3.0

本清單提供餐廳的類型搜尋、查看餐廳照片以及地理位置等資訊
並可以任意新增、修改、刪除，或重新輸入預設餐廳資料
使用上述功能需先建立帳號並登入
或使用預設的使用者帳號登入

第一位使用者：
email: user1@example.com
password: 12345678

第二位使用者：
email: user2@example.com
password: 12345678



修正功能：
- 不須使用者名稱也可以登入
- 登入及註冊體驗優化



### 3.0 新增功能

- 加入註冊﹑登入登出功能
- 加入第三方登入功能 (Facebook)


## 現有功能

- 列出所有餐廳資訊
- 可以依照餐廳名稱、類別、地區做搜尋
- 點選資訊卡可直接檢視餐廳詳細資訊，包含類別、地址、電話、評分、圖片及 Google Map
- 可任意新增刪改餐廳資訊
- 卡片淡入淡出特效
- 關鍵字篩選功能，可判斷現有餐廳資訊的地區及類型，自動產生篩選條件進行篩選
- 如已輸入搜尋關鍵字，則可從關鍵字搜尋結果中做篩選
- 清除所有搜尋操作按鈕(重置)
- 餐廳資訊卡的新增、修改、刪除操作體驗優化(加入操作提醒視窗)


## 使用工具

- mongoDB: 4.2.9
- mongoose: 5.10.2
- Node.js: 13.0.1
- Express: 4.17.1
- Express-Handlebars: 5.1.0
- nodemon: 2.0.4
- body-parser: 6.12.0
- method-override: 3.0,

- jquery: 3.3.1
- bootstrap: 4.2.1
- fontawesome: 5.14
- AOS: 2.3.1
- popper: 1.14.6

- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-local: 1.0.0
- express-session: 1.17.1
- dotenv: 8.2.0
- bcryptjs: 2.4.3
- connect-flash: 0.1.1


## 安裝

0.電腦需安裝mongoDB

1.開啟終端機(Terminal) cd 到存放專案本機位置並執行:

```
git clone https://github.com/windsailg/ac_restaurant_crud_auth.git
``````

2.cd 至 ac_restaurant_crud_auth 資料夾


3.初始化安裝套件

```
npm i   //安裝套件
```

```
npm run seed  //導入預設資料
```

4.終端機顯示以下資訊代表成功與資料庫連接
mongoDB connected
done.


```
npm run dev  //啟動程式
```

5.終端機顯示以下資訊代表啟動成功
Express is running on http://localhost:3000
mongoDB connected

伺服器已經成功連線並運作於 http://localhost:3000




