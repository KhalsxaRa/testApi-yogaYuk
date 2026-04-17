import mydb from '../config/config.db.js';
// import { getSemuaPengguna } from './pengguna.js';
import bcrypt from 'bcrypt';

export const getpengggunas = async (limit = 5, offset = 0) => {
    const { rows } = await mydb.query(
        'SELECT id_pengguna, nama, email, telepon FROM users LIMIT $1 OFFSET $2',
        [limit, offset]
    );
    return rows;
};

export const getSemuaPenggunas = async (users) => {

    const { rows } = await mydb.query(
        'SELECT id_pengguna, nama, email, telepon FROM users'
    );
    
    return rows;
}

export const getTotalPengguna = async () => {
    const { rows } = await mydb.query(
        'SELECT COUNT(*) as total FROM users'
    );
    return parseInt(rows[0].total);
};

export const tambahPengguna = async (data) => {
    const { nama, email, telepon, passw, validasi_passw } = data;
    const hashedPassword = await bcrypt.hash(passw, 10);
    const { rows } = await mydb.query(
        `INSERT INTO users (nama, email, telepon, passw, validasi_passw) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id_pengguna, nama, email, telepon`,
        [nama, email, telepon, hashedPassword, hashedPassword]
    );
    return rows[0];
};

export const perbaruiPengguna = async (id_pengguna, data) => {
    const { nama, email, telepon, passw } = data;
    const hashedPassword = await bcrypt.hash(passw, 10);
    const { rows } = await mydb.query(
        `UPDATE users SET nama = $1, email = $2, telepon = $3, passw = $4, validasi_passw = $5
         WHERE id_pengguna = $6 RETURNING id_pengguna, nama, email, telepon`,
        [nama, email, telepon, hashedPassword, hashedPassword, id_pengguna]
    );
    return rows[0];
};

export const hapusPengguna = async (id_pengguna) => {
    const { rowCount } = await mydb.query(
        'DELETE FROM users WHERE id_pengguna = $1',
        [id_pengguna]
    );
    return rowCount;
};   
