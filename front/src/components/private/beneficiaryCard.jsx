import { 
    useQuery, 
    useQueryClient 
} from '@tanstack/react-query';
import React from 'react';
import { 
    Card, 
    CardContent, 
    CardHeader, 
} from "@/components/ui/card";
import { 
    Select, 
    SelectTrigger, 
    SelectContent, 
    SelectItem, 
    SelectValue 
} from "@/components/ui/select";
import { 
    getAllBeneficiary, 
    getAllBeneficiaryByAsso 
} from '@/api/beneficiary';
import { 
    getAllAssociation 
} from '@/api/association';

export default function BeneficiaryCard() {
    const queryClient = useQueryClient();

    const { data: associationsData } = useQuery({
        queryKey: ['associationList'], 
        queryFn: getAllAssociation
    });

    const { data: allBeneficiariesData } = useQuery({ 
        queryKey: ['beneficiaryList'], 
        queryFn: getAllBeneficiary 
    });

    // Gestion dynamique des bénéficiaires selon l'association sélectionnée
    const { data: filteredBeneficiariesData } = useQuery({
        queryKey: ['filteredBeneficiaryList'],
        queryFn: async () => {
            const selectedAssociation = queryClient.getQueryData(['selectedAssociation']);
            return selectedAssociation ? getAllBeneficiaryByAsso(selectedAssociation) : getAllBeneficiary();
        }
    });

    // Fonction pour mettre à jour l'association sélectionnée
    const handleSelectChange = (associationId) => {
        const value = associationId === "all" ? null : associationId; // Convertir "all" en null
        queryClient.setQueryData(['selectedAssociation'], value);
        queryClient.invalidateQueries(['filteredBeneficiaryList']); // Rafraîchir les bénéficiaires
    };

    // Déterminer le nombre de bénéficiaires à afficher
    const beneficiaryCount = filteredBeneficiariesData?.beneficiary?.length ?? allBeneficiariesData?.beneficiary?.length;

    return (
        <Card>
            <CardHeader>Nombre de bénéficiaires</CardHeader>
            <CardContent>
                
                <p className="mt-4 text-lg font-semibold">
                    {beneficiaryCount !== undefined ? beneficiaryCount : 'Chargement...'}
                </p>
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Toutes les associations" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="all">Toutes les associations</SelectItem>
                        {associationsData?.organizations?.map((association) => (
                            <SelectItem key={association.id} value={association.id.toString()}>
                                {association.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}
