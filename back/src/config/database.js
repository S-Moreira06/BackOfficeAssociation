import Database from 'libsql';

const db = new Database('mydb.db');

db.exec(`CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname VARCHAR(50),
  lastname VARCHAR(50),   
  mail VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(300),
  zip VARCHAR(6),
  city VARCHAR(50),   
  phone VARCHAR(20),
  role VARCHAR(20) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at DATETIME,
  updated_at DATETIME,
  deleted_at DATETIME,  
  reset_token VARCHAR(255)
  )`
);

db.exec(`CREATE TABLE IF NOT EXISTS organisation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50)NOT NULL,
  address VARCHAR(255)NOT NULL,   
  zip VARCHAR(6)  NOT NULL,
  city VARCHAR(50) NOT NULL,
  siret VARCHAR(50)NOT NULL,
  type VARCHAR(6)NOT NULL,
  contact VARCHAR(50)NOT NULL,   
  mail VARCHAR(255)NOT NULL,
  phone VARCHAR(20) NOT NULL,
  repas_max int ,
  description VARCHAR(255) ,
  image VARCHAR(255),
  menu VARCHAR(255),  
  created_at DATETIME,
  updated_at DATETIME,
  deleted_at DATETIME
    )`
);

db.exec(
  `CREATE TABLE IF NOT EXISTS request (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50)NOT NULL,
    address VARCHAR(255)NOT NULL,   
    zip VARCHAR(6) NOT NULL,
    city VARCHAR(50) NOT NULL,
    siret VARCHAR(50) NOT NULL,
    type VARCHAR(6) NOT NULL,
    contact VARCHAR(50) NOT NULL,   
    mail VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    repas_max int ,
    description VARCHAR(255) ,
    image VARCHAR(255),
    menu VARCHAR(255),  
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME 
    )
 `);

db.exec(`CREATE TABLE IF NOT EXISTS beneficiary (
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
    )
`);
export default db;
