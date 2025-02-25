import { Button } from '@/components/ui/button'

import { deleteUser } from '@/api/user';


export default function deleteUser() {

    const confirmDelete = ;
    return (
    <>
        <p>Etes vous sure de vouloir supprimer cet utilisateur?</p>
        <div>
            <Button>Oui</Button>
            <Button>Non</Button>
        </div>
    </>
    )
}