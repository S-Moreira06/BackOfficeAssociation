import { useState } from 'react';

export function useSearch(initialData) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = initialData?.filter((item) =>
        Object.values(item).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ) || [];

    return { searchTerm, handleSearch, filteredData };
}