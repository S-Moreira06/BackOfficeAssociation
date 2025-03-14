export default function GetDateTime({ timestamp }) {
    if (!timestamp) {
        return <p>Chargement...</p>;
    }
    const date = new Date(timestamp.replace(" ", "T")); // evite certain bug , format iso valide
    const formattedDate = date.toLocaleString("fr-FR");
    const splitedDate = formattedDate.split(" ",2);
    return `${splitedDate[0]} à ${splitedDate[1]}`;

}