# Huawei Backend Technical Test – Backend, Automation & Data Processing

## 📘 Deskripsi
Project ini merupakan implementasi **tugas technical test Huawei** yang terdiri dari tiga bagian utama:

1. **Soal 1 – Pengembangan Backend API (Express.js)**  
   Membangun server sederhana dengan endpoint untuk menerima dan menyimpan data formulir menggunakan **Node.js** dan **Express.js**.

2. **Soal 2 – Automation Testing (Cron Job)**  
   Membuat skrip otomatis untuk mengumpulkan data setiap 3 jam dan menghapus file lama (>30 hari) menggunakan cron job.

3. **Soal 3 – Data Processing (SQL)**  
   Menulis query SQL untuk memproses data karyawan (insert, update, aggregate, sort, subquery).

---

## ⚙️ Tech Stack
- **Node.js** (v18+ direkomendasikan)
- **Express.js**
- **CORS**
- **Body-Parser**
- **Built-in Modules:** fs, path
- **Cron (Linux/macOS)**
- **MySQL / PostgreSQL** (untuk Soal 3)

---

## Setup & Cara Menjalankan

### 1️⃣ Clone Repository
Clone project ini dari GitHub:
```
git clone https://github.com/ariespujieprasetio/backend-huawei.git
cd backend-huawei
```

### 2️⃣ Install Dependencies
```
npm install
```

### 3️⃣ Jalankan Server
```
node server.js
```

Atau, jika ingin menggunakan auto-reload:
```
npm install -g nodemon
nodemon server.js
```

Server akan berjalan di:  
http://localhost:3000

---

## 📂 Struktur Folder
```
backend-huawei/
│
├── node_modules/
├── package.json
├── package-lock.json
├── server.js                 # Soal 1 (Express API)
├── collectCron.js            # Soal 2 (Collect Data Otomatis)
├── cleanupCron.js            # Soal 2 (Hapus File Lama)
├── data_processing.sql       # Soal 3 (Query SQL)
├── home/
│   └── cron/                 # Folder hasil file .csv
└── README.md
```

---

## 🧩 Soal 1 – Pengembangan Backend (Express.js)

### 1. Simpan Data (Create)
**POST** `/api/form`

Body (JSON):
```json
{
  "name": "Safira Wulandari",
  "email": "safira@example.com",
  "message": "Halo Huawei!"
}
```

Response:
```json
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
```

### 2. Ambil Semua Data (Read All)
**GET** `/api/form`
```
curl http://localhost:3000/api/form
```

### 3. Ambil Data Berdasarkan ID (Read One)
**GET** `/api/form/:id`
```
curl http://localhost:3000/api/form/1
```

### 4. Hapus Data Berdasarkan ID (Delete)
**DELETE** `/api/form/:id`
```
curl -X DELETE http://localhost:3000/api/form/1
```

---

## 🧪 Cara Tes API Tanpa Postman
Gunakan **Terminal (macOS / Linux)**:

**POST (kirim data):**
```
curl -X POST http://localhost:3000/api/form   -H "Content-Type: application/json"   -d '{"name":"Safira","email":"safira@example.com","message":"Halo Huawei"}'
```

**GET (lihat semua data):**
```
curl http://localhost:3000/api/form
```

**GET (lihat data berdasarkan ID):**
```
curl http://localhost:3000/api/form/1
```

**DELETE (hapus data):**
```
curl -X DELETE http://localhost:3000/api/form/1
```

**Contoh Output Terminal**
```
Server berjalan di http://localhost:3000
{"success":true,"message":"Data berhasil disimpan.","data":{"id":1,"name":"Safira","email":"safira@example.com","message":"Halo Huawei","createdAt":"2025-10-20T09:15:00.000Z"}}
```

---

## 🧭 Soal 2 – Automation Testing (Cron Job)

### 1. Collect Data (collectCron.js)
Script untuk mengumpulkan data otomatis **3 kali sehari (08.00, 12.00, 15.00 WIB)** dan menyimpannya sebagai file `.csv`.

**Cara kerja:**
- Membuat folder `home/cron` jika belum ada.
- Mengambil data dummy (simulasi API).
- Menyimpan hasil ke file `cron_MMDDYYYY_HH.00.csv`.

**Menjalankan manual:**
```
node collectCron.js
```

