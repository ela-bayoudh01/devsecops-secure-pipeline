import { useState } from 'react'
import Sidebar from './components/Sidebar'
import CommandSection from './components/CommandSection'
import { sections } from './data/commands'
import './App.css'

export default function App() {
  const [activeSection, setActiveSection] = useState('basics')

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} onSelect={setActiveSection} />
      <CommandSection section={sections[activeSection]} />
    </div>
  )
}
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"