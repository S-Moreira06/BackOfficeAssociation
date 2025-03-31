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

import { getAllRequest } from '@/api/request';
import GetDateTime from '@/hooks/get-date-time';

export default function RequestList() {
    const { data } = useQuery({ queryKey: ['requestList'], queryFn: getAllRequest });
    const navigate = useNavigate();

    // États pour la recherche, le tri et la pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Nombre d'éléments par page sélectionnable

    // Fonction de tri
    const sortData = (data, key, direction) => {
        return [...data].sort((a, b) => {
            const valA = a[key] ?? ''; // Gérer valeurs nulles
            const valB = b[key] ?? '';
    
            if (typeof valA === 'number' && typeof valB === 'number') {
                return direction === 'asc' ? valA - valB : valB - valA;
            }
    
            return direction === 'asc'
                ? valA.toString().localeCompare(valB.toString())
                : valB.toString().localeCompare(valA.toString());
        });
    };
    

    // Fonction de gestion du tri
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Fonction de recherche
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset à la première page lors d'une recherche
    };

    // Mise à jour du nombre de résultats par page
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Revenir à la première page après changement
    };

    // Filtrer et trier les données avant pagination
    const filteredData = data?.request?.filter((request) =>
        Object.values(request).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ) || [];

    const sortedData = sortConfig.key ? sortData(filteredData, sortConfig.key, sortConfig.direction) : filteredData;

    // Pagination
    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, endIndex);

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
                                <TableCell dangerouslySetInnerHTML={{ __html: highlightText(request.created_at, searchTerm) }} />
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
            {totalPages >= 1 && (
                <div className='flex justify-between'>
                    <div className="flex justify-between items-center my-4">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Précédent
                        </Button>

                        <span className='mx-40'>Page {currentPage} / {totalPages}</span>

                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Suivant
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-2">Afficher :</label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="p-2 border rounded"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            )}
        </>
    );
}
