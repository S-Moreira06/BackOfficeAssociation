import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from "react-router";

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import usePagination from "@/hooks/usePagination";
import useSorting from "@/hooks/useSorting";
import { getAllRequest } from '@/api/request';
import GetDateTime from '@/hooks/get-date-time';

export default function RequestList() {
    const { data } = useQuery({ queryKey: ['requestList'], queryFn: getAllRequest });
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    // Filtrer et trier les données avant pagination
    const filteredData = data?.request?.filter((request) =>
        Object.values(request).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ) || [];

    const { sortedData, handleSort, sortConfig } = useSorting(filteredData);
    const { paginatedData, currentPage, totalPages, goToNextPage, goToPrevPage, changeItemsPerPage, itemsPerPage } = usePagination(sortedData);

    // Fonction pour gérer la recherche
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    // Fonction pour surligner le texte recherché
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, `<span class="bg-yellow-300 font-bold">$1</span>`);
    };

    return (
        <>
            <div className="w-72 ml-5 mt-5">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border rounded w-full"
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
                    {paginatedData.length > 0 ? (
                        paginatedData.map((request) => (
                            
                            <TableRow key={request.id} onClick={() => navigate("/request-detail", { state: { requestId: request.id } })}>
                                <TableCell dangerouslySetInnerHTML={{
                                    __html: highlightText(GetDateTime({ timestamp: request.created_at, format: 'date' }), searchTerm)
                                }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request.category, searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request.name, searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request.phone, searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request.address, searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(`${request.firstname} ${request.lastname}`, searchTerm) }} />
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request.status === 'attente'?'En attente':request.status === 'refused'?'Refusée':'Acceptée', searchTerm) }} />
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="7" className="text-center py-4">
                                Aucun résultat trouvé.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between">
                <Button variant="outline" disabled={currentPage === 1} onClick={goToPrevPage}>Précédent</Button>
                <span className="mx-40">Page {currentPage} / {totalPages}</span>
                <Button variant="outline" disabled={currentPage === totalPages} onClick={goToNextPage}>Suivant</Button>
            </div>

            <div className="flex items-center">
                <label className="mr-2">Afficher :</label>
                <select value={itemsPerPage} onChange={(e) => changeItemsPerPage(Number(e.target.value))} className="p-2 border rounded">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
        </>
    );
}
