/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM beneficiary;");
    await client.execute(`INSERT INTO beneficiary (firstname, lastname, address, zip, city, phone)
    VALUES
    ('Alice', 'Dupont', '123 Rue Principale', '75001', 'Paris', '0601020304'),
        ('Bob', 'Martin', '456 Boulevard Haussmann', '69002', 'Lyon', '0611223344'),
        ('Charlie', 'Durand', '789 Avenue de la République', '13001', 'Marseille', '0622334455'),
        ('Diane', 'Lemoine', '101 Place Bellecour', '31000', 'Toulouse', '0633445566'),
        ('Eric', 'Morel', '12 Rue Lafayette', '44000', 'Nantes', '0644556677'),
        ('Fanny', 'Bertrand', '25 Avenue Foch', '67000', 'Strasbourg', '0655667788'),
        ('Georges', 'Lemoine', '78 Rue Victor Hugo', '59000', 'Lille', '0666778899'),
        ('Hélène', 'Marchand', '32 Place de la République', '33000', 'Bordeaux', '0677889900'),
        ('Isabelle', 'Leroy', '54 Quai de la Seine', '35000', 'Rennes', '0688990011'),
        ('Jacques', 'Renaud', '91 Rue de la Liberté', '38000', 'Grenoble', '0699001122');`
    );
}