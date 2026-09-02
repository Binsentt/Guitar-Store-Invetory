import { useState } from 'react'
import styles from './GuitarForm.module.css'

const bodyTypeOptions = ['Electric', 'Acoustic', 'Bass', 'Classical']
const roleOptions = ['Merchant', 'Consumer']

const initialFormValues = {
  guitarModel: '',
  bodyType: '',
  brandName: '',
  stockQuantity: '',
  manufacturerName: '',
  userRole: '',
}

function validateField(fieldName, value) {
  switch (fieldName) {
    case 'guitarModel': {
      const trimmed = value.trim()
      if (!trimmed) return 'Guitar model is required.'
      if (trimmed.length < 3) return 'Guitar model must contain at least 3 characters.'
      return ''
    }
    case 'bodyType': {
      if (!value) return 'Please select a body type.'
      return ''
    }
    case 'brandName': {
      if (!value.trim()) return 'Brand name is required.'
      return ''
    }
    case 'stockQuantity': {
      if (value === '') return 'Stock quantity is required.'
      if (!/^\d+$/.test(String(value).trim())) return 'Stock quantity must be a whole number.'
      const numericValue = Number(value)
      if (numericValue < 1 || numericValue > 100) {
        return 'Stock quantity must be between 1 and 100.'
      }
      return ''
    }
    case 'manufacturerName': {
      if (!value.trim()) return 'Manufacturer name is required.'
      return ''
    }
    case 'userRole': {
      if (!value) return 'Please select a user role.'
      return ''
    }
    default:
      return ''
  }
}

