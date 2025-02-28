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

import { deleteUser, getAllUser } from '@/api/user';

export default function UserList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['userList'], queryFn: getAllUser })
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteUser, 
        onSuccess: () => {
            queryClient.invalidateQueries(['userList']); 
        },
    });
    useEffect(()=>{
        console.log("DATA", data)
    }, [data])
    return (
        <>
            <Button variant="outline" className="mt-2" onClick={()=>navigate("/create-user")}>Créer un utilisateur</Button>
            
            <Table>
            <TableCaption className="caption-top text-xl">
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
                                <AlertDialogContent className="bg-white">
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
        </>
    )
}