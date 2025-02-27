import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from "react-router-dom";

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { getAllRequest } from '@/api/request';

export default function RequestCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['requestList'], queryFn: getAllRequest })
    const navigate = useNavigate()
    console.log(data)

    return (
        <Card  onClick={() => navigate("/request-list")}>
                            <CardHeader>Nombre de requetes</CardHeader>
                            <CardContent className="">{data?.request.length}</CardContent>
                        </Card>
    )
    
}