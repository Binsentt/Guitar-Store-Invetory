import styles from './WorkspaceShell.module.css'

function WorkspaceShell({ currentUser, onLogout }) {
  return (
    <main className={styles.pageShell}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <div className={styles.brandBlock}>
            <span className={styles.brandMark} aria-hidden="true" />
            <span>Guitar Store Inventory</span>
          </div>

          <button type="button" className={styles.signOutButton} onClick={onLogout}>
            Sign Out
          </button>
        </header>

        <section className={styles.workspaceCard} aria-label="Temporary workspace shell">
          <p className={styles.statusLabel}>Workspace Access</p>
          <h1>Welcome to the Inventory Workspace</h1>
          <p className={styles.supportingText}>
            Your session is ready. Guitar registration and inventory records will be added in the next
            development phase.
          </p>

          <div className={styles.userRow}>
            <span className={styles.userLabel}>Signed in as</span>
            <strong>{currentUser?.email || 'User'}</strong>
          </div>

          <div className={styles.infoGrid}>
            <article className={styles.infoCard}>
              <span>Registration Module</span>
              <strong>Coming next</strong>
            </article>
            <article className={styles.infoCard}>
              <span>Inventory Registry</span>
              <strong>Coming next</strong>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}

export default WorkspaceShell
