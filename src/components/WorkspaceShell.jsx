import { useState } from 'react'
import GuitarForm from './GuitarForm'
import styles from './WorkspaceShell.module.css'

function WorkspaceShell({ currentUser, onLogout }) {
  const [workspaceView, setWorkspaceView] = useState('register')

  const handleAddGuitar = () => {
    setWorkspaceView('inventory')
  }

  return (
    <main className={styles.pageShell}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <div className={styles.brandBlock}>
            <span className={styles.brandMark} aria-hidden="true" />
            <span>Guitar Store Inventory</span>
          </div>

          <div className={styles.userArea}>
            <span className={styles.userText}>{currentUser?.email || 'User'}</span>
            <button type="button" className={styles.signOutButton} onClick={onLogout}>
              Sign Out
            </button>
          </div>
        </header>

        <section className={styles.workspaceCard} aria-label="Inventory workspace">
          <div className={styles.descriptionRow}>
            <div>
              <p className={styles.statusLabel}>Workspace Access</p>
              <h1>Inventory Workspace</h1>
            </div>
          </div>

          <p className={styles.supportingText}>
            Register guitar products and review inventory records.
          </p>

          <nav className={styles.workspaceNav} aria-label="Workspace sections">
            <button
              type="button"
              className={workspaceView === 'register' ? styles.navButtonActive : styles.navButton}
              onClick={() => setWorkspaceView('register')}
            >
              Register Guitar
            </button>
            <button
              type="button"
              className={workspaceView === 'inventory' ? styles.navButtonActive : styles.navButton}
              onClick={() => setWorkspaceView('inventory')}
            >
              Inventory Registry
            </button>
          </nav>

          {workspaceView === 'register' ? (
            <GuitarForm onAddGuitar={handleAddGuitar} />
          ) : (
            <div className={styles.placeholderCard}>Inventory records will appear here after the table module is completed.</div>
          )}
        </section>
      </div>
    </main>
  )
}

export default WorkspaceShell
