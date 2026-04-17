import express from 'express';
import { createPengguna, getPengguna, getSemuaPengguna, updatePengguna, deletePengguna } from './pengguna.js';

const router = express.Router();

// GET all pengguna (dengan paginasi di controller limit 5, offset 0)
router.get('/', getPengguna);
router.get('/semuaPengguna', getSemuaPengguna);

// POST buat pengguna baru (dengan validasi schema.pengguna)
router.post('/', createPengguna);

// PUT update data pengguna berdasarkan id_pengguna
router.put('/:id_pengguna', updatePengguna);

// DELETE hapus data pengguna berdasarkan id_pengguna
router.delete('/:id_pengguna', deletePengguna);

export default router;