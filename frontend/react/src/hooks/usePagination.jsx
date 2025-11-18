import { useState, useMemo } from 'react';

/**
 * Paginação
 * @param {Array<any>} list - Lista
 * @param {number} initialItemsPerPage - Num de itens por página
 */
export const usePagination = (list = [], initialItemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const totalItems = list.length;

    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / itemsPerPage);
    }, [totalItems, itemsPerPage]);

    const paginatedList = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return list.slice(startIndex, endIndex);
    }, [list, currentPage, itemsPerPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleItemsPerPageChange = (newSize) => {
        setItemsPerPage(Number(newSize));
        setCurrentPage(1);
    };

    return {
        paginatedList,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,

        handlePageChange,
        handleItemsPerPageChange,
    };
};
