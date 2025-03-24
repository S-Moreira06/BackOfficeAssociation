import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
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

import { getAllRequest } from '@/api/request';
import GetDate from "@/hooks/get-date";

export default function RequestList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['requestList'], queryFn: getAllRequest });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // État pour gérer la colonne triée et l'ordre de tri
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    // Fonction pour trier les données
    const sortData = (data, key, direction) => {
        return data?.request.sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    // Fonction de gestion du clic sur l'en-tête de colonne pour trier
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Trier les données en fonction de la configuration de tri
    const sortedData = sortData(data, sortConfig.key, sortConfig.direction);

    return (
        <>
            <Table>
                <TableCaption className="caption-top text-xl">
                    Liste des requêtes
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead onClick={() => handleSort('created_at')}>
                            Date {sortConfig.key === 'created_at' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('category')}>
                            Type {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('name')}>
                            Nom {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('phone')}>
                            Téléphone {sortConfig.key === 'phone' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('address')}>
                            Adresse {sortConfig.key === 'address' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('firstname')}>
                            Contact {sortConfig.key === 'firstname' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('status')}>
                            Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {sortedData?.length > 0 && sortedData.map((request) => {
                        return (
                            <TableRow key={request.id} onClick={() => navigate("/request-detail", { state: { requestId: request.id } })}>
                                <TableCell><GetDate timestamp={request?.created_at} /></TableCell>
                                <TableCell>{request?.category}</TableCell>
                                <TableCell>{request?.name}</TableCell>
                                <TableCell>{request?.phone}</TableCell>
                                <TableCell>{request?.address}<br />{request?.zip} {request?.city}</TableCell>
                                <TableCell>{request?.firstname} {request?.lastname}</TableCell>
                                <TableCell>{request?.status}</TableCell>
                                <TableCell>
                                    <Button>Valider</Button>
                                </TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger>Refuser</AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Etes vous sûr de vouloir refuser la demande ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Un mail automatique sera envoyé à l'organisation.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Non</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => mutation.mutate(request.id)}>Oui</AlertDialogAction>
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
