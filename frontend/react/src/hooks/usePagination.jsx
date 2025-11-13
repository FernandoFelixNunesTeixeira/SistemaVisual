import { useState, useMemo } from 'react';

/**
 * Paginação
 * @param {number} itemsPerPage - Num de items por página
 */
export const usePagination = (itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [itemsPerPageState, setItemsPerPage] = useState(10);

    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / itemsPerPage);
    }, [totalItems, itemsPerPage]);

    const paginatedList = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return list.slice(startIndex, endIndex);
    }, [list, currentPage, itemsPerPageState]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleItemsPerPageChange = (newSize) => {
        setItemsPerPage(newSize);
        setCurrentPage(1);
    };

    return {
        paginatedList,
        currentPage,
        totalPages,

        handlePageChange,
        handleItemsPerPageChange,
        
        itemsPerPage: itemsPerPageState,
    };
}