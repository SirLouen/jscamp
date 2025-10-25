const filterLocation = document.getElementById('filter-location')
const filterExperience = document.getElementById('filter-experience')
const filterTechnology = document.getElementById('filter-technology')

const parseDatasetList = (value) => value ? value.split('|') : [];

function filterJobs() {
    const selectedLocation = filterLocation?.value || '';
    const selectedExperience = filterExperience?.value || '';
    const selectedTechnology = filterTechnology?.value || '';

    const jobListings = document.querySelectorAll('.job-listing');
    const jobEmptyState = document.querySelector('.jobs-empty');
    let visibleCount = 0;

    jobListings.forEach(function(listing) {
        const listingTechnologies = parseDatasetList(listing.dataset.technology);

        const matchesLocation = !selectedLocation || listing.dataset.location === selectedLocation;
        const matchesExperience = !selectedExperience || listing.dataset.experience === selectedExperience;
        const matchesTechnology = !selectedTechnology || listingTechnologies.includes(selectedTechnology);

        const isVisible = matchesLocation && matchesExperience && matchesTechnology;
        listing.style.display = isVisible ? '' : 'none';

        if (isVisible) {
            visibleCount += 1;
        }
    });

    if (!visibleCount) {
        jobEmptyState?.removeAttribute('hidden');
    } else {
        jobEmptyState?.setAttribute('hidden', '');
    }
}

filterLocation?.addEventListener('change', filterJobs);
filterExperience?.addEventListener('change', filterJobs);
filterTechnology?.addEventListener('change', filterJobs);