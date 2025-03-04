import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
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

import { getAllRequest } from '@/api/request';
import GetDate from "@/hooks/get-date";

export default function RequestList () {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['requestList'], queryFn: getAllRequest })
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return (
        <>
            <Table>
            <TableCaption className="caption-top text-xl">
                Liste des requetes
            </TableCaption>
            
                <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {data?.request.length > 0 && data.request.map((request)=>{
                    const dateOnly = request?.created_at;
                return (
                    <TableRow key={request.id} onClick={() => navigate("/request-detail",{ state: { requestId: request.id }})}>
                        <TableCell><GetDate timestamp={request?.created_at}/></TableCell>
                        <TableCell>{request?.category}</TableCell>
                        <TableCell>{request?.name}</TableCell>
                        <TableCell>{request?.phone}</TableCell>
                        <TableCell>{request?.address}<br/>{request?.zip} {request?.city}</TableCell>
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
                                    <AlertDialogTitle>Etes vous sure de vouloir refuser la demande ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Un mail automatique sera envoyé a l'organisation.
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
                )
                })}
                </TableBody>
            
            </Table>
        </>
    )

}