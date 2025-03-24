import React from 'react'

import UserCard from '@/components/private/userCard';
import RequestCard from '@/components/private/requestCard';
import BeneficiaryCard from '@/components/private/beneficiaryCard';
import RestaurantCard from '@/components/private/RestaurantCard';
import RestaurantsStatsCard from '@/components/private/RestaurantsStatsCard';
import AssociationCard from '@/components/private/associationCard';
import MealValueCard from './mealValue';


export default function Stat() {


    return (
        <>
            <h1>Tableau de bord</h1>
            <RestaurantsStatsCard />
            <div className='grid text-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                <RestaurantCard />
                <AssociationCard />
                <BeneficiaryCard />
                <MealValueCard />
            </div>
        
        </>
    )
}
