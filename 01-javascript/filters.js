const filterLocation = document.getElementById('filter-location')
const filterExperience = document.getElementById('filter-experience')
const filterTechnology = document.getElementById('filter-technology')

function handleFiltersChange() {
  const paginationState = window.jobsPagination

  paginationState.filters.location = filterLocation?.value
  paginationState.filters.experience = filterExperience?.value
  paginationState.filters.technology = filterTechnology?.value
  paginationState.currentPage = 1

  window.updateJobsView?.()
}

filterLocation?.addEventListener('change', handleFiltersChange)
filterExperience?.addEventListener('change', handleFiltersChange)
filterTechnology?.addEventListener('change', handleFiltersChange)