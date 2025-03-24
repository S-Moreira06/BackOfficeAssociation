import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { getMealValue, getMealValueByCat } from '@/api/restaurant';

export default function MealValueCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['mealValue'], queryFn: getMealValue })
    console.log(data)

    return (
        <Card>
            <CardHeader>Valeur des repas</CardHeader>
            <CardContent className="">{data?.mealValue} €</CardContent>
        </Card>
    )
    
}

