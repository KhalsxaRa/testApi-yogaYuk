import * as penggunaService from './pengguna.service.js';
import { perbaruiPenggunaSchema, tambahpenggunaSchema } from './schema.pengguna.js';
import uuid from 'uuid-random';

export const getPengguna = async (req, res) => {
    try {
     
         var page = parseInt(req.query.page) || 1;
         var limit = parseInt(req.query.limit) || 5;
         
        const offset = (page - 1) * limit;

        const data = await penggunaService.getpengggunas(limit, offset);
        const total = await penggunaService.getTotalPengguna();
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            message: "Berhasil mengambil data pengguna",
            page,
            limit,
            total,
            totalPages,
            data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 
export const getSemuaPengguna = async (req, res) => {
    try {
        const data = await penggunaService.getSemuaPengguna();
        res.status(200).json({
            message: "Berhasil mengambil data pengguna",
            data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const createPengguna = async (req, res) => {
    try {
        // Parse da   n validasi req.body menggunakan zod parser
        const dataValid = tambahpenggunaSchema.parse(req.body);
        const { nama, email, telepon, passw, validasi_passw } = dataValid;
        
        // Buat data baru via service
        const dataBaru = await penggunaService.tambahPengguna({ nama, email, telepon, passw, validasi_passw });
        
        res.status(201).json({
            message: "Berhasil membuat data pengguna baru",
            data: dataBaru
        });
    } catch (error) {
        if (error?.name === 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }

        // Tangani error DB yang umum (contoh: email UNIQUE)
        if (error?.code === '23505') {
            return res.status(409).json({ error: 'Email sudah terdaftar' });
        }

        res.status(500).json({ error: error?.message || 'Terjadi kesalahan pada server' });
    }
};

export const updatePengguna = async (req, res) => {
    try {
        const { id_pengguna } = req.params;
        
        // Validasi format ID
        // if (!uuid.test(id_pengguna)) {
        //     return res.status(400).json({ error: "Format id_pengguna tidak valid" });
        // }

        // Validasi data dengan schema
        const dataValid = perbaruiPenggunaSchema.parse(req.body);
        const { nama, email, telepon, passw, validasi_passw } = dataValid;
        
        // Update via service
        const penggunaDiupdate = await penggunaService.perbaruiPengguna(id_pengguna, { 
            nama, email, telepon, passw, validasi_passw 
        });
        
        if (!penggunaDiupdate) {
            return res.status(404).json({ error: "Pengguna tidak ditemukan" });
        }

        res.status(200).json({
            message: "Berhasil memperbarui data pengguna",
            data: penggunaDiupdate
        });
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: error.message });
    }
};

export const deletePengguna = async (req, res) => {
    try {
        const { id_pengguna } = req.params;
        if (!uuid.test(id_pengguna)) return res.status(400).json({ error: "Format id_pengguna tidak valid" });
        const rowCount = await penggunaService.hapusPengguna(id_pengguna);
        
        if (rowCount === 0) 
        { res.status(200).json({ message: "Berhasil menghapus data pengguna" });
    }
 return res.status(404).json({ error: "Pengguna tidak ditemukan" });

       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getPengguna, createPengguna, updatePengguna, deletePengguna };