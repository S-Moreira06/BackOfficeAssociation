import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

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

import { deleteUser, getAllUsers } from '@/api/user';

export default function UsersList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['usersList'], queryFn: getAllUsers })
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteUser, // Fonction API de suppression
        onSuccess: () => {
            queryClient.invalidateQueries(['usersList']); // Rafraîchir la liste des utilisateurs
        },
    });
    useEffect(()=>{
        console.log("DATA", data)
    }, [data])
    return (
        <Table>
        <TableCaption className="caption-top">
            Liste des utilisateurs
        </TableCaption>
        
            <TableHeader>
            <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Téléphone</TableHead>
                
            </TableRow>
            </TableHeader>
            <TableBody>
            {data?.users.length > 0 && data.users.map((user)=>{
            return (
                <TableRow key={user.id}>
                    <TableCell>{user?.firstname}</TableCell>
                    <TableCell>{user?.lastname}</TableCell>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>{user?.phone}</TableCell>
                    <TableCell>{user?.is_archived}</TableCell>
                    <TableCell>
                        <Button onClick={() => navigate("/update-user",{ state: { userId: user.id }})}>Modifier</Button>
                    </TableCell>
                    <TableCell>
                        <AlertDialog>
                            <AlertDialogTrigger>Supprimer</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Etes vous sure de vouloir supprimer l'utilisateur?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Souhaitez vous désactiver le compte de cet utilisateur?
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={() => mutation.mutate(user.id)}>Oui</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                </TableRow>
            )
            })}
            </TableBody>
        
        </Table>
    )
}