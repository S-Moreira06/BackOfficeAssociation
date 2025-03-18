import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from "react-router";

import { 
    Card, 
    CardContent, 
    CardHeader, 
} from "@/components/ui/card";

import { getAllBeneficiary } from '@/api/beneficiary';

export default function BeneficiaryCard() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['beneficiaryList'], queryFn: getAllBeneficiary })
    const navigate = useNavigate()

    return (
        <Card>
            <CardHeader>Nombre de bénéficiaires</CardHeader>
            <CardContent className="">{data?.beneficiary.length}</CardContent>
        </Card>
    )
    
}