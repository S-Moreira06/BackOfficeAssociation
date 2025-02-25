import { useQuery } from '@tanstack/react-query'
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


import { getAllRestaurants } from '@/api/restaurant'

export default function RestaurantsList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['restaurantsList'], queryFn: getAllRestaurants })
    const navigate = useNavigate()
    console.log(data)
    
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
                <TableHead>RGPD</TableHead>
                <TableHead>Edit</TableHead>
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
                <TableCell><Button onClick={() => navigate("/update-restaurant",{ state: { restaurantId: restaurant.id }})}>Modifier</Button></TableCell>
                </TableRow>
            )
            })}
            </TableBody>
        
        </Table>
    )
}