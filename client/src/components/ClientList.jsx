import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_BASE } from '../config'

export default function ClientList(){
  const [clients, setClients] = useState([])
  useEffect(()=>{ axios.get(`${API_BASE}/clients`).then(r=>setClients(r.data)).catch(()=>setClients([])) },[])
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Clients</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map(c=> (
          <div key={c.id} className="card">
            <h3 className="font-bold">{c.name}</h3>
            <div className="text-sm">{c.business} • {c.phone}</div>
            <Link className="text-sm text-blue-600" to={`/clients/${c.id}`}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
