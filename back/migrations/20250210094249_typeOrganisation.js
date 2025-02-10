/**
 * Migrates the database schema upward, making changes to bring the schema toward the latest version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS type_organisation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_organisation INT REFERENCES organisation(id) NOT NULL,
        id_type INTEGER REFERENCES type(id) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATETIME
     )`);
}

/**
 * Migrates the database schema downward, making changes to roll the schema back to a previous version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function down(client) {
    await client.execute(`DROP TABLE type_organisation`);
}
