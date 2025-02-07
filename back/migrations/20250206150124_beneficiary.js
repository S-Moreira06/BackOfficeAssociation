/**
* Migrates the database schema upward, making changes to bring the schema toward the latest version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS beneficiary (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstname VARCHAR(255) NOT NULL,
          lastname VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          zip VARCHAR(6) NOT NULL,
          city VARCHAR(50) NOT NULL, 
          phone VARCHAR(50) NOT NULL,
          remark VARCHAR(255),
          rgpd BOOLEAN DEFAULT FALSE,
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
        await client.execute("DROP TABLE beneficiary;");

}
