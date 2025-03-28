import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from "react-router";

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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { getAllRequest } from '@/api/request';
import GetDate from "@/hooks/get-date";

export default function RequestList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['requestList'], queryFn: getAllRequest });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // État pour gérer la colonne triée et l'ordre de tri
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState(''); // État pour la recherche

    // Fonction pour trier les données, a extraire dans un hook pour l'utiliser sur toutes les listes
    const sortData = (data, key, direction) => {
        return data?.sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    // Fonction de gestion du clic sur l'en-tête de colonne pour trier,  a extraire dans un hook pour l'utiliser sur toutes les listes
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Fonction de recherche,  a extraire dans un hook pour l'utiliser sur toutes les listes
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrer les données en fonction du terme de recherche, soit a extraire dans un hook pour l'utiliser sur toutes les listes soit a adapter sur chaque page , a tester
    const filteredData = data?.request?.filter((request) => {
        return (
            request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Date
            request.address.toLowerCase().includes(searchTerm.toLowerCase()) ||     // Adresse
            request.category.toLowerCase().includes(searchTerm.toLowerCase()) ||    // Type
            (request.firstname + ' ' + request.lastname).toLowerCase().includes(searchTerm.toLowerCase()) // Contact
        );
    });

    // Trier les données après filtrage, idem a tester selon lutilisation des deux block du dessus
    const sortedData = filteredData ? sortData(filteredData, sortConfig.key, sortConfig.direction) : [];

    //fonction pour surligner le texte selon la valeur du champ de recherche
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi'); // Recherche insensible à la casse
        return text.replace(regex, `<span class="bg-yellow-300 font-bold">$1</span>`);
    };
    
    return (
        <>
            <div className="mb-4">
                {/* Champ de recherche */}
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border rounded"
                />
            </div>
            
            <Table>
                <TableCaption className="caption-top text-xl">
                    Liste des requêtes
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead onClick={() => handleSort('created_at')}>
                            Date {sortConfig.key === 'created_at' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('category')}>
                            Type {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('name')}>
                            Nom {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('phone')}>
                            Téléphone {sortConfig.key === 'phone' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('address')}>
                            Adresse {sortConfig.key === 'address' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('firstname')}>
                            Contact {sortConfig.key === 'firstname' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                        <TableHead onClick={() => handleSort('status')}>
                            Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData?.length > 0 && filteredData.map((request) => (
                        <TableRow key={request.id} onClick={() => navigate("/request-detail", { state: { requestId: request.id } })}>
                            <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request?.created_at, searchTerm) }} />
                            <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request?.category, searchTerm) }} />
                            <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request?.name, searchTerm) }} />
                            <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request?.phone, searchTerm) }} />
                            <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request?.address, searchTerm) }} />
                            <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request?.firstname + " " + request?.lastname, searchTerm) }} />
                            <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request?.status, searchTerm) }} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
