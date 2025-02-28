import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from "react-router-dom";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Guest from "../guest"
import Stat from "../../components/private/stat"
import { getAllUser } from '@/api/user'

export default function Home() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ['userList'], queryFn: getAllUser })

  const storedData = localStorage.getItem("accessToken")
  const navigate = useNavigate()
  

  return (
    <div className='px-20 py-5 min-h-screen'>
      {storedData ? (
        <Stat/>
      ):(
        <>
          <Guest />
        </>
      )}
    </div>
  )
}
