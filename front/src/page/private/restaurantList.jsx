import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react'
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


import { getAllRestaurant, deleteRestaurant } from '@/api/restaurant'
import usePagination from "@/hooks/usePagination"
import useSorting from "@/hooks/useSorting"
import { useSearch } from '@/hooks/useSearch'
import { useHighlight } from '@/hooks/useHighlight'

export default function RestaurantList() {
    const { isPending, isError, data, error } = useQuery({ queryKey: ['restaurantList'], queryFn: getAllRestaurant })
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries(['restaurantList']);
        },
    });
    const { searchTerm, handleSearch, filteredData } = useSearch(data?.organizations || []);
    const { sortedData, handleSort, sortConfig } = useSorting(filteredData);
    const { paginatedData, currentPage, totalPages, goToNextPage, goToPrevPage, changeItemsPerPage, itemsPerPage } = usePagination(sortedData);
    const { highlightText } = useHighlight();
    
    return (
        <>
        <div className='flex justify-between'>
            <div className="w-72 ml-5 mt-5">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border rounded w-full"
                />
            </div>
            <Button variant="outline" className="mt-2" onClick={()=>navigate("/create-restaurant")}>Créer un restaurant</Button>
        </div>
        <Table>
        <TableCaption className="caption-top text-xl">
            Liste des restaurants
        </TableCaption>
        
            <TableHeader>
            <TableRow>
                <TableHead onClick={() => handleSort('name')}>Nom {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</TableHead>
                <TableHead onClick={() => handleSort('city')}>Ville {sortConfig.key === 'city' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</TableHead>
                <TableHead onClick={() => handleSort('max_meal')}>Repas max. {sortConfig.key === 'max_meal' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</TableHead>
                <TableHead onClick={() => handleSort('phone')}>Téléphone {sortConfig.key === 'phone' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</TableHead>
                
            </TableRow>
            </TableHeader>
            <TableBody>
            {paginatedData?.length > 0 ?(
                paginatedData.map((restaurant)=>(
                <TableRow key={restaurant.id}>
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightText(restaurant.name|| '', searchTerm) }} />
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightText(restaurant.city|| '', searchTerm) }} />
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightText(restaurant.max_meal|| '', searchTerm) }} />
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightText(restaurant.phone|| '', searchTerm) }} />
                    <TableCell dangerouslySetInnerHTML={{ __html: highlightText(restaurant.is_archived|| '', searchTerm) }} />
                <TableCell><Button onClick={() => navigate("/update-restaurant",{ state: { restaurantId: restaurant.id }})}>Modifier</Button></TableCell>
                <TableCell>
                    <AlertDialog>
                        <AlertDialogTrigger>Supprimer</AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                            <AlertDialogTitle>Etes vous sure de vouloir supprimer le restaurant?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Souhaitez vous désactiver le restaurant?
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => mutation.mutate(restaurant.id)}>Oui</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </TableCell>
                </TableRow>))
            ):(
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
    )
}