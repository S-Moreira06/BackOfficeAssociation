/**
 * Migrates the database schema upward, making changes to bring the schema toward the latest version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS option_organisation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_restaurant INTEGER NOT NULL,
        id_option INTEGER  NOT NULL,
        FOREIGN KEY (id_restaurant) REFERENCES organisation(id)
        FOREIGN KEY (id_option) REFERENCES option(id)
     )`);
}

/**
 * Migrates the database schema downward, making changes to roll the schema back to a previous version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function down(client) {
    await client.execute(`DROP TABLE option_organisation`);
}
