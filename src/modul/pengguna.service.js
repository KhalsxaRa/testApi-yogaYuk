import * as pgn from "./repo.pengguna.js"

    // GET dengan pagination (limit & offset)
    export const getpengggunas = async (limit = 5, offset = 0) => {
        return await pgn.getpengggunas(limit, offset);
    };
    export const getSemuaPengguna = async () => {
        return await pgn.getSemuaPenggunas();
    };
    export const getTotalPengguna = async () => {
        return await pgn.getTotalPengguna();
    };

    // CREATE
    export const tambahPengguna = async (data) => {
        return await pgn.tambahPengguna(data);
    };

    // UPDATE
    export const perbaruiPengguna = async (id_pengguna, data) => {
        return await pgn.perbaruiPengguna(id_pengguna, data);
    }

    // DELETE
    export const hapusPengguna = async (id_pengguna) => {
        return await pgn.hapusPengguna(id_pengguna);
    }