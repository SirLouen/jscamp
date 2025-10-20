document.addEventListener('DOMContentLoaded', function() {
    const filterJob = document.getElementById('filter-job')
    const filterLocation = document.getElementById('filter-location')
    const filterContract = document.getElementById('filter-contract')
    const filterExperience = document.getElementById('filter-experience')

    filterJob.addEventListener('change', function() {
        console.log(filterJob.value)
    })
})

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