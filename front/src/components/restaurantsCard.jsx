import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { getAllRestaurants } from '@/api/restaurant';

export default function RestaurantsCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['restaurantsList'], queryFn: getAllRestaurants })
    const navigate = useNavigate()

    return (
        <Card  onClick={() => navigate("/restaurants-list")}>
            <CardHeader>Nombre de restaurants</CardHeader>
            <CardContent className="">{data?.restaurants.length}</CardContent>
        </Card>
    )
    
}