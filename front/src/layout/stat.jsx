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
import UserCard from '@/components/UserCard';
import RequestCard from '@/components/RequestCard';
import BeneficiaryCard from '@/components/BeneficiaryCard';
import RestaurantCard from '@/components/RestaurantCard';
import AssociationCard from '@/components/AssociationCard';


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