import { useState, useMemo } from "react";

export default function useSorting(data, initialKey = '', initialDirection = 'asc') {
    const [sortConfig, setSortConfig] = useState({ key: initialKey, direction: initialDirection });

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            const valA = a[sortConfig.key] ?? ''; // Gérer valeurs nulles
            const valB = b[sortConfig.key] ?? '';

            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
            }

            return sortConfig.direction === 'asc'
                ? valA.toString().localeCompare(valB.toString())
                : valB.toString().localeCompare(valA.toString());
        });
    }, [data, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    return { sortedData, handleSort, sortConfig };
}
