import {z} from "zod";
// import uuid from 'uuid-random';

export const tambahpenggunaSchema = z.object({
    id_pengguna: z.uuid("UUID tidak valid").optional(),
    nama: z.string().min(5, 'Nama harus diisi minimal 5 karakter'),
    email: z.string().min(10, 'email tidak valid'),
    telepon: z.string().min(10, 'Telepon minimal 10 karakter'),
    passw: z.string().min(6, 'Password minimal 6 karakter'),
    validasi_passw: z.string().min(6, 'Validasi password minimal 6 karakter')
}).refine((data) => data.passw === data.validasi_passw, {
    message: "Password dan Validasi Password harus sama",
    path: ["validasi_passw"]
});


export const perbaruiPenggunaSchema = z.object({
    nama: z.string().min(5, 'Nama harus diisi minimal 5 karakter'),
    email: z.string().min(10, 'email tidak valid'),
    telepon: z.string().min(10, 'Telepon minimal 10 karakter'),
    passw: z.string().min(6, 'Password minimal 6 karakter'),
    validasi_passw: z.string().min(6, 'Validasi password minimal 6 karakter')
}) .refine((data) => data.passw === data.validasi_passw, {
    message: "Password dan Validasi Password harus sama",
    path: ["validasi_passw"]
});

export default {
    tambahpenggunaSchema,
    perbaruiPenggunaSchema
};