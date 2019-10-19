const filters = {
    searchText: '',
    stockFilter: 'all'
}

const getFilters = () => filters

const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }

    if (typeof updates.stockFilter === 'string') {
        filters.stockFilter = updates.stockFilter
    }
}

export { getFilters, setFilters }