/**
* Migrates the database schema upward, making changes to bring the schema toward the latest version.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function up(client) {
    await client.execute(
      `
      ALTER TABLE option_organisation RENAME TO option_organization;
      `
    );
  }
  
  /**
  * Migrates the database schema downward, making changes to roll the schema back to a previous version.
  * @param client - The libsql client to use when migrating.
  * @returns { Promise<void> }
  */
  export async function down(client) {
      await client.execute(
          `
          ALTER TABLE option_organization RENAME TO option_organisation;
          `
        );
  }
  