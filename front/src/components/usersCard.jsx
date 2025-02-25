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

import { getAllUsers } from '@/api/user';

export default function UsersCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['usersList'], queryFn: getAllUsers })
    const navigate = useNavigate()

    return (
        <Card  onClick={() => navigate("/users-list")}>
            <CardHeader>Nombre d'utilisateurs</CardHeader>
            <CardContent className="">{data?.users.length}</CardContent>
        </Card>
    )
    
}