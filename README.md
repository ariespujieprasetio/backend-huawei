# Huawei Backend Technical Test – Express.js API

## 📘 Deskripsi
Project ini merupakan implementasi **tugas pengembangan backend** untuk technical test Huawei.  
Server dibuat menggunakan **Node.js** dan **Express.js**, dengan tujuan menerima data formulir dari frontend dan menyimpannya di memori (tanpa database).  
API ini mendukung operasi dasar CRUD (Create, Read, Delete).

---

## ⚙️ Tech Stack
- **Node.js** (v18+ direkomendasikan)
- **Express.js**
- **CORS**
- **Body-Parser**

---

## Setup & Cara Menjalankan

### 1️⃣ Clone Repository
Clone project ini dari GitHub:
git clone https://github.com/<username-kamu>/backend-huawei.git
cd backend-huawei

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Jalankan Server
node server.js

Atau, jika ingin menggunakan auto-reload:
npm install -g nodemon
nodemon server.js

Server akan berjalan di:
http://localhost:3000

---

## 📂 Struktur Folder
backend-huawei/
│
├── node_modules/ 
├── package.json
├── package-lock.json
├── server.js           
└── README.md

---

## Endpoint API

### 1. Simpan Data (Create)
**POST** `/api/form`

Body (JSON):
{
  "name": "Safira Wulandari",
  "email": "safira@example.com",
  "message": "Halo Huawei!"
}

Response:
{
  "success": true,
  "message": "Data berhasil disimpan.",
  "data": {
    "id": 1,
    "name": "Safira Wulandari",
    "email": "safira@example.com",
    "message": "Halo Huawei!",
    "createdAt": "2025-10-20T08:30:00.000Z"
  }
}

---

### 2. Ambil Semua Data (Read All)
**GET** `/api/form`
curl http://localhost:3000/api/form

---

### 3. Ambil Data Berdasarkan ID (Read One)
**GET** `/api/form/:id`
curl http://localhost:3000/api/form/1

---

### 4. Hapus Data Berdasarkan ID (Delete)
**DELETE** `/api/form/:id`
curl -X DELETE http://localhost:3000/api/form/1

---

## 🧪 Cara Tes API Tanpa Postman

Gunakan **Terminal (macOS / Linux)**:

**POST (kirim data):**
curl -X POST http://localhost:3000/api/form \
     -H "Content-Type: application/json" \
     -d '{"name":"Safira","email":"safira@example.com","message":"Halo Huawei"}'

**GET (lihat semua data):**
curl http://localhost:3000/api/form

**GET (lihat data berdasarkan ID):**
curl http://localhost:3000/api/form/1

**DELETE (hapus data):**
curl -X DELETE http://localhost:3000/api/form/1

---

## 📸 Contoh Output Terminal
Server berjalan di http://localhost:3000
{"success":true,"message":"Data berhasil disimpan.","data":{"id":1,"name":"Safira","email":"safira@example.com","message":"Halo Huawei","createdAt":"2025-10-20T09:15:00.000Z"}}

---

## 📚 Catatan
- Data disimpan sementara di dalam array (`formDataStore`) dan akan hilang saat server di-restart.
- Bisa dikembangkan lebih lanjut untuk menyimpan data ke database (misalnya MongoDB / MySQL).
- Cocok untuk demo API sederhana dan keperluan technical test.

---

## 👨‍💻 Author
**Aries Pujie Prasetio**  
📧 Email: arsiparies@gmail.com  
🌐 GitHub: github.com/ariespujieprasetio
