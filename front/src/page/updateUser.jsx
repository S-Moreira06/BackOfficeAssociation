import { useLocation } from "react-router-dom";

export default function UpdateUser() {
    const location = useLocation();
    const userId = location.state?.userId; // Récupère l'ID passé en state

    return <div>Modifier l'utilisateur avec ID : {userId}</div>;
}
