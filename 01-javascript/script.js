const filterJob = document.getElementById('filter-job')
const filterLocation = document.getElementById('filter-location')
const filterContract = document.getElementById('filter-contract')
const filterExperience = document.getElementById('filter-experience')

function filterJobs() {
    const selectedJob = filterJob.value;
    const selectedLocation = filterLocation.value;
    const selectedContract = filterContract.value;
    const selectedExperience = filterExperience.value;

    const jobListings = document.querySelectorAll('.job-listing');

    jobListings.forEach(function(listing) {
        const matchesJob = !selectedJob || listing.dataset.job === selectedJob;
        const matchesLocation = !selectedLocation || listing.dataset.location === selectedLocation;
        const matchesContract = !selectedContract || listing.dataset.contract === selectedContract;
        const matchesExperience = !selectedExperience || listing.dataset.experience === selectedExperience;

        const isVisible = matchesJob && matchesLocation && matchesContract && matchesExperience;
        listing.style.display = isVisible ? '' : 'none';
    });
}

filterJob.addEventListener('change', filterJobs);
filterLocation.addEventListener('change', filterJobs);
filterContract.addEventListener('change', filterJobs);
filterExperience.addEventListener('change', filterJobs);

const filterSelect = document.querySelectorAll('.filter-select');

filterSelect.forEach(function(filter) {
    filter.addEventListener('click', function(event) {
        const element = event.target;
        if (
            'showPicker' in HTMLSelectElement.prototype && 
            element.tagName === 'SELECT'
        ) {
            element.showPicker();
          }
    });
});