import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function Dashboard(){
  const [counts, setCounts] = useState(null)
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    axios.get(`${API_BASE}/clients`).then(r=>{
      setCounts({ total: r.data.length })
    }).catch(()=>setCounts({ total: 0 }))
    // load recent tasks for dashboard
    axios.get(`${API_BASE}/clients`).then(r=>{
      // naive: fetch first client's tasks to show sample
      if (r.data[0]) {
        axios.get(`${API_BASE}/clients/${r.data[0].id}`).then(res=>{
          setTasks(res.data.tasks)
        }).catch(()=>{})
      }
    }).catch(()=>{})
  },[])
  if(!counts) return <div>Loading...</div>
  return (
    <div>
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="card">Total Clients<br/><strong className="text-2xl">{counts.total}</strong></div>
        <div className="card">Pending Tasks<br/><strong className="text-2xl">{tasks.filter(t=>t.status!=='Done').length}</strong></div>
        <div className="card">Overdue Tasks<br/><strong className="text-2xl">{tasks.filter(t=> new Date(t.due_date) < new Date() && t.status!=='Done').length}</strong></div>
        <div className="card">Monthly Revenue<br/><strong className="text-2xl">₹ --</strong></div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Recent Tasks</h3>
        <div className="space-y-2 mt-2">
          {tasks.map(t=> <div key={t.id} className="card flex justify-between"> <div>{t.type} • {t.due_date}</div> <div>{t.status}</div></div>)}
        </div>
      </div>
    </div>
  )
}
