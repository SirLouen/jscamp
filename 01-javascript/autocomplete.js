const searchInput = document.getElementById('search-input');

const applySearchFilter = (value) => {
    const paginationState = window.jobsPagination;

    if (!paginationState) {
        return;
    }

    paginationState.filters.search = value;
    paginationState.currentPage = 1;

    window.updateJobsView?.();
};

const handleInput = () => {
    const { value } = searchInput;
    applySearchFilter(value);
};

searchInput.addEventListener('input', handleInput);

