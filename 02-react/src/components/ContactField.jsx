export function ContactField({ id, label, autocomplete, type = 'text', value, error, onChange, onBlur, style }) {
    return (
        <div className={style.contactField}>
            <label htmlFor={id}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    value={value}
                    autoComplete={autocomplete}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={label}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    autoComplete={autocomplete}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={label}
                />
            )}
            {error && (
                <p className={style.contactError}>
                    {error}
                </p>
            )}
        </div>
    )
}