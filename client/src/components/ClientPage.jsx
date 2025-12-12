import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ClientPage(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  useEffect(()=>{ axios.get(`http://localhost:4000/clients/${id}`).then(r=>setData(r.data)) },[id])
  if(!data) return <div>Loading...</div>
  const { client, tasks, calls, payments } = data
  const toggleTask = (taskId, newStatus)=>{
    axios.patch(`http://localhost:4000/tasks/${taskId}`,{ status: newStatus }).then(()=>{
      setData(prev=>({ ...prev, tasks: prev.tasks.map(t=> t.id===taskId?{...t,status:newStatus}:t) }))
    })
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-xl font-bold">{client.name} ({client.client_id})</h2>
        <div className="text-sm">{client.business} • {client.contact_person} • {client.phone}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold">Tasks</h3>
          <ul>
            {tasks.map(t=> (
              <li key={t.id} className="flex justify-between py-2">
                <div>{t.type} — {t.due_date} — {t.status}</div>
                <div className="space-x-2">
                  {t.status !== 'Done' && <button onClick={()=>toggleTask(t.id,'Done')} className="text-green-600">Mark Done</button>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 className="font-semibold">Conversation Log</h3>
          <ul>
            {calls.map(c=> <li key={c.id}>{c.created_at} • {c.mode} • {c.summary}</li>)}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold">Payments</h3>
        <ul>{payments.map(p=> <li key={p.id}>{p.invoice_no} — {p.amount} — {p.paid_on}</li>)}</ul>
      </div>

      <div>
        <a className="btn" href={`http://localhost:4000/clients/${client.id}/export`}>Export Client PDF</a>
      </div>
    </div>
  )
}
