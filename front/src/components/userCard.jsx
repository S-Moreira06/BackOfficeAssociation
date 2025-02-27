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

import { getAllUser } from '@/api/user';

export default function UserCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['userList'], queryFn: getAllUser })
    const navigate = useNavigate()

    return (
        <Card  onClick={() => navigate("/user-list")}>
            <CardHeader>Nombre d'utilisateurs</CardHeader>
            <CardContent className="">{data?.users.length}</CardContent>
        </Card>
    )
    
}