const jobsListingSection = document.querySelector('.jobs-list')

jobsListingSection?.addEventListener('click', function(event) {
  const element = event.target

  if (element.classList.contains('apply-btn')) {
    element.textContent = '¡Aplicado!'
    element.classList.add('is-applied')
    element.disabled = true
  }
})

const jobDetailSection = document.querySelector('.job-detail')

jobDetailSection?.addEventListener('click', function(event) {
  const element = event.target
  const applyButtons = jobDetailSection.querySelectorAll('.apply-btn')

  if (element.classList.contains('apply-btn')) {
    applyButtons.forEach(function(btn) {
      btn.textContent = '¡Aplicado!'
      btn.classList.add('is-applied')
      btn.disabled = true
    })
  }
})