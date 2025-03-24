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

    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    useEffect(() => {
        console.log("DATA", data);
    }, [data]);

    const sortData = (data, key, direction) => {
        return data?.users.sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = sortData(data, sortConfig.key, sortConfig.direction);

    return (
        <>
            <Button variant="outline" className="mt-2" onClick={() => navigate("/create-user")}>Créer un utilisateur</Button>
            
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
                    {sortedData?.length > 0 && sortedData.map((user) => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>{user?.firstname}</TableCell>
                                <TableCell>{user?.lastname}</TableCell>
                                <TableCell>{user?.role}</TableCell>
                                <TableCell>{user?.phone}</TableCell>
                                <TableCell>{user?.is_archived}</TableCell>
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
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
