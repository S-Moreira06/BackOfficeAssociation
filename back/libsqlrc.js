/**
* Configuration object for libsql-migrate.
* @typedef {Object.<string, {
*   connection: {
*     url: string,
*     authToken?: string
*   }
* }>} LibsqlMigrateConfig
*/

/**
* Configuration object for libsql-migrate.
* @type {LibsqlMigrateConfig}
*/
export default {
  development: {
    connection: {
      url: "file:mydb.db",
    },
  },
  production: {
    connection: {
      url: "libsql://...",
      authToken: "...",
    },
  },
};
