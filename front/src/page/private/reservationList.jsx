import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
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

import { getAllReservation} from '@/api/reservation'
import GetDate from "@/hooks/get-date"

export default function ReservationList () {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['reservationList'], queryFn: getAllReservation })
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    console.log(data)

    return (
        <>
        <Button variant="outline" className="mt-2" onClick={()=>navigate("/reservation-list")}>Retour aux disponibilités</Button>
        <Table>
            <TableCaption className="caption-top text-xl">
                Liste des réservations
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Association</TableHead>
                    <TableHead>Disponibilité</TableHead>
                    <TableHead>Horraires</TableHead>
                    <TableHead>Nombre de couverts</TableHead>
                    <TableHead>A emporté?</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Commentaire</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {data?.reservations.length > 0 && data.reservations.map((reservation)=>{
            return (
                <TableRow key={reservation.id} onClick={() => navigate("/reservation-detail",{ state: { reservationId: reservation.id }})}>
                <TableCell>{reservation?.id_organisation}</TableCell>
                <TableCell>{reservation?.id_availability}</TableCell>
                <TableCell>{reservation?.time}</TableCell>
                <TableCell>{reservation?.nb_place_setting}</TableCell>
                <TableCell>{reservation?.take_away}</TableCell>
                <TableCell>{reservation?.status}</TableCell>
                <TableCell>{reservation?.commentary}</TableCell>
                <TableCell><Button onClick={() => navigate("/update-reservation",{ state: { restaurantId: reservation.id }})}>Modifier</Button></TableCell>
                <TableCell>
                    <AlertDialog>
                        <AlertDialogTrigger>Supprimer</AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                            <AlertDialogTitle>Etes vous sure de vouloir supprimer la disponibilité?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Souhaitez vous désactiver la disponibilité?
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => mutation.mutate(reservation.id)}>Oui</AlertDialogAction>
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