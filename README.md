# مشروع مكتبة Maktebe

مكتبة عربية مبنية بـ React (واجهة أمامية) و Node.js + Express + MongoDB (واجهة خلفية).

## ️ المتطلبات
- Node.js
- MongoDB
- npm

---

## التشغيل

### ⚙️ إعداد متغيرات البيئة

قبل تشغيل التطبيق، يجب عليك إعداد ملفات متغيرات البيئة:

1.  **لـ Backend:** انسخ `backend/.env.example` إلى `backend/.env`.
    ```bash
    cp backend/.env.example backend/.env
    ```
2.  **لـ Frontend:** انسخ `.env.example` (في جذر المشروع) إلى `.env`.
    ```bash
    cp .env.example .env
    ```

    **ملاحظة:** تأكد من تحديث القيم داخل ملفات `.env` الجديدة (مثل `JWT_SECRET` و `MONGO_URI`) لتناسب إعداداتك المحلية.

### ✅ Backend
```bash
cd backend
npm install
npm run dev
```

 ملف `.env` في مجلد backend:

```
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/maktebe
```

---

### ✅ Frontend

```bash
# Run from the project root
npm install
npm start
```

 ملف `.env` في **جذر المشروع** (بجانب `package.json` الرئيسي):

```
REACT_APP_API_URL=http://localhost:5000
```

---

## ✨ الميزات

* واجهة عربية
* تسجيل دخول JWT
* عرض وإضافة كتب للمفضلة
* CRUD للكتب

---

## ️ السبب الرئيسي لرسالة الخطأ:

> **JsonWebTokenError: secret or public key must be provided**

هو أن **متغيّر البيئة `JWT_SECRET` غير معرّف** عند تشغيل الخادم.

---

### تفاصيل من الكود:

في ملف `backend/middleware/authMiddleware.js`، يتم قراءة المتغير كالتالي:

```js
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const decoded = jwt.verify(token, JWT_SECRET);
```

لكن إذا لم يكن هناك ملف `.env` في المجلد `backend/`، أو لم يتضمن هذا المتغيّر، فإن `jsonwebtoken` يُرجع الخطأ المذكور.

---

### كما يوضّح `README.md`:

من الضروري إنشاء ملف `.env` داخل مجلد `backend` يحتوي على:

```env
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/maktebe
```

---

### ✅ الحل:

1. أنشئ ملف `.env` داخل مجلد `backend/`، بنفس مستوى `server.js`.

2. أضف فيه:

   ```env
   JWT_SECRET=اختر_كلمة_سرية_للتوقيع
   MONGO_URI=mongodb://localhost:27017/maktebe
   ```

3. ثم شغّل الخادم من داخل مجلد `backend`:

   ```bash
   cd backend
   npm run dev
   ```

✅ بعد ذلك، سيتم تحميل المتغيرات البيئية بنجاح، ويختفي الخطأ المتعلق بـ JWT.
