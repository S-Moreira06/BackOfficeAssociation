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

import { getAllAvailabilities } from '@/api/availability'
import GetDate from "@/hooks/get-date"

export default function AvailabilitiesList () {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['availabilitiesList'], queryFn: getAllAvailabilities })
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    console.log(data)

    return (
        <>
        <Button variant="outline" className="mt-2" onClick={()=>navigate("/create-availability")}>Créer une disponibilité</Button>
        <Table>
            <TableCaption className="caption-top text-xl">
                Liste des disponibilités
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Horraires</TableHead>
                    <TableHead>Delai de reservation</TableHead>
                    <TableHead>Sur place</TableHead>
                    <TableHead>A emporter</TableHead>
                    <TableHead>Max par resa</TableHead>
                    <TableHead>Valeur</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {data?.availabilities.length > 0 && data.availabilities.map((availability)=>{
                const price = availability?.price/100
            return (
                <TableRow key={availability.id} onClick={() => navigate("/availability-detail",{ state: { availabilityId: availability.id }})}>
                <TableCell>{availability?.restaurant_id}</TableCell>
                <TableCell><GetDate timestamp={availability?.date}/></TableCell>
                <TableCell>{availability?.time_start}-{availability?.time_end}</TableCell>
                <TableCell>{availability?.deadline_accept} heures</TableCell>
                <TableCell>{availability?.on_site}</TableCell>
                <TableCell>{availability?.take_away}</TableCell>
                <TableCell>{availability?.max_people}</TableCell>
                <TableCell>{price}€</TableCell>
                <TableCell><Button onClick={() => navigate("/update-availability",{ state: { restaurantId: availability.id }})}>Modifier</Button></TableCell>
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
                            <AlertDialogAction onClick={() => mutation.mutate(availability.id)}>Oui</AlertDialogAction>
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