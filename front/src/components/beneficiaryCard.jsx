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

import { getAllBeneficiary } from '@/api/beneficiary';

export default function BeneficiaryCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['beneficiaryList'], queryFn: getAllBeneficiary })
    const navigate = useNavigate()

    return (
        <Card  onClick={() => navigate("/beneficiary-list")}>
            <CardHeader>Nombre de bénéficiaires</CardHeader>
            <CardContent className="">{data?.beneficiary.length}</CardContent>
        </Card>
    )
    
}