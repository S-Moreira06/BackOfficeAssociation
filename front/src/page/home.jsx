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

import { getAllUsers } from '@/api/user'

export default function Home() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ['usersList'], queryFn: getAllUsers })

  const storedData = localStorage.getItem("accessToken")
  const navigate = useNavigate()
  

  return (
    <div className='px-20 py-5 min-h-screen'>
      {storedData ? (
        <>
        <Card  onClick={() => navigate("/UsersList")}>
          <CardHeader>Nombre d'utilisateurs</CardHeader>
          <CardContent>{data?.users.length}</CardContent>
        </Card>
        </>
      ):(
        <>
        <h1>LA PETITE LILI</h1>
        <p>Connectez-vous pour charger la liste des utilisateurs</p></>
      )}
    </div>
  )
}
