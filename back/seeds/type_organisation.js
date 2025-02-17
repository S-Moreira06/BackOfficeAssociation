/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    //await client.execute("DELETE FROM type_organisation;");
    await client.execute(`INSERT INTO type_organisation (id_organisation, id_type)
VALUES
    (1, 2),
    (2, 3),
    (3, 1),
    (4, 5),
    (5, 4),
    (6, 2),
    (7, 1),
    (8, 3),
    (9, 5),
    (10, 4)
`);
}
