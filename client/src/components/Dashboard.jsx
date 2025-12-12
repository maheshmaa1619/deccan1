import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function Dashboard(){
  const [counts, setCounts] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    // debug logs to verify that build used the env var
    console.log('DEBUG API_BASE =', API_BASE)

    const load = async () => {
      try {
        const url = `${API_BASE}/clients`
        console.log('DEBUG fetching clients from:', url)
        const r = await axios.get(url)
        console.log('DEBUG clients response:', r.data)
        setCounts({ total: Array.isArray(r.data) ? r.data.length : 0 })

        // fetch tasks for first client (if present)
        if (r.data && r.data[0]) {
          try {
            const clientUrl = `${API_BASE}/clients/${r.data[0].id}`
            console.log('DEBUG fetching client details from:', clientUrl)
            const res = await axios.get(clientUrl)
            console.log('DEBUG client details:', res.data)
            setTasks(res.data.tasks || [])
          } catch(err){
            console.error('ERROR fetching client details', err);
            setTasks([])
          }
        }
      } catch(err){
        console.error('ERROR fetching clients', err)
        setCounts({ total: 0 })
        setTasks([])
      }
    }

    load()
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
