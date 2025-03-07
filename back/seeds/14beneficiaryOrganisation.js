/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM beneficiary_organisation;");
    await client.execute(`INSERT INTO beneficiary_organisation (beneficiary_id,organisation_id)
VALUES
    (1, 4),
    (2, 5),
    (3, 7),
    (4, 9),
    (5, 4),
    (6, 5),
    (7, 7),
    (8, 9),
    (9, 4),
    (10, 4)
`);
}