/**
 * Migrates the database schema upward, making changes to bring the schema toward the latest version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS beneficiary_reservation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_beneficiary INTEGER NOT NULL,
        id_reservation INTEGER  NOT NULL,
        FOREIGN KEY (id_beneficiary) REFERENCES beneficiary(id)
        FOREIGN KEY (id_reservation) REFERENCES reservation(id)
     )`);
}

/**
 * Migrates the database schema downward, making changes to roll the schema back to a previous version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function down(client) {
    await client.execute(`DROP TABLE beneficiary_reservation`);
}
