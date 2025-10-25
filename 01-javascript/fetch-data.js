const container = document.querySelector('.jobs-list')
const filtersRow = document.querySelector('.filters-row')

const RESULTS_PER_PAGE = 3

const renderFilter = (elements, label, filterId) => {
  const select = filtersRow?.querySelector(filterId);
  select.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = label;
  select.appendChild(defaultOption);

  elements
    .sort()
    .forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      select.appendChild(option);
    });
};

const renderJobArticle = (job) => {
  const article = document.createElement('article');
  article.className = 'job-listing';

  const rawTechnologies = job.data.technology;
  const technologies = Array.isArray(rawTechnologies) ? rawTechnologies : [rawTechnologies];
  article.dataset.technology = technologies.join('|');
  article.dataset.modalidad = job.data.modalidad;
  article.dataset.nivel = job.data.nivel;
  article.dataset.location = job.data.modalidad;
  article.dataset.experience = job.data.nivel;

  article.innerHTML = `<div class="job-info">
          <h3 class="job-title">
            <a href="detalle.html">
              ${job.titulo}
            </a>
          </h3>
          <small class="company-location">
            ${job.empresa} | ${job.ubicacion}
          </small>
          <p class="job-desc">${job.descripcion}</p>
        </div>
        <button class="apply-btn">Aplicar</button>`;

  container.appendChild(article);

  return technologies;
};

fetch("./data.json") /* fetch es asíncrono */
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    const locations = new Map();
    const experiences = new Map();
    const technologies = new Map();

    jobs.forEach(job => {
      const jobTechnologies = renderJobArticle(job);

      if (!locations.has(job.data.modalidad)) {
        locations.set(job.data.modalidad, job.ubicacion);
      }

      if (!experiences.has(job.data.nivel)) {
        experiences.set(job.data.nivel, job.data.nivel);
      }

      jobTechnologies.forEach((technology) => {
        if (!technologies.has(technology)) {
          technologies.set(technology, technology);
        }
      });
    });

    renderFilter(Array.from(locations.entries()),"Ubicación", "#filter-location" )
    renderFilter(Array.from(experiences.entries()),"Nivel de experiencia", "#filter-experience" )
    renderFilter(Array.from(technologies.entries()),"Tecnología", "#filter-technology" )
  });