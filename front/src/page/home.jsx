import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'


export default function Home() {
  

  const storedData = localStorage.getItem("accessToken")
  
  return (
    <div className='px-20 py-5 min-h-screen'>
      {storedData ? (
        <p>Vous êtes connectez</p>
      ):(
        <>
        <h1>LA PETITE LILI</h1>
        <p>Connectez-vous pour charger la liste des utilisateurs</p></>
      )}
    </div>
  )
}
