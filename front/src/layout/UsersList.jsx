import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { getAllUsers } from '@/api/user'

export default function UsersList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['usersList'], queryFn: getAllUsers })
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("DATA", data)
    }, [data])
    return (
        <Table>
        <TableCaption className="caption-top">
            Liste des utilisateurs
        </TableCaption>
        
            <TableHeader>
            <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Téléphone</TableHead>
                
            </TableRow>
            </TableHeader>
            <TableBody>
            {data?.users.length > 0 && data.users.map((user)=>{
            return (
                <TableRow key={user.id}>
                <TableCell>{user?.firstname}</TableCell>
                <TableCell>{user?.lastname}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user?.phone}</TableCell>
                <TableCell>
                    <Button onClick={() => navigate("/update-user",{ state: { userId: user.id }})}>Modifier</Button>
                </TableCell>
                <TableCell>
                    <Button onClick={() => navigate("/delete-user",{ state: { userId: user.id }})}>Supprimer</Button>
                </TableCell>
                </TableRow>
            )
            })}
            </TableBody>
        
        </Table>
    )
}