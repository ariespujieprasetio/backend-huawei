# Huawei Backend Technical Test – Backend & Automation

## 📘 Deskripsi
Project ini merupakan implementasi **tugas technical test Huawei** yang terdiri dari dua bagian utama:

1. **Soal 1 – Pengembangan Backend API (Express.js)**  
   Membangun server sederhana dengan endpoint untuk menerima dan menyimpan data formulir menggunakan **Node.js** dan **Express.js**.

2. **Soal 2 – Automation Testing (Cron Job)**  
   Membuat skrip otomatis untuk mengumpulkan data setiap 3 jam dan menghapus file lama (>30 hari) menggunakan cron job.

---

## ⚙️ Tech Stack
- **Node.js** (v18+ direkomendasikan)
- **Express.js**
- **CORS**
- **Body-Parser**
- **Built-in Modules:** fs, path
- **Cron (Linux/macOS)**

---

## Setup & Cara Menjalankan

### 1️⃣ Clone Repository
Clone project ini dari GitHub:
git clone https://github.com/ariespujieprasetio/backend-huawei.git  
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
├── server.js                 # Soal 1 (Express API)  
├── collectCron.js            # Soal 2 (Collect Data Otomatis)  
├── cleanupCron.js            # Soal 2 (Hapus File Lama)  
├── home/  
│   └── cron/                 # Folder hasil file .csv  
└── README.md  

---

## 🧩 Soal 1 – Pengembangan Backend (Express.js)

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
- Dapat dikembangkan untuk integrasi database seperti MongoDB atau MySQL.  
- Cocok untuk demonstrasi API sederhana dan technical test backend.

---

## 🧭 Soal 2 – Automation Testing (Cron Job)

### 1. Collect Data (collectCron.js)
Script untuk mengumpulkan data otomatis **3 kali sehari (08.00, 12.00, 15.00 WIB)** dan menyimpannya sebagai file `.csv`.

**Cara kerja:**
- Membuat folder `/home/cron` jika belum ada.  
- Mengambil data dummy (simulasi API).  
- Menyimpan hasil ke file `cron_MMDDYYYY_HH.00.csv`.  

**Menjalankan manual:**
node collectCron.js

**Contoh output:**
✅ Data collected and saved to home/cron/cron_10202025_15.00.csv

**Contoh isi file:**
id,name,value  
1,Safira,832  
2,Aries,411  
3,Huawei,928

---

### 2. Cleanup Data (cleanupCron.js)
Script untuk menghapus file lama **lebih dari 30 hari**, dijalankan otomatis setiap malam **jam 23.00 WIB**.

**Menjalankan manual:**
node cleanupCron.js

**Contoh output:**
🗑️ Deleted old file: cron_09182025_15.00.csv  
✅ Cleanup complete.

---

### 3. Jadwal Cron Job
Edit cron job dengan:
crontab -e

Tambahkan baris berikut:
# Jalankan collect data 3x sehari
0 8,12,15 * * * /usr/local/bin/node /Users/aries.prasetio/backend-huawei/collectCron.js >> /Users/aries.prasetio/backend-huawei/cron.log 2>&1

# Jalankan cleanup setiap malam jam 23:00
0 23 * * * /usr/local/bin/node /Users/aries.prasetio/backend-huawei/cleanupCron.js >> /Users/aries.prasetio/backend-huawei/cleanup.log 2>&1

---

## 🧠 Penjelasan Teknis
Automation: Proses berjalan otomatis sesuai jadwal tanpa intervensi manual.  
Data Management: Data dikumpulkan dan disimpan dalam file `.csv` untuk audit.  
Cleansing Mechanism: File lama dihapus agar penyimpanan efisien.  
Scalability: Bisa dikembangkan untuk integrasi database atau API eksternal.  
Error Handling: Folder otomatis dibuat jika belum ada. Script tetap berjalan meskipun folder kosong.

---

## 🧪 Testing Manual
1. Jalankan `node collectCron.js` → buat file `.csv` baru.  
2. Jalankan `node cleanupCron.js` → hapus file lama (>30 hari).  
3. Periksa folder `home/cron` untuk memastikan hasil.

---

## ✅ Hasil Akhir
- Server backend (soal 1) menerima, menyimpan, dan menghapus data formulir.  
- Otomasi cron job (soal 2) berhasil menyimpan data & membersihkan file lama.  
- Semua kriteria Huawei terpenuhi: **REST API** dan **Automation Workflow**.

---

## 👨‍💻 Author
**Aries Pujie Prasetio**  
📧 Email: arsiparies@gmail.com  
🌐 GitHub: github.com/ariespujieprasetio
