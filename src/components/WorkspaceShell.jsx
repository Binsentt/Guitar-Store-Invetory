import { useState } from 'react'
import GuitarForm from './GuitarForm'
import InventoryTable from './InventoryTable'
import { initialGuitars } from '../data/initialGuitars'
import styles from './WorkspaceShell.module.css'

function WorkspaceShell({ currentUser, onLogout }) {
  const [workspaceView, setWorkspaceView] = useState('register')
  const [guitars, setGuitars] = useState(initialGuitars)
  const [selectedGuitarId, setSelectedGuitarId] = useState(initialGuitars[0]?.id ?? null)

  const selectedGuitar = guitars.find((guitar) => guitar.id === selectedGuitarId) ?? null

  const handleAddGuitar = (guitar) => {
    setGuitars((current) => [guitar, ...current])
    setSelectedGuitarId(guitar.id)
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
            <>
              <InventoryTable
                guitars={guitars}
                selectedGuitarId={selectedGuitarId}
                onSelectGuitar={setSelectedGuitarId}
              />

              <div className={styles.detailCard} aria-live="polite">
                {selectedGuitar ? (
                  <>
                    <p className={styles.statusLabel}>Active Guitar</p>
                    <h2>{selectedGuitar.guitarModel}</h2>

                    <div className={styles.detailGrid}>
                      <div>
                        <span className={styles.detailKey}>Brand</span>
                        <strong>{selectedGuitar.brandName}</strong>
                      </div>
                      <div>
                        <span className={styles.detailKey}>Body Type</span>
                        <strong>{selectedGuitar.bodyType}</strong>
                      </div>
                      <div>
                        <span className={styles.detailKey}>Stock</span>
                        <strong>{selectedGuitar.stockQuantity} units</strong>
                      </div>
                      <div>
                        <span className={styles.detailKey}>Manufacturer</span>
                        <strong>{selectedGuitar.manufacturerName}</strong>
                      </div>
                      <div>
                        <span className={styles.detailKey}>Role</span>
                        <strong>{selectedGuitar.userRole}</strong>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className={styles.supportingText}>Select a guitar from the registry to review details.</p>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default WorkspaceShell
