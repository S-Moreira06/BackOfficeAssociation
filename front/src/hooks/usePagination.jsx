import { useState, useMemo } from "react";

export default function usePagination(data, initialItemsPerPage = 5) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const changeItemsPerPage = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Revenir à la première page
    };

    return {
        currentPage,
        totalPages,
        paginatedData,
        goToNextPage,
        goToPrevPage,
        changeItemsPerPage,
        itemsPerPage,
    };
}
