import { useState } from 'react'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import WorkspaceShell from './components/WorkspaceShell'

function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [currentUser, setCurrentUser] = useState(null)

  const handleOpenLogin = () => {
    setCurrentView('login')
  }

  const handleBackHome = () => {
    setCurrentView('landing')
  }

  const handleLogin = ({ email }) => {
    setCurrentUser({ email })
    setCurrentView('workspace')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('landing')
  }

  if (currentView === 'login') {
    return <LoginPage onBackHome={handleBackHome} onLogin={handleLogin} />
  }

  if (currentView === 'workspace') {
    return <WorkspaceShell currentUser={currentUser} onLogout={handleLogout} />
  }

  return <LandingPage onSignIn={handleOpenLogin} />
}

export default App
