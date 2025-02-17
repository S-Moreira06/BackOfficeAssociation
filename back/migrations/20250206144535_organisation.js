/**
* Migrates the database schema upward, making changes to bring the schema toward the latest version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function up(client) {
    await client.execute(
    `CREATE TABLE IF NOT EXISTS organisation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50)NOT NULL,
        address VARCHAR(255)NOT NULL,   
        zip VARCHAR(6)  NOT NULL,
        city VARCHAR(50) NOT NULL,
        siret VARCHAR(50)NOT NULL,
        category VARCHAR(6)NOT NULL,
        contact VARCHAR(50)NOT NULL,   
        email VARCHAR(255)NOT NULL,
        phone VARCHAR(20) NOT NULL,
        max_meal INTEGER ,
        description VARCHAR(255) ,
        image VARCHAR(255),
        menu VARCHAR(255),  
        is_archived BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        deleted_at DATETIME
        )`
    );
}

/**
* Migrates the database schema downward, making changes to roll the schema back to a previous version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function down(client) {
    await client.execute("DROP TABLE organisation;");
}
