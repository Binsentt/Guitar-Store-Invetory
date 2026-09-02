import { useState } from 'react'
import styles from './LandingPage.module.css'

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
]

const featureItems = [
  {
    title: 'Register Guitar Products',
    description:
      'Record the guitar model, body type, brand, stock quantity, manufacturer, and assigned user role.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 5.5A2.5 2.5 0 0 1 9.5 3h5A2.5 2.5 0 0 1 17 5.5v2.2a2 2 0 0 1-.47 1.2l-1.2 1.4a2.5 2.5 0 0 0-.59 1.54v6.16c0 .77-.63 1.4-1.4 1.4h-2.68c-.77 0-1.4-.63-1.4-1.4v-6.16c0-.58-.21-1.12-.59-1.54L7.47 9.1A2 2 0 0 1 7 7.9V5.5Zm6.5-1.5h-5a1 1 0 0 0-1 1v2.1c0 .15.06.29.17.39l1.23 1.45c.55.65.86 1.48.86 2.33v6.18c0 .2.16.36.36.36h2.68c.2 0 .36-.16.36-.36V10.2c0-.85.31-1.68.86-2.33l1.23-1.45a.56.56 0 0 0 .17-.39V5.5a1 1 0 0 0-1-1Z" />
      </svg>
    ),
  },
  {
    title: 'Monitor Stock Levels',
    description:
      'Keep guitar quantities organized and identify products that may require stock attention.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.25a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5Zm0 1.5a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5Zm1.1 3.2h-2.2v5.44l4.52 2.61 1.1-1.9-3.42-1.98V8.95Z" />
      </svg>
    ),
  },
  {
    title: 'Review Inventory Details',
    description:
      'Access complete guitar information through a structured and easy-to-read inventory workspace.',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5.75A2.75 2.75 0 0 1 7.75 3h8.5A2.75 2.75 0 0 1 19 5.75v12.5A2.75 2.75 0 0 1 16.25 21h-8.5A2.75 2.75 0 0 1 5 18.25V5.75Zm2.75-.75a.75.75 0 0 0-.75.75v12.5c0 .41.34.75.75.75h8.5a.75.75 0 0 0 .75-.75V5.75a.75.75 0 0 0-.75-.75h-8.5Zm1.5 2.75h5.5v1.5h-5.5v-1.5Zm0 3h5.5v1.5h-5.5v-1.5Zm0 3h4v1.5h-4v-1.5Z" />
      </svg>
    ),
  },
]

const aboutHighlights = [
  'Clear product records',
  'Organized stock information',
  'Responsive interface',
]

const currentYear = new Date().getFullYear()

function LandingPage({ onSignIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavSelection = () => {
    setIsMenuOpen(false)
  }

  const handleSignInClick = () => {
    setIsMenuOpen(false)
    onSignIn()
  }

  return (
    <div id="top" className={styles.pageShell}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <a href="#top" className={styles.brand} aria-label="Guitar Store Inventory home">
              <span className={styles.brandMark} aria-hidden="true" />
              <span>Guitar Store Inventory</span>
            </a>

            <nav
              className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
              aria-label="Main navigation"
              id="mobile-menu"
            >
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={handleNavSelection}>
                  {item.label}
                </a>
              ))}
              <button type="button" className={styles.signInLink} onClick={handleSignInClick}>
                Sign In
              </button>
            </nav>

            <button
              type="button"
              className={styles.menuButton}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
              <span className={styles.menuBar} />
            </button>

            <button type="button" className={styles.desktopSignIn} onClick={onSignIn}>
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="home">
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <p className={styles.eyebrow}>Inventory Workspace</p>
                <h1>Organize Every Guitar. Track Every Stock.</h1>
                <p className={styles.lead}>
                  A focused inventory workspace designed to help guitar stores register products,
                  monitor stock levels, and keep essential guitar information organized.
                </p>

                <div className={styles.heroActions}>
                  <a href="#features" className={styles.primaryButton}>
                    Explore Features
                  </a>
                  <a href="#about" className={styles.secondaryButton}>
                    About the System
                  </a>
                </div>
              </div>

              <aside className={styles.previewCard} aria-label="Inventory preview panel">
                <div className={styles.previewHeader}>Inventory Preview</div>
                <div className={styles.previewMetrics}>
                  <div className={styles.metricRow}>
                    <span>Total Guitars</span>
                    <strong>148</strong>
                  </div>
                  <div className={styles.metricRow}>
                    <span>Available Stock</span>
                    <strong>96</strong>
                  </div>
                  <div className={styles.metricRow}>
                    <span>Low Stock</span>
                    <strong>14</strong>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.section} id="features">
          <div className={styles.container}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionLabel}>Core Features</p>
              <h2>Everything needed for organized guitar inventory</h2>
            </div>

            <div className={styles.featureGrid}>
              {featureItems.map((item) => (
                <article key={item.title} className={styles.featureCard}>
                  <div className={styles.featureIcon} aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="about">
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutText}>
                <p className={styles.sectionLabel}>About the System</p>
                <h2>Built for straightforward inventory management</h2>
                <p>
                  This React-based application is intended to provide a clear workflow for
                  registering guitar products, reviewing records, and tracking stock information.
                </p>
              </div>

              <div className={styles.aboutPanel}>
                <ul className={styles.highlightList}>
                  {aboutHighlights.map((highlight) => (
                    <li key={highlight} className={styles.highlightItem}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaPanel}>
              <h2>A simpler way to manage guitar inventory</h2>
              <p>Start with an organized workspace built for accurate product and stock records.</p>
              <a href="#top" className={styles.primaryButton}>
                Return to Top
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Guitar Store Inventory</p>
          <p>{currentYear}</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
