import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { 
    Card, 
    CardContent, 
    CardHeader, 
} from "@/components/ui/card";

import { getAllRestaurant, getRestaurantsStats, getRestaurantStatsById } from '@/api/restaurant';

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const chartConfig = {
    mealHere: {
        label: "Sur place",
        color: "hsl(var(--chart-2))",
    },
    mealAway: {
        label: "A emporter",
        color: "hsl(var(--chart-3))",
    },
}; 

export default function RestaurantCard() {
    const queryClient = useQueryClient();

    const { data: restaurantListData } = useQuery({
        queryKey: ['restaurantList'], 
        queryFn: getAllRestaurant
    });

    const { data: restaurantStatsByIdData } = useQuery({
        queryKey: ['restaurantStatById'],
        queryFn: async () => {
            const selectedRestaurant = queryClient.getQueryData(['selectedRestaurant']);
            return selectedRestaurant ? getRestaurantStatsById(selectedRestaurant) : getRestaurantsStats();
        }
    });

    // Fonction pour mettre à jour l'ID du restaurant sélectionné
    const handleSelectChange = (restaurantId) => {
        const value = restaurantId === "all" ? null : restaurantId;
        queryClient.setQueryData(['selectedRestaurant'], value);
        queryClient.invalidateQueries(['restaurantStatById']); // Rafraîchir les statistiques du restaurant sélectionné
    };

    // Déterminer les données du graphique
    const chartData = restaurantStatsByIdData?.restaurantsStats?.mealGiftedGrowth?.map((item) => ({
        month: item.date,    
        mealHere: item.count_here,
        mealAway: item.count_away,        
    })) || []; 
    console.table(restaurantStatsByIdData)
    return (
        <Card className="lg:w-[80%] mx-auto mb-3">
            <CardHeader>Nombre de repas offerts</CardHeader>
            <CardContent>

                {/* Sélecteur de restaurant */}
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tous les restaurants" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="all">Tous les restaurants</SelectItem>
                        {restaurantListData?.organizations?.map((restaurant) => (
                            <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                                {restaurant.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Graphique */}
                <ChartContainer config={chartConfig} className="sm:min-h-[200px] max-h-[300px] w-full mt-4">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />  
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={3}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="mealHere" stackId="a" fill="var(--chart-2)" radius={4} />
                        <Bar dataKey="mealAway" stackId="a" fill="var(--chart-3)" radius={4} />

                    </BarChart>
                </ChartContainer>

            </CardContent>
        </Card>
    );
}
