const container = document.querySelector('.jobs-list');
const filtersRow = document.querySelector('.filters-row');
const emptyState = container?.querySelector('.jobs-empty');
const paginationNav = document.querySelector('.pagination');
const pagesContainer = paginationNav?.querySelector('.pagination-pages');
const prevButton = paginationNav?.querySelector('#prev-page');
const nextButton = paginationNav?.querySelector('#next-page');

const RESULTS_PER_PAGE = 3;

const paginationState = {
  items: [],
  filters: {
    location: '',
    experience: '',
    technology: '',
    search: '',
  },
  currentPage: 1,
  totalPages: 0,
};

window.jobsPagination = paginationState;

const renderFilter = (elements, label, filterId) => {
  const select = filtersRow?.querySelector(filterId);
  select.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = label;
  select.appendChild(defaultOption);

  elements
    .sort()
    .forEach(([value, optionLabel]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = optionLabel;
      select.appendChild(option);
  });
};

const renderJobArticle = (job) => {
  const article = document.createElement('article');
  article.className = 'job-listing';

  const rawTechnologies = job.data.technology;
  const technologies = Array.isArray(rawTechnologies) ? rawTechnologies : [rawTechnologies];
  const title = job.titulo;
  const searchTitle = title.toLowerCase();
  article.dataset.technology = technologies.join('|');
  article.dataset.modalidad = job.data.modalidad;
  article.dataset.nivel = job.data.nivel;
  article.dataset.location = job.data.modalidad;
  article.dataset.experience = job.data.nivel;

  article.innerHTML = `<div class="job-info">
          <h3 class="job-title">
            <a href="detalle.html">
              ${title}
            </a>
          </h3>
          <small class="company-location">
            ${job.empresa} | ${job.ubicacion}
          </small>
          <p class="job-desc">${job.descripcion}</p>
        </div>
        <button class="apply-btn">Aplicar</button>`;

  container?.insertBefore(article, emptyState);

  return {
    node: article,
    location: article.dataset.location,
    experience: article.dataset.experience,
    technologies,
    title,
    searchTitle
  };
};

const renderPaginationButtons = (totalPages, currentPage) => {
  if (!pagesContainer) {
    return;
  }

  pagesContainer.innerHTML = '';

  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement('button');
    button.className = 'pagination-page';
    button.textContent = String(page);
    button.dataset.page = String(page);

    if (page === currentPage) {
      button.classList.add('active');
    }

    pagesContainer.appendChild(button);
  }
};

const renderPaginationNav = (totalPages, currentPage) => {
  if (prevButton) {
    if (!totalPages) {
      prevButton.setAttribute('hidden', '');
    } else {
      prevButton.removeAttribute('hidden');
      prevButton.disabled = currentPage <= 1;
    }
  }

  if (nextButton) {
    if (!totalPages) {
      nextButton.setAttribute('hidden', '');
    } else {
      nextButton.removeAttribute('hidden');
      nextButton.disabled = currentPage >= totalPages;
    }
  }
};

const updateJobsView = () => {
  const { items, filters } = paginationState;
  const searchFilter = filters.search || '';

  const filteredItems = items.filter((item) => {
    const matchesLocation = !filters.location || item.location === filters.location;
    const matchesExperience = !filters.experience || item.experience === filters.experience;
    const matchesTechnology = !filters.technology || item.technologies.includes(filters.technology);
    const matchesSearch = !searchFilter || item.searchTitle.includes(searchFilter);

    return matchesLocation && matchesExperience && matchesTechnology && matchesSearch;
  });

  paginationState.totalPages = filteredItems.length ? Math.ceil(filteredItems.length / RESULTS_PER_PAGE) : 0;

  if (paginationState.totalPages && paginationState.currentPage > paginationState.totalPages) {
    paginationState.currentPage = paginationState.totalPages;
  }

  if (!paginationState.totalPages) {
    paginationState.currentPage = 1;
  }

  items.forEach(({ node }) => {
    node.style.display = 'none';
  });

  if (!filteredItems.length) {
    emptyState?.removeAttribute('hidden');
    renderPaginationNav(0, 1);
    pagesContainer && (pagesContainer.innerHTML = '');
    return;
  }


  const start = (paginationState.currentPage - 1) * RESULTS_PER_PAGE;
  const end = start + RESULTS_PER_PAGE;

  filteredItems.slice(start, end).forEach(({ node }) => {
    node.style.display = '';
  });

  renderPaginationButtons(paginationState.totalPages, paginationState.currentPage);
  renderPaginationNav(paginationState.totalPages, paginationState.currentPage);
};

window.updateJobsView = updateJobsView;

pagesContainer?.addEventListener('click', (event) => {
  const target = event.target;
  const button = target.closest('.pagination-page');
  const page = Number(button.dataset.page);

  paginationState.currentPage = page;
  updateJobsView();
});

prevButton?.addEventListener('click', () => {
  paginationState.currentPage -= 1;
  updateJobsView();
});

nextButton?.addEventListener('click', () => {
  paginationState.currentPage += 1;
  updateJobsView();
});

try {
  const response = await fetch('./data.json');
  const jobs = await response.json();

  const locations = new Map();
  const experiences = new Map();
  const technologies = new Map();
  const jobItems = [];

  jobs.forEach((job) => {
    const jobItem = renderJobArticle(job);
    jobItems.push(jobItem);

      if (!locations.has(job.data.modalidad)) {
        locations.set(job.data.modalidad, job.ubicacion);
      }

      if (!experiences.has(job.data.nivel)) {
        experiences.set(job.data.nivel, job.data.nivel);
      }

      jobItem.technologies.forEach((technology) => {
        if (!technologies.has(technology)) {
          technologies.set(technology, technology);
        }
      });
    });

    paginationState.items = jobItems;

    renderFilter(Array.from(locations.entries()), 'Ubicación', '#filter-location');
    renderFilter(Array.from(experiences.entries()), 'Nivel de experiencia', '#filter-experience');
    renderFilter(Array.from(technologies.entries()), 'Tecnología', '#filter-technology');

    updateJobsView();
} catch (error) {
  console.error('Error fetching jobs data:', error);
}