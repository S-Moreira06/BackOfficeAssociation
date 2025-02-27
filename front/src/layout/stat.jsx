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
import UserCard from '@/components/userCard';
import RequestCard from '@/components/requestCard';
import BeneficiaryCard from '@/components/beneficiaryCard';
import RestaurantCard from '@/components/restaurantCard';
import AssociationCard from '@/components/associationCard';


export default function Stat() {


    return (
        <div className='sm:flex justify-between text-center'>
            <UserCard />
            <RequestCard />
            <BeneficiaryCard />
            <RestaurantCard />
            <AssociationCard />
        </div>
    )
}