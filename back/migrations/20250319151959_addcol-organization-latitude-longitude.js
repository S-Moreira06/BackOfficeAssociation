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
  ALTER TABLE availability 
  DROP COLUMN is_archived;
  `
);

await client.execute(
  `
  ALTER TABLE beneficiary 
  DROP COLUMN is_archived;
  `
);
await client.execute(
  `
  ALTER TABLE organization 
  DROP COLUMN is_archived;
  `
);
await client.execute(
  `
  ALTER TABLE request 
  DROP COLUMN is_archived;
  `
);

await client.execute(
  `
  ALTER TABLE reservation 
  DROP COLUMN is_archived;
  `
);

await client.execute(
  `
  ALTER TABLE review 
  DROP COLUMN is_archived;
  `
);

await client.execute(
  `
  ALTER TABLE user 
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
    await client.execute(
      `
      ALTER TABLE availability 
      ADD COLUMN is_archived BOOLEAN;
      `
    );
    await client.execute(
      `
      ALTER TABLE beneficiary 
      ADD COLUMN is_archived BOOLEAN;
      `
    );
    await client.execute(
      `
      ALTER TABLE request 
      ADD COLUMN is_archived BOOLEAN;
      `
    );
    await client.execute(
      `
      ALTER TABLE reservation 
      ADD COLUMN is_archived BOOLEAN;
      `
    );
    await client.execute(
      `
      ALTER TABLE review 
      ADD COLUMN is_archived BOOLEAN;
      `
    );
    await client.execute(
      `
      ALTER TABLE user 
      ADD COLUMN is_archived BOOLEAN;
      `
    );
  }
  