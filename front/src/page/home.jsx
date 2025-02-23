import { usersList } from '@/api/usersList'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

export default function Home() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ['usersList'], queryFn: usersList })

  useEffect(()=>{
    console.log("DATA", data)
  }, [data])

  const storedData = localStorage.getItem("accessToken")
  
  return (
    <div className='px-20 py-5 min-h-screen'>
      {storedData ? (
        <>
        <caption className="caption-top">
          Liste des utilisateurs
        </caption>
        <table className="">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
          {data?.users.length > 0 && data.users.map((user)=>{
            return (
              <tr key={user.id}>
                <td>{user?.firstname}</td>
                <td>{user?.firstname}</td>
                <td>{user?.role}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        </>
      ):(
        <>
        <h1>LA PETITE LILI</h1>
        <p>Connectez-vous pour charger la liste des utilisateurs</p></>
      )}
    </div>
  )
}
