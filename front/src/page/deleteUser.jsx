import { useLocation } from "react-router-dom";

import { Button } from '@/components/ui/button'


import { deleteUser } from '@/api/user';


export default function DeleteUser() {
    const location = useLocation();
    const userId = location.state?.userId; 
    console.log(userId)
    return (
    <>
        <p>Etes vous sure de vouloir supprimer cet utilisateur?</p>
        <div>
            <Button onClick={() => deleteUser(userId)}>oui</Button>
            <Button>Non</Button>
        </div>
    </>
    )
}