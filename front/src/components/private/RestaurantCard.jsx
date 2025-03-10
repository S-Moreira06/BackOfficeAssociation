import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router";

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { getAllRestaurant } from '@/api/restaurant';

export default function RestaurantCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['restaurantList'], queryFn: getAllRestaurant })
    const navigate = useNavigate()
    console.log(data)

    return (
        <Card  onClick={() => navigate("/restaurant-list")}>
            <CardHeader>Nombre de restaurants</CardHeader>
            <CardContent className="">{data?.organisations.length}</CardContent>
        </Card>
    )
    
}