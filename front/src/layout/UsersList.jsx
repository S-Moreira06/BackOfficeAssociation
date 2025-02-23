import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

import { getAllUsers } from '@/api/user'

export default function UsersList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['usersList'], queryFn: getAllUsers })

    useEffect(()=>{
        console.log("DATA", data)
    }, [data])
    return (
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
    )
}