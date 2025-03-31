import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { deleteUser, getAllUser } from '@/api/user';
import usePagination from "@/hooks/usePagination";
import useSorting from "@/hooks/useSorting";

export default function UserList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['userList'], queryFn: getAllUser });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteUser, 
        onSuccess: () => {
            queryClient.invalidateQueries(['userList']); 
        },
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log("DATA", data);
    }, [data]);

    // Filtrer et trier les données avant pagination
    const filteredData = data?.users?.filter((user) =>
        Object.values(user).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ) || [];
    const { sortedData, handleSort, sortConfig } = useSorting(filteredData);
    const { paginatedData, currentPage, totalPages, goToNextPage, goToPrevPage, changeItemsPerPage, itemsPerPage } = usePagination(sortedData);
    // Fonction pour gérer la recherche
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    // Fonction pour surligner le texte recherché
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, `<span class="bg-yellow-300 font-bold">$1</span>`);
    };

    return (
        <>
            <div className='flex justify-between'>
                <div className="w-72 ml-5 mt-5">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <Button variant="outline" className="mt-2" onClick={() => navigate("/create-user")}>Créer un utilisateur</Button>
            </div>
            
            <Table>
                <TableCaption className="caption-top text-xl">
                    Liste des utilisateurs
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead onClick={() => handleSort('firstname')}>
                            Nom {sortConfig.key === 'firstname' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('lastname')}>
                            Prénom {sortConfig.key === 'lastname' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('role')}>
                            Role {sortConfig.key === 'role' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('phone')}>
                            Téléphone {sortConfig.key === 'phone' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedData?.length > 0 ?(
                        paginatedData.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(user.firstname|| '', searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(user.lastname|| '', searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(user.role|| '', searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(user.phone|| '', searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(user.is_archived|| '', searchTerm) }} />
                                
                                <TableCell>
                                    <Button onClick={() => navigate("/update-user", { state: { userId: user.id } })}>Modifier</Button>
                                </TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger>Supprimer</AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Etes-vous sûr de vouloir supprimer l'utilisateur ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Souhaitez-vous désactiver le compte de cet utilisateur ?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => mutation.mutate(user.id)}>Oui</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>))
                        ):(
                            <TableRow>
                                <TableCell colSpan="7" className="text-center py-4">
                                    Aucun résultat trouvé.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            {/* Pagination */}
            <div className="flex justify-between">
                <Button variant="outline" disabled={currentPage === 1} onClick={goToPrevPage}>Précédent</Button>
                <span className="mx-40">Page {currentPage} / {totalPages}</span>
                <Button variant="outline" disabled={currentPage === totalPages} onClick={goToNextPage}>Suivant</Button>
            </div>

            <div className="flex items-center">
                <label className="mr-2">Afficher :</label>
                <select value={itemsPerPage} onChange={(e) => changeItemsPerPage(Number(e.target.value))} className="p-2 border rounded">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </>
    );
}
