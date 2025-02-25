export async function seed(client) {
    await client.execute("DELETE FROM beneficiary_reservation;");
    await client.execute(`INSERT INTO beneficiary_reservation (id_beneficiary, id_reservation)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 1),
    (8, 2),
    (9, 3),
    (10, 4)
`);
}