import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_BASE } from '../config'
import AddClient from './AddClient'

export default function ClientList(){
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const r = await axios.get(`${API_BASE}/clients`)
      setClients(r.data || [])
    } catch (e) {
      console.error('Failed to load clients', e)
      setClients([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() },[])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Clients</h2>
      </div>

      <div className="mb-4">
        <AddClient onAdded={() => load()} />
      </div>

      {loading ? <div>Loading clients...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map(c=> (
            <div key={c.id} className="card p-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{c.name}</h3>
                  <div className="text-sm text-gray-600">{c.business} • {c.phone}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">₹ {c.fee_amount || '-'}</div>
                  <Link className="text-sm text-blue-600" to={`/clients/${c.id}`}>Open</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
