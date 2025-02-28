import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { getAllBeneficiary, deleteBeneficiary } from '@/api/beneficiary'

export default function BeneficiaryList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['beneficiaryList'], queryFn: getAllBeneficiary })
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteBeneficiary,
        onSuccess: () => {
            queryClient.invalidateQueries(['beneficiaryList']);
        },
    });

    return (
        <>
            <Button variant="outline" className="mt-2" onClick={()=>navigate("/create-beneficiary")}>Créer un bénéficiaire</Button>
            <Table>
            <TableCaption className="caption-top text-xl">
                Liste des bénéficiaires
            </TableCaption>
            
                <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Adresse</TableHead>
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
                        <TableCell>{beneficiary?.address}<br/>{beneficiary?.zip} {beneficiary?.city}</TableCell>
                        <TableCell>{beneficiary?.rgpd}</TableCell>
                        <TableCell>{beneficiary?.is_archived}</TableCell>
                        <TableCell>
                            <Button onClick={() => navigate("/update-beneficiary",{ state: { beneficiaryId: beneficiary.id }})}>Modifier</Button>
                        </TableCell>
                        <TableCell>
                            <AlertDialog>
                                <AlertDialogTrigger>Supprimer</AlertDialogTrigger>
                                <AlertDialogContent className="bg-white">
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Etes vous sure de vouloir supprimer l'utilisateur?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Souhaitez vous désactiver le compte de cet utilisateur?
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => mutation.mutate(beneficiary.id)}>Oui</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                )
                })}
                </TableBody>
            
            </Table>
        </>
    )
}