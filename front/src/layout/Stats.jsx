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
import UsersCard from '@/components/usersCard';
import RequestsCard from '@/components/requestsCard';
import BeneficiaryCard from '@/components/beneficiaryCard';
import RestaurantsCard from '@/components/restaurantsCard';


export default function Stats() {


    return (
        <div className='sm:flex justify-between text-center'>
            <UsersCard />
            <RequestsCard />
            <BeneficiaryCard />
            <RestaurantsCard />
        </div>
    )
}