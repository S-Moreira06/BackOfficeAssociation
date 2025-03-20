/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM user_organization;");
    await client.execute(`INSERT INTO user_organization (id_organization, id_user)
VALUES
    (3, 7),
    (1, 5),
    (2, 9),
    (4, 2),
    (5, 1),
    (6, 10),
    (7, 3),
    (8, 4),
    (9, 6),
    (10, 8)
`);
}