function GuitarForm({ onAddGuitar }) {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormValues)
  const [touchedFields, setTouchedFields] = useState({
    guitarModel: false,
    bodyType: false,
    brandName: false,
    stockQuantity: false,
    manufacturerName: false,
    userRole: false,
  })
  const [successMessage, setSuccessMessage] = useState('')

  const updateField = (fieldName, value) => {
    const nextError = validateField(fieldName, value)
    setFormErrors((current) => ({
      ...current,
      [fieldName]: nextError,
    }))
    return nextError
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))

    if (touchedFields[name]) {
      updateField(name, value)
    }
  }

  const handleBlur = (fieldName) => {
    const nextTouched = { ...touchedFields, [fieldName]: true }
    setTouchedFields(nextTouched)
    updateField(fieldName, formValues[fieldName])
  }

  const resetForm = () => {
    setFormValues(initialFormValues)
    setFormErrors(initialFormValues)
    setTouchedFields({
      guitarModel: false,
      bodyType: false,
      brandName: false,
      stockQuantity: false,
      manufacturerName: false,
      userRole: false,
    })
    setSuccessMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextTouched = {
      guitarModel: true,
      bodyType: true,
      brandName: true,
      stockQuantity: true,
      manufacturerName: true,
      userRole: true,
    }

    setTouchedFields(nextTouched)

    const nextErrors = {
      guitarModel: validateField('guitarModel', formValues.guitarModel),
      bodyType: validateField('bodyType', formValues.bodyType),
      brandName: validateField('brandName', formValues.brandName),
      stockQuantity: validateField('stockQuantity', formValues.stockQuantity),
      manufacturerName: validateField('manufacturerName', formValues.manufacturerName),
      userRole: validateField('userRole', formValues.userRole),
    }

    setFormErrors(nextErrors)

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) {
      setSuccessMessage('')
      return
    }

    const newGuitar = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      guitarModel: formValues.guitarModel.trim(),
      bodyType: formValues.bodyType,
      brandName: formValues.brandName.trim(),
      stockQuantity: Number(formValues.stockQuantity),
      manufacturerName: formValues.manufacturerName.trim(),
      userRole: formValues.userRole,
    }

    onAddGuitar(newGuitar)
    setSuccessMessage('Guitar registered successfully.')
    resetForm()
  }

  return (
    <section className={styles.formSection} aria-label="Guitar registration form">
      <div className={styles.cardHeader}>
        <h2>Register Guitar</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="guitarModel">Guitar Model</label>
            <input
              id="guitarModel"
              name="guitarModel"
              type="text"
              value={formValues.guitarModel}
              onChange={handleInputChange}
              onBlur={() => handleBlur('guitarModel')}
              aria-invalid={Boolean(touchedFields.guitarModel && formErrors.guitarModel)}
              aria-describedby={touchedFields.guitarModel && formErrors.guitarModel ? 'guitarModel-error' : undefined}
              className={touchedFields.guitarModel && formErrors.guitarModel ? styles.inputError : ''}
              placeholder="Fender Player Stratocaster"
            />
            {touchedFields.guitarModel && formErrors.guitarModel && (
              <p id="guitarModel-error" className={styles.errorText} role="alert">
                {formErrors.guitarModel}
              </p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="bodyType">Body Type</label>
            <select
              id="bodyType"
              name="bodyType"
              value={formValues.bodyType}
              onChange={handleInputChange}
              onBlur={() => handleBlur('bodyType')}
              aria-invalid={Boolean(touchedFields.bodyType && formErrors.bodyType)}
              aria-describedby={touchedFields.bodyType && formErrors.bodyType ? 'bodyType-error' : undefined}
              className={touchedFields.bodyType && formErrors.bodyType ? styles.inputError : ''}
            >
              <option value="">Select a body type</option>
              {bodyTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {touchedFields.bodyType && formErrors.bodyType && (
              <p id="bodyType-error" className={styles.errorText} role="alert">
                {formErrors.bodyType}
              </p>
            )}
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="brandName">Brand Name</label>
            <input
              id="brandName"
              name="brandName"
              type="text"
              value={formValues.brandName}
              onChange={handleInputChange}
              onBlur={() => handleBlur('brandName')}
              aria-invalid={Boolean(touchedFields.brandName && formErrors.brandName)}
              aria-describedby={touchedFields.brandName && formErrors.brandName ? 'brandName-error' : undefined}
              className={touchedFields.brandName && formErrors.brandName ? styles.inputError : ''}
              placeholder="Fender"
            />
            {touchedFields.brandName && formErrors.brandName && (
              <p id="brandName-error" className={styles.errorText} role="alert">
                {formErrors.brandName}
              </p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              min="1"
              max="100"
              step="1"
              value={formValues.stockQuantity}
              onChange={handleInputChange}
              onBlur={() => handleBlur('stockQuantity')}
              aria-invalid={Boolean(touchedFields.stockQuantity && formErrors.stockQuantity)}
              aria-describedby={touchedFields.stockQuantity && formErrors.stockQuantity ? 'stockQuantity-error' : undefined}
              className={touchedFields.stockQuantity && formErrors.stockQuantity ? styles.inputError : ''}
              placeholder="12"
            />
            {touchedFields.stockQuantity && formErrors.stockQuantity && (
              <p id="stockQuantity-error" className={styles.errorText} role="alert">
                {formErrors.stockQuantity}
              </p>
            )}
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="manufacturerName">Manufacturer Name</label>
            <input
              id="manufacturerName"
              name="manufacturerName"
              type="text"
              value={formValues.manufacturerName}
              onChange={handleInputChange}
              onBlur={() => handleBlur('manufacturerName')}
              aria-invalid={Boolean(touchedFields.manufacturerName && formErrors.manufacturerName)}
              aria-describedby={touchedFields.manufacturerName && formErrors.manufacturerName ? 'manufacturerName-error' : undefined}
              className={touchedFields.manufacturerName && formErrors.manufacturerName ? styles.inputError : ''}
              placeholder="Fender Musical Instruments"
            />
            {touchedFields.manufacturerName && formErrors.manufacturerName && (
              <p id="manufacturerName-error" className={styles.errorText} role="alert">
                {formErrors.manufacturerName}
              </p>
            )}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.radioLabel}>User Role</span>
          <div className={styles.radioGroup} role="radiogroup" aria-labelledby="userRole">
            {roleOptions.map((option) => (
              <label key={option} className={styles.radioOption}>
                <input
                  type="radio"
                  name="userRole"
                  value={option}
                  checked={formValues.userRole === option}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('userRole')}
                  aria-invalid={Boolean(touchedFields.userRole && formErrors.userRole)}
                  aria-describedby={touchedFields.userRole && formErrors.userRole ? 'userRole-error' : undefined}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {touchedFields.userRole && formErrors.userRole && (
            <p id="userRole-error" className={styles.errorText} role="alert">
              {formErrors.userRole}
            </p>
          )}
        </div>

        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.primaryButton}>
            Save Guitar
          </button>
          <button type="button" className={styles.secondaryButton} onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}

export default GuitarForm
