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


import { getAllRestaurants, deleteRestaurant } from '@/api/restaurant'

export default function RestaurantsList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['restaurantsList'], queryFn: getAllRestaurants })
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries(['retaurantsList']);
        },
    });
    
    return (
        <Table>
        <TableCaption className="caption-top">
            Liste des restaurants
        </TableCaption>
        
            <TableHeader>
            <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Repas max.</TableHead>
                
            </TableRow>
            </TableHeader>
            <TableBody>
            {data?.organisations.length > 0 && data.organisations.map((restaurant)=>{
            return (
                <TableRow key={restaurant.id}>
                <TableCell>{restaurant?.name}</TableCell>
                <TableCell>{restaurant?.city}</TableCell>
                <TableCell>{restaurant?.phone}</TableCell>
                <TableCell>{restaurant?.max_meal}</TableCell>
                <TableCell>{restaurant?.is_archived}</TableCell>
                <TableCell><Button onClick={() => navigate("/update-restaurant",{ state: { restaurantId: restaurant.id }})}>Modifier</Button></TableCell>
                <TableCell>
                    <AlertDialog>
                        <AlertDialogTrigger>Supprimer</AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                            <AlertDialogTitle>Etes vous sure de vouloir supprimer l'utilisateur?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Souhaitez vous désactiver le beneficiary?
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => mutation.mutate(restaurant.id)}>Oui</AlertDialogAction>
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