/**
* Migrates the database schema upward, making changes to bring the schema toward the latest version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS review (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_reservation INT REFERENCES reservation(id) NOT NULL,
        id_benificiary INT REFERENCESgit  beneficiary(id) NOT NULL,
        rating INT NOT NULL,
        comentary VARCHAR(250),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        deleted_at DATETIME
     )`);
}

/**
* Migrates the database schema downward, making changes to roll the schema back to a previous version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function down(client) {
    await client.execute(`DROP TABLE review`);
}
