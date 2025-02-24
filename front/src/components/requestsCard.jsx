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

import { getAllRequests } from '@/api/request';

export default function RequestsCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['requestsList'], queryFn: getAllRequests })
    const navigate = useNavigate()

    return (
        <Card  onClick={() => navigate("/request-list")}>
                            <CardHeader>Nombre de requetes</CardHeader>
                            <CardContent className="">{data?.request.length}</CardContent>
                        </Card>
    )
    
}