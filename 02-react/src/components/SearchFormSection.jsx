import { useId, useState } from "react"
import styles from "./SearchFormSection.module.css"


let timeoutId = null

const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter }) => {
  const [searchText, setSearchText] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    
    if (event.target.name === idText) {
      return // ya lo manejamos en onChange
    }

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }

    onSearch(filters)
  }

  const handleFocus = (event) => {
    event.target.classList.add(styles.isFocused)
  }
  
  const handleBlur = (event) => {
    event.target.classList.remove(styles.isFocused)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    setSearchText(text) // actualizamos el input inmediatamente

    // Debounce: Cancelar el timeout anterior
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      onTextFilter(text)
    }, 500)
  }
  
  const clearFilters = () => {
    onSearch({
      technology: '',
      location: '',
      experienceLevel: ''
    })
    setSearchText('')
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange,
    handleFocus,
    handleBlur,
    clearFilters
  }
}

export function SearchFormSection ({ onTextFilter, onSearch, hasFilters }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  const {
    handleSubmit,
    handleTextChange,
    handleFocus,
    handleBlur,
    clearFilters
  } = useSearchForm({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter })

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form className={styles.searchForm} onChange={handleSubmit} id="empleos-search-form" role="search">
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          
          <input
            name={idText} id="empleos-search-input"
            type="text" className={styles.searchInput}
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology">
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select name={idLocation} id="filter-location">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name={idExperienceLevel} id="filter-experience-level">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>

          {hasFilters && <button onClick={clearFilters}>Limpiar Filtros</button>}
        </div>
      </form>

      <span id="filter-selected-value"></span>
    </section>
  )
}