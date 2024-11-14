import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginForm } from './components/LoginForm'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { FormCreateCompte } from './components/FormCreateCompte'
import { ServiceList } from './components/ServiceList'
import { Layout } from './components/Layout'

function App() {

  return (
     <Router>
      <Routes>
        {/* Redirection de la route / vers /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Route pour le login sans Layout */}
        <Route path="/login" element={<LoginForm />} />
          {/* Routes pour le Layout (avec Sidebar, Header, etc.) */}
          <Route path="/" element={<Layout />}>
            <Route path="/createcompte" element={<FormCreateCompte />} />
            <Route path="/servicelist" element={<ServiceList />} />
            {/* Autres routes */}
          </Route>
      </Routes>
    </Router>
  )
}

export default App
