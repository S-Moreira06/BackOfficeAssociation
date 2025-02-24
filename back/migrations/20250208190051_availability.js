/**
 * Migrates the database schema upward, making changes to bring the schema toward the latest version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function up(client) {
    await client.execute(
        `CREATE TABLE IF NOT EXISTS availability (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_id INTEGER NOT NULL,
        date DATE NOT NULL, 
        time_start TIME NOT NULL,
        time_end TIME NOT NULL,
        deadline_accept VARCHAR(50) NOT NULL,
        on_site INT NOT NULL,
        take_away INT NOT NULL,
        max_people INT NOT NULL,
        price INT NOT NULL,
        commentary VARCHAR(255),
        is_archived BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        deleted_at DATETIME,
        FOREIGN KEY (restaurant_id) REFERENCES organisation(id)
     )`);
}

/**
 * Migrates the database schema downward, making changes to roll the schema back to a previous version.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function down(client) {
    await client.execute(`DROP TABLE availability`);
}
