import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Reports(){
  const [clients, setClients] = useState([])
  useEffect(()=>{ axios.get('http://localhost:4000/clients').then(r=>setClients(r.data)) },[])
  // Simple reports: clients count, avg fee, sample overdue
  const avgFee = clients.length ? (clients.reduce((s,c)=>s + (c.fee_amount||0),0) / clients.length).toFixed(2) : '0'
  return (
    <div>
      <h2 className="text-lg font-semibold">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="card">Total Clients<br/><strong>{clients.length}</strong></div>
        <div className="card">Average Fee<br/><strong>₹ {avgFee}</strong></div>
        <div className="card">Clients with Fee &gt; 0<br/><strong>{clients.filter(c=>c.fee_amount>0).length}</strong></div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Client List</h3>
        <div className="space-y-2 mt-2">
          {clients.map(c=> <div key={c.id} className="card">{c.name} — ₹ {c.fee_amount||' - '}</div>)}
        </div>
      </div>
    </div>
  )
}
