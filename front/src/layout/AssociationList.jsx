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


import { getAllAssociation, deleteAssociation } from '@/api/association'

export default function RestaurantsList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['associationList'], queryFn: getAllAssociation })
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteAssociation,
        onSuccess: () => {
            queryClient.invalidateQueries(['associationList']);
        },
    });
    
    return (
        <>
        
        <Button onClick={()=>navigate("/create-association")}>Créer une association</Button>
        <Table>
        <TableCaption className="caption-top">
            Liste des associations
        </TableCaption>
        
            <TableHeader>
            <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Siret</TableHead>
                <TableHead>Repas max.</TableHead>
                <TableHead>Description</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {data?.organisations.length > 0 && data.organisations.map((association)=>{
            return (
                <TableRow key={association.id}>
                <TableCell>{association?.name}</TableCell>
                <TableCell>{association?.contact}</TableCell>
                <TableCell>{association?.address}<br/>{association?.zip} {association?.city}</TableCell>
                <TableCell>{association?.phone}</TableCell>
                <TableCell>{association?.siret}</TableCell>
                <TableCell>{association?.max_meal}</TableCell>
                <TableCell>{association?.description}</TableCell>
                <TableCell>{association?.is_archived}</TableCell>
                <TableCell><Button onClick={() => navigate("/update-association",{ state: { associationId: association.id }})}>Modifier</Button></TableCell>
                <TableCell>
                    <AlertDialog>
                        <AlertDialogTrigger>Supprimer</AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                            <AlertDialogTitle>Etes vous sure de vouloir supprimer l'association?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Souhaitez vous désactiver l'association et les agents lui appartenant?
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => mutation.mutate(association.id)}>Oui</AlertDialogAction>
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