CREATE TABLE users (
   id_pengguna uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   nama varchar(255) NOT NULL,
   email varchar(255) NOT NULL UNIQUE,
   telepon varchar(20),
   passw text NOT NULL,
   validasi_passw text NOT NULL
);
