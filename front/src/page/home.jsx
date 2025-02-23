import { listUsersExample } from '@/api/auth'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

export default function Home() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ['listUser'], queryFn: listUsersExample })

  useEffect(()=>{
    console.log("DATA", data)
  }, [data])

  const storedData = localStorage.getItem("accessToken")
  
  return (
    <div className='px-20 py-5 min-h-screen'>
      {storedData ? (
        <>
        <h2 className='text-xl'>Liste d'utilisateurs</h2>
        <ol className='flex gap-4 flex-col mt-10'>
          {data?.length > 0 && data.map((user)=>{
            return (<li key={user.id}>{user?.name}</li>)
          })}
        </ol></>
      ):(
        <>
        <h1>LA PETITE LILI</h1>
        <p>Connectez-vous pour charger la liste des utilisateurs</p></>
      )}
    </div>
  )
}
