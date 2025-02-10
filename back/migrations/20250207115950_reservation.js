/**
* Migrates the database schema upward, making changes to bring the schema toward the latest version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS reservation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_organisation INTEGER REFERENCES organisation(id) NOT NULL,
            id_availability INTEGER REFERENCES availability(id) NOT NULL,
            time DATETIME NOT NULL,
            email VARCHAR(255) NOT NULL,
            nb_place_setting INTEGER NOT NULL, 
            status VARCHAR(50) NOT NULL,
            take_away BOOLEAN DEFAULT FALSE,
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
        await client.execute("DROP TABLE reservation;");

}
