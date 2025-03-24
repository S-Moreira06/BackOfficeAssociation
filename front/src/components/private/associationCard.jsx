import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from "react-router";

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { getAllAssociation } from '@/api/association';

export default function AssociationCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['associationList'], queryFn: getAllAssociation })
    const navigate = useNavigate()
    console.log(data)

    return (
        <Card  onClick={() => navigate("/association-list")}>
            <CardHeader>Nombre d'associations</CardHeader>
            <CardContent className="">{data?.organizations.length}</CardContent>
        </Card>
    )
    
}