/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute(`INSERT INTO type (name)
                          VALUES 
                        ('végétarien'),
                        ('française'),
                        ('italienne'),
                        ('marocaine'),
                        ('tunisienne'),
                        ('bistronomique'),
                        ('japonaise'),
                        ('cambodgienne')
                     ; `);
}
