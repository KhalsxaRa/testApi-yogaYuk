import env from 'dotenv';
import pkg from 'pg';

const {Pool} = pkg;

env.config();

const mydb = new Pool({
  // koneksi string --> utk menghubungkan db postgres dari file environtment
  connectionString: process.env.PG_URL,
  ssl: {
    require: true, // Wajib di-set untuk memungkinan koneksi eksternal ke neon.tech (cloud postgres)
  }
});

export const query = (text, params) => mydb.query(text, params);
export default mydb;