import { useState, useMemo } from 'react';

/**
 * Paginação e Filtragem
 * @param {Array<any>} initialList - Lista inicial sem filtro
 * @param {number} itemsPerPage - Num de items por página
 */
const usePaginationAndFilter = (initialList = [], itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [filter, setFilter] = useState('');       // Filtro atual
    const [itemsPerPageState, setItemsPerPage] = useState(itemsPerPage); //Valor do estado itemsPerPageState é inicializado com o valor de itemsPerPage
                                                                         //itemsPerPageState, sofre atualizações através da função setItemsPerPage
    // Uso de Memoization nas funcoes abaixo para recalcular a lista apenas quando ter alteração na lista ou filtro
    const filteredList = useMemo(() => {
        if (filter === '') return initialList;
        return initialList.filter(item => item.status === filter);
    }, [initialList, filter]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredList.length / itemsPerPageState);
    }, [filteredList, itemsPerPageState]);

    const paginatedList = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPageState;
        const endIndex = startIndex + itemsPerPageState;
        return filteredList.slice(startIndex, startIndex + itemsPerPageState);
    }, [filteredList, currentPage, itemsPerPageState]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter); 
        setCurrentPage(1); // Volta para primeira pagina ao mudar filtro
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const hangleItemsPerPageChange = (newSize) => {
        setItemsPerPage(newSize);
        setCurrentPage(1);
    };

    return {
        paginatedList,
        currentPage,
        totalPages,
        filter,

        handleFilterChange,
        handlePageChange,
        hangleItemsPerPageChange,

        itemsPerPage: itemsPerPageState,
        totalItems: filteredList.length,
    };
}

export default usePaginationAndFilter;