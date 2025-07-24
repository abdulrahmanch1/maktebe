# مشروع مكتبة Maktebe

مكتبة عربية مبنية بـ React (واجهة أمامية) و Node.js + Express + MongoDB (واجهة خلفية).

## ️ المتطلبات
- Node.js
- MongoDB
- npm

---

## التشغيل

### ✅ Backend
```bash
cd backend
npm install
npm run dev
````

 ملف `.env` في مجلد backend:

```
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/maktebe
```

---

### ✅ Frontend

```bash
cd frontend
npm install
npm start
```

 ملف `.env` في مجلد frontend:

```
REACT_APP_API_URL=http://localhost:5000
```

---

## ✨ الميزات

* واجهة عربية
* تسجيل دخول JWT
* عرض وإضافة كتب للمفضلة
* CRUD للكتب
