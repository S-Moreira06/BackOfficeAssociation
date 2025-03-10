import React from 'react'

import UserCard from '@/components/private/userCard';
import RequestCard from '@/components/private/requestCard';
import BeneficiaryCard from '@/components/private/beneficiaryCard';
import RestaurantCard from '@/components/private/RestaurantCard';
import AssociationCard from '@/components/private/associationCard';


export default function Stat() {


    return (
        <div className='grid text-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <UserCard />
            <RequestCard />
            <BeneficiaryCard />
            <RestaurantCard />
            <AssociationCard />
        </div>
    )
}
