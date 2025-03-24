import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";


import { getAllRestaurant, getRestaurantsStats,getRestaurantStatsById } from '@/api/restaurant';

import {
    // ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    meal: {
        label: "Repas",
        color: "hsl(var(--chart-1))",
    },
} 

export default function RestaurantCard() {
    const {data: restaurantListData} = useQuery({ queryKey: ['restaurantList'], queryFn: getAllRestaurant })
    const {data: restaurantsStatsData} = useQuery({ queryKey: ['restaurantsStats'], queryFn: getRestaurantsStats })
    const {data: restaurantStatsByIdData} = useQuery({ queryKey: ['restaurantStatById'], queryFn: getRestaurantStatsById })

    const navigate = useNavigate()
{restaurantsStatsData?.restaurantsStats.mealGiftedGrowth}
const chartData = restaurantsStatsData?.restaurantsStats?.mealGiftedGrowth?.map((item) => ({
    month: item.date,    
    meal: item.count,        
})) || []; 

    console.table(restaurantsStatsData)
    return (
        <Card>
            <CardHeader>Nombre de repas offerts</CardHeader>
            <CardContent className="">
            <ChartContainer config={chartConfig} className="sm:min-h-[200px] w-full">
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
                    <Bar dataKey="meal" fill="var(--color-desktop)" radius={4} />
                </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
    
}
// {restaurantListData?.organizations.length}