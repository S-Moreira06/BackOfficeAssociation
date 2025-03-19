/**
* Migrates the database schema upward, adding the columns `commentary` and `gift` to the `reservation` table.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function up(client) {
  await client.execute(
    `
    ALTER TABLE organization 
    ADD COLUMN latitude FLOAT DEFAULT 0;
    `
);
await client.execute(
  `
  ALTER TABLE organization 
  ADD COLUMN longitude FLOAT DEFAULT 0;
  `
);
await client.execute(
  `
  ALTER TABLE organization 
  DROP COLUMN is_archived;
  `
);
  }
  
  /**
  * Migrates the database schema downward, removing the columns `commentary` and `gift` from the `organization` table.
  * @param client - The libsql client to use when migrating.
  * @returns { Promise<void> }
  */
  export async function down(client) {
    await client.execute(
      `
      ALTER TABLE organization 
      DROP COLUMN latitude;
      `
    );
    await client.execute(
      `
      ALTER TABLE organization 
      DROP COLUMN longitude;
      `
    );
    await client.execute(
      `
      ALTER TABLE organization 
      ADD COLUMN is_archived BOOLEAN;
      `
    );
  }
  