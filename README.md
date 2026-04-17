# 📋 Testing API Pengguna



## 📑 Daftar Isi

- [Setup Database](#setup-database)
- [Setup Environment](#setup-environment)
- [Jalankan Server](#jalankan-server)
- [Testing dengan Postman](#testing-dengan-postman)
- [Validasi Schema](#validasi-schema)
- [Error Handling](#error-handling)

---

## Setup Database



1. Buat database PostgreSQL di neon
2. Jalankan script SQL untuk membuat tabel
3. Insert data dummy (opsional)
4. buat konfigurasi dan koneksi string db dari neon

---

- Table-1-Yogayuk merupakan rancangan basis data saya yang digunakan untuk sign up pengguna <br>
untuk aplikasi yang bernama yogaYuk yang mana berisi pengguna sebagai pelanggan gratis dan berbayar<br>
 yang nantinya akan bisa membeli kelas yoga / mengundang pelatih yoga dalam studio serta akses fitur jadwal detail

## Setup Environment

1. npm install env / langsung buat file dengan isi jsonnya env dalam devdependencies `"dotenv": "^17.3.1"`
2. Isi konfigurasi database di `.env`:

```env
PG_URL=api-neondb contoh :<postgresql://neondb_owner:xxxxxxx>
PORT=
```

---

## Jalankan Server

```bash
npm install
npm start

```

dengan nodemon untuk mode pengembangan ini digunakan untuk 'update' otomatis kalau ada perubahan kode dan ada peringatan misalnya kode yang dibuat ada sintaks yang error

```bash
npm install nodemon


```

tambahkan konfigurasi package.json dalam devdependencies

```json
 "devDependencies": {
    "nodemon": "3.1.14"
  }
```

lalu ketik dlm terminal

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

---

## Testing dengan Postman

1. Import file `BACKEND CAMP4.postman_collection.json` ke Postman
2. Pastikan variable `url` sudah diset ke `http://localhost:3000`
3. Jalankan request sesuai urutan berikut:

### ✅ 1. CREATE NEW PENGGUNA (POST)

**Endpoint:** `POST /pengguna`

**Request Body:**

```json
{
  "nama": "John Doe Test",
  "email": "johndoe@example.com",
  "telepon": "08123456789",
  "passw": "password123",
  "validasi_passw": "password123"
}
```

meminta request dari router pengguna penggunajs

**Expected Response (201):**

```json
{
  "message": "Berhasil membuat data pengguna baru",
  "data": {
    "id_pengguna": "uuid-generated",
    "nama": "John Doe Test",
    "email": "johndoe@example.com",
    "telepon": "08123456789",
    "passw": "password123",
    "validasi_passw": "password123"
  }
}
```

**Contoh Hasil:**

![alt text](https://gist.githubusercontent.com/KhalsxaRa/7d0d0d9b0672e5bb917e456e9b079abd/raw/779cc3aef92d0054b8b3713398d95339a6ed1d1b/Screenshot%25202026-04-16%2520130108.png)

Baris db sudah ditambahkan:

![alt text](https://gist.github.com/KhalsxaRa/7d0d0d9b0672e5bb917e456e9b079abd/raw/779cc3aef92d0054b8b3713398d95339a6ed1d1b/Screenshot%25202026-04-16%2520125303.png)

> ℹ️ Password john doe berbeda karena saya menambahkan hash password dari pustaka bcrypt

---

### ✅ 2. GET PENGGUNA (GET) - Limit Data 5 Baris

**Endpoint:** `GET /pengguna?page=1&limit=5`

**Expected Response (200):**

```json
{
  "message": "Berhasil mengambil data pengguna",
  "page": 1,
  "limit": 5,
  "data": [...]
}
```

**Contoh Hasil:**

![alt text](https://gist.github.com/KhalsxaRa/7d0d0d9b0672e5bb917e456e9b079abd/raw/779cc3aef92d0054b8b3713398d95339a6ed1d1b/Screenshot%25202026-04-16%2520130722.png)

---

### ✅ 2.1 GET PENGGUNA (SEMUA PENGGUNA)

**Endpoint:** `GET /pengguna/semuaPengguna`

**Expected Response:**

```json
{
  "message": "Berhasil mengambil semua data pengguna",
  "data": [...]
}
```

**Contoh Hasil:**

![alt text](https://gist.github.com/KhalsxaRa/7d0d0d9b0672e5bb917e456e9b079abd/raw/779cc3aef92d0054b8b3713398d95339a6ed1d1b/Screenshot%25202026-04-16%2520191942.png)

---

### ✅ 3. UPDATE PENGGUNA (PUT)

**Endpoint:** `PUT /pengguna/:id_pengguna`

**Request Body:**

```json
{
  "nama": "John Doe Updated",
  "email": "johnupdated@example.com",
  "telepon": "08129999999",
  "passw": "newpass123",
  "validasi_passw": "newpass123"
}
```

**Expected Response (200):**

```json
{
  "message": "Berhasil memperbarui data pengguna",
  "data": {...}
}
```

**Contoh Hasil:**
![gambar](https://gist.github.com/KhalsxaRa/7d0d0d9b0672e5bb917e456e9b079abd/raw/779cc3aef92d0054b8b3713398d95339a6ed1d1b/Screenshot%25202026-04-16%2520144004.png)
**Hasil Database:**

![alt text](https://gist.github.com/KhalsxaRa/7d0d0d9b0672e5bb917e456e9b079abd/raw/779cc3aef92d0054b8b3713398d95339a6ed1d1b/Screenshot%25202026-04-16%2520144031.png)

---

### ✅ 4. DELETE PENGGUNA (DELETE)

**Endpoint:** `DELETE /pengguna/:id_pengguna`

**Expected Response (200):**

```json
{
  "message": "Berhasil menghapus data pengguna"
}
```

**Contoh Hasil:**

![alt text](https://gist.github.com/KhalsxaRa/7d0d0d9b0672e5bb917e456e9b079abd/raw/779cc3aef92d0054b8b3713398d95339a6ed1d1b/image.png)

**Hasil Database:**

![alt text](https://gist.github.com/KhalsxaRa/7d0d0d9b0672e5bb917e456e9b079abd/raw/779cc3aef92d0054b8b3713398d95339a6ed1d1b/image-1.png)

> ℹ️ Menghapus db row ke 4 'john doe test'

---

## Validasi Schema

Schema validasi menggunakan **Zod**:

Schema validasi menggunakan **Zod**:

#### 📝 Skema Membuat Pengguna (`tambahPenggunaSchema`)

- `id`: menggunakan pustaka uuid
- `nama`: minimal 5 karakter
- `email`: format email valid
- `telepon`: minimal 10 karakter
- `passw`: minimal 6 karakter
- `validasi_passw`: minimal 6 karakter dan harus sama dengan `passw`

#### 📝 Skema Perbarui Pengguna (`perbaruiPenggunaSchema`)

- `nama`: minimal 5 karakter
- `email`: format email valid
- `telepon`: minimal 10 karakter
- `passw`: minimal 6 karakter
- `validasi_passw`: minimal 6 karakter dan harus sama dengan `passw`

---

<div id="#error-handling">

## Error Handling

| Kode | Keterangan                |
| ---- | ------------------------- |
| 400  | Validasi gagal (ZodError) |
| 404  | Data tidak ditemukan      |
| 500  | Server error              |

---



</div>