**Contoh output:**
```
✅ Data collected and saved to home/cron/cron_10202025_15.00.csv
```

**Contoh isi file:**
```
id,name,value
1,Safira,832
2,Aries,411
3,Huawei,928
```

### 2. Cleanup Data (cleanupCron.js)
Script untuk menghapus file lama **lebih dari 30 hari**, dijalankan otomatis setiap malam **jam 23.00 WIB**.

**Menjalankan manual:**
```
node cleanupCron.js
```

**Contoh output:**
```
🗑️ Deleted old file: cron_09182025_15.00.csv
✅ Cleanup complete.
```

### 3. Jadwal Cron Job
Edit cron job dengan:
```
crontab -e
```

Tambahkan baris berikut:
```
# Jalankan collect data 3x sehari
0 8,12,15 * * * /usr/local/bin/node /Users/aries.prasetio/backend-huawei/collectCron.js >> /Users/aries.prasetio/backend-huawei/cron.log 2>&1

# Jalankan cleanup setiap malam jam 23:00
0 23 * * * /usr/local/bin/node /Users/aries.prasetio/backend-huawei/cleanupCron.js >> /Users/aries.prasetio/backend-huawei/cleanup.log 2>&1
```

**Catatan:** Di macOS, sesuaikan path Node dan project kamu.

---

## 🧮 Soal 3 – Data Processing (SQL)

### Deskripsi
Menulis query SQL untuk memproses data employee sesuai ketentuan soal.

### Struktur Tabel (contoh data awal)
| Name  | Position            | Join Date  | Release Date | Year of Experience | Salary |
|-------|---------------------|------------|--------------|--------------------|--------|
| Jacky | Solution Architect  | 2018-07-25 | 2022-07-25   | 8 Years            | 150    |
| John  | Assistant Manager   | 2016-02-02 | 2021-02-02   | 12 Years           | 155    |
| Alano | Manager             | 2010-11-09 | NULL         | 14 Years           | 175    |
| Aaron | Engineer            | 2021-08-16 | 2022-08-16   | 1 Years            | 80     |
| Allen | Engineer            | 2024-06-06 | NULL         | 4 Years            | 75     |
| Peter | Team Leader         | 2020-01-09 | NULL         | 3 Years            | 85     |

### 1. Tambahkan Employee Baru (Albert)
```sql
INSERT INTO employees (Name, Position, Join_Date, Release_Date, Year_of_Experience, Salary)
VALUES ('Albert', 'Engineer', '2024-01-24', NULL, '2.5 Years', 50);
```

### 2. Update Salary Engineer menjadi $85
```sql
UPDATE employees
SET Salary = 85
WHERE Position = 'Engineer';
```

### 3. Hitung Total Pengeluaran Salary Tahun 2021
```sql
SELECT SUM(Salary) AS Total_Salary_2021
FROM employees
WHERE (YEAR(Join_Date) <= 2021)
  AND (Release_Date IS NULL OR YEAR(Release_Date) >= 2021);
```

### 4. Tampilkan 3 Employee dengan Pengalaman Paling Tinggi
```sql
SELECT Name, Position, Year_of_Experience, Salary
FROM employees
ORDER BY CAST(REPLACE(Year_of_Experience, ' Years', '') AS DECIMAL) DESC
LIMIT 3;
```

### 5. Engineer dengan Pengalaman ≤ 3 Tahun
```sql
SELECT *
FROM employees
WHERE Position = 'Engineer'
  AND CAST(REPLACE(Year_of_Experience, ' Years', '') AS DECIMAL) <= 3;
```

### Cara Menjalankan
**MySQL CLI**
```
mysql -u root -p
CREATE DATABASE huawei_test;
USE huawei_test;
SOURCE data_processing.sql;
```

**MySQL Workbench / DBeaver**
- Buat DB `huawei_test` → Import `data_processing.sql` → Jalankan.

---

## Hasil Akhir
- Soal 1 (Backend) → API CRUD berjalan dengan baik.
- Soal 2 (Automation) → Cron job otomatis untuk collect & cleanup data.
- Soal 3 (SQL) → Query berjalan dan hasil sesuai ketentuan.

---

## 👨‍💻 Author
**Aries Pujie Prasetio**  
📧 Email: arsiparies@gmail.com  
🌐 GitHub: https://github.com/ariespujieprasetio
