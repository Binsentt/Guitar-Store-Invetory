import { useState } from 'react'
import styles from './LoginPage.module.css'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Email address is required.'
  }

  if (!emailPattern.test(trimmed)) {
    return 'Enter a valid email address.'
  }

  return ''
}

function validatePassword(value) {
  if (!value) {
    return 'Password is required.'
  }

  if (value.length < 6) {
    return 'Password must contain at least 6 characters.'
  }

  return ''
}

function LoginPage({ onBackHome, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  })
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  })
  const [submitError, setSubmitError] = useState('')

  const updateFieldError = (fieldName, value) => {
    const validator = fieldName === 'email' ? validateEmail : validatePassword
    const nextError = validator(value)

    setFormErrors((current) => ({
      ...current,
      [fieldName]: nextError,
    }))

    return nextError
  }

  const handleEmailChange = (event) => {
    const nextValue = event.target.value
    setEmail(nextValue)

    if (touchedFields.email) {
      updateFieldError('email', nextValue)
    }
  }

  const handlePasswordChange = (event) => {
    const nextValue = event.target.value
    setPassword(nextValue)

    if (touchedFields.password) {
      updateFieldError('password', nextValue)
    }
  }

  const handleBlur = (fieldName) => {
    const nextTouched = { ...touchedFields, [fieldName]: true }
    setTouchedFields(nextTouched)

    const nextValue = fieldName === 'email' ? email : password
    updateFieldError(fieldName, nextValue)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextTouched = { email: true, password: true }
    setTouchedFields(nextTouched)

    const emailError = updateFieldError('email', email)
    const passwordError = updateFieldError('password', password)

    if (emailError || passwordError) {
      setSubmitError('Please correct the highlighted fields and try again.')
      return
    }

    const trimmedEmail = email.trim()
    setSubmitError('')
    onLogin({ email: trimmedEmail })
  }

  const emailHasError = touchedFields.email && formErrors.email
  const passwordHasError = touchedFields.password && formErrors.password

  return (
    <main className={styles.pageShell}>
      <div className={styles.container}>
        <section className={styles.loginCard} aria-label="Login form section">
          <div className={styles.brandBlock}>
            <div className={styles.brandMark} aria-hidden="true" />
            <span>Guitar Store Inventory</span>
          </div>

          <p className={styles.label}>Secure Workspace</p>
          <h1>Sign in to your inventory</h1>
          <p className={styles.helpText}>
            Enter your details to continue to the Guitar Store Inventory workspace.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.labelText}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                autoComplete="email"
                aria-invalid={emailHasError}
                aria-describedby={emailHasError ? 'email-error' : undefined}
                className={emailHasError ? styles.inputError : ''}
                required
              />
              {emailHasError && (
                <p id="email-error" className={styles.errorText} role="alert">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.labelText}>
                Password
              </label>
              <div className={styles.passwordWrap}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur('password')}
                  autoComplete="current-password"
                  aria-invalid={passwordHasError}
                  aria-describedby={passwordHasError ? 'password-error' : undefined}
                  className={passwordHasError ? styles.inputError : ''}
                  required
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {passwordHasError && (
                <p id="password-error" className={styles.errorText} role="alert">
                  {formErrors.password}
                </p>
              )}
            </div>

            {submitError && (
              <p className={styles.submitError} role="alert">
                {submitError}
              </p>
            )}

            <div className={styles.buttonRow}>
              <button type="submit" className={styles.primaryButton}>
                Sign In
              </button>
              <button type="button" className={styles.secondaryButton} onClick={onBackHome}>
                Back to Home
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default LoginPage
