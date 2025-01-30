import Database from "libsql";

const db = new Database("mydb.db");

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  reset_token VARCHAR(255))
  
  CREATE TABLE IF NOT EXISTS beneficiary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(255) UNIQUE NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    adress VARCHAR(255),
    zip VARCHAR(6),
    city VARCHAR(50), 
    phone VARCHAR(50),
    remark VARCHAR(255),
    rgpd BOOLEAN DEFAULT FALSE,
    created_at DATETIME,
    modified_at DATETIME,
    deleted_at DATETIME
  );`);

export default db;
