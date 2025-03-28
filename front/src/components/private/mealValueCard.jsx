import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { 
    Card, 
    CardContent, 
    CardHeader 
} from "@/components/ui/card";

import { getMealValue, getMealValueByCat } from '@/api/restaurant';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MealValueCard() {
    const [category, setCategory] = useState(null); // Stocke la catégorie sélectionnée

    // Fonction pour récupérer la valeur des repas, selon la catégorie sélectionnée
    const fetchMealValue = async () => {
        if (category) {
            return await getMealValueByCat(category); // Filtrer selon la catégorie
        } else {
            return await getMealValue(); // Si aucune catégorie n'est sélectionnée, obtenir la valeur totale
        }
    };

    // Utilisation de useQuery pour récupérer les données
    const { data, isLoading, isError } = useQuery({
        queryKey: ['mealValue', category], // QueryKey unique avec la catégorie pour gérer le cache
        queryFn: fetchMealValue, // La fonction de récupération des données
        enabled: category !== undefined, // Ne pas exécuter la requête si category est undefined
    });

    return (
        <Card>
            <CardHeader>Valeur des repas</CardHeader>
            <CardContent className="text-lg font-semibold">
                {isLoading ? "Chargement..." : isError ? "Erreur" : `${data?.mealValue || 0} €`}
            </CardContent>
            
            {/* Sélecteur de catégorie */}
            <div className="p-4">
                <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filtrer par catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null}>Toutes catégories</SelectItem> {/* Valeur null pour réinitialiser */}
                        <SelectItem value="association">Association</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </Card>
    )
}
