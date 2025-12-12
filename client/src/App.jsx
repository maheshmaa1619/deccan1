import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ClientList from './components/ClientList'
import ClientPage from './components/ClientPage'
import Reports from './components/Reports'
import Login from './components/Login'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl header-brand">Maheswaran Tax Consultancy</h1>
          <nav className="space-x-4">
            <Link to="/">Dashboard</Link>
            <Link to="/clients">Clients</Link>
            <Link to="/reports">Reports</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/clients" element={<ClientList/>} />
          <Route path="/clients/:id" element={<ClientPage/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </div>
  )
}
