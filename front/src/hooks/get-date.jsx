export default function GetDate({ timestamp }) {
    if (!timestamp) {
        return <p>Chargement...</p>;
    }
    const date = new Date(timestamp.replace(" ", "T")); // evite certain bug , format iso valide
    const formattedDate = date.toLocaleDateString("fr-FR");

    return <p>{formattedDate}</p>;
}
