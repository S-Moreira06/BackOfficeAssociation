import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { getAllBeneficiary } from '@/api/beneficiary'

export default function BeneficiaryList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['beneficiaryList'], queryFn: getAllBeneficiary })
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("DATA", data)
    }, [data])
    return (
        <Table>
        <TableCaption className="caption-top">
            Liste des bénéficiaires
        </TableCaption>
        
            <TableHeader>
            <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>RGPD</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {data?.beneficiary.length > 0 && data.beneficiary.map((beneficiary)=>{
            return (
                <TableRow key={beneficiary.id}>
                    <TableCell>{beneficiary?.firstname}</TableCell>
                    <TableCell>{beneficiary?.lastname}</TableCell>
                    <TableCell>{beneficiary?.phone}</TableCell>
                    <TableCell>{beneficiary?.rgpd}</TableCell>
                    <TableCell>
                        <Button onClick={() => navigate("/update-beneficiary",{ state: { beneficiaryId: beneficiary.id }})}>Modifier</Button>
                    </TableCell>
                    <TableCell>
                        <Button onClick={() => navigate("/delete-beneficiary",{ state: { beneficiaryId: beneficiary.id }})}>Supprimer</Button>
                    </TableCell>
                </TableRow>
            )
            })}
            </TableBody>
        
        </Table>
    )
}