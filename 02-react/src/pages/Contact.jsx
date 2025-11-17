import { useState } from 'react'
import style from './Contact.module.css'
import { ContactField } from '../components/ContactField.jsx'

const initialValues = {
    name: '',
    email: '',
    message: '',
}

export function Contact() {
    const [values, setValues] = useState(initialValues)
    const [formStatus, setFormStatus] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const { id, value } = event.target
        setValues((prevValues) => ({ 
            ...prevValues, 
            [id]: value 
        }))
    }

    const getFieldError = (fieldId, fieldValue) => {
        let fieldError = ''
       
        switch (fieldId) {
            case 'name':
                if (!fieldValue.trim()) {
                    fieldError = 'El nombre es obligatorio.'
                }
                break
            case 'email':
                if (!fieldValue.trim()) {
                    fieldError = 'El email es obligatorio.'
                // https://stackoverflow.com/a/50343015    
                } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(fieldValue)) { 
                    fieldError = 'El formato del email no es válido.'
                }
                break
            case 'message':
                if (!fieldValue.trim()) {
                    fieldError = 'El mensaje es obligatorio.'
                }
                break
            default:
                break
        }

        return fieldError
    }

    const validateField = (fieldId) => {
        const fieldError = getFieldError(fieldId, values[fieldId])

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            if (fieldError) {
                newErrors[fieldId] = fieldError
            } else {
                delete newErrors[fieldId]
            }
            return newErrors
        })
    }

    const validateAllFields = () => {
        const newErrors = {}

        Object.keys(values).forEach((fieldId) => {
            const fieldError = getFieldError(fieldId, values[fieldId])
            if (fieldError) {
                newErrors[fieldId] = fieldError
            }
        })

        setErrors(newErrors)
        return newErrors
    }

    const handleBlur = (event) => {
        validateField(event.target.id)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const submissionErrors = validateAllFields()
        if (Object.keys(submissionErrors).length > 0) {
            setFormStatus({ type: 'error', message: 'Arregla los campos inválidos.' })
            return
        }

        setFormStatus({ type: 'success', message: 'Gracias por contactar.' })
        setValues(initialValues)
    }

    const showError = (field) => errors[field]

    const formStatusMessage = () => {
        let errorClass = ''
        if (formStatus.type === 'error') {
            errorClass = style.contactError
        } else if (formStatus.type === 'success') {
            errorClass = style.contactSuccess
        }
        return errorClass
    }

    return (
        <section className={style.contactPage}>
            <div className={style.contactCard}>
                <header>
                    <h1>Contacto</h1>
                </header>

                <form className={style.contactForm} noValidate onSubmit={handleSubmit}>
                    <div className={style.contactRow}>
                        <ContactField
                            id="name"
                            label="Nombre"
                            type="message"
                            autocomplete="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={showError('name')}
                            style={style}
                        />

                        <ContactField
                            id="email"
                            label="Email"
                            type="email"
                            autocomplete="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={showError('email')}
                            style={style}
                        />
                    </div>

                    <ContactField
                        id="message"
                        label="Mensaje"
                        type="textarea"
                        autocomplete="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={showError('message')}
                        style={style}
                    />
                    <button type="submit">Enviar</button>

                    {formStatus.message && (
                        <p className={formStatusMessage()}>
                            {formStatus.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    )
}