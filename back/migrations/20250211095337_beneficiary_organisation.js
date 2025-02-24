export async function up(client) {
    await client.execute(`
        CREATE TABLE IF NOT EXISTS beneficiary_organisation (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 beneficiary_id INTEGER NOT NULL,
organisation_id INTEGER NOT NULL,
FOREIGN KEY (beneficiary_id) REFERENCES beneficiary(id) ON DELETE CASCADE,
            FOREIGN KEY (organisation_id) REFERENCES organisation(id) ON DELETE CASCADE
            );
    `);
}

export async function down(client) {
    await client.execute(`DROP TABLE IF EXISTS beneficiary_organisation;`);
}