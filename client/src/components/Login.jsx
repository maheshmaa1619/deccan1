import React, {useState} from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function Login(){
  const [u,setU] = useState('admin')
  const [p,setP] = useState('password')
  const submit = async ()=>{
    try {
      const r = await axios.post(`${API_BASE}/auth/login`,{ username: u, password: p })
      localStorage.setItem('token', r.data.token)
      window.location.href = '/'
    } catch(e) {
      alert('Login failed')
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Login</h3>
      <input value={u} onChange={e=>setU(e.target.value)} className="w-full mb-2 p-2 border" />
      <input value={p} onChange={e=>setP(e.target.value)} className="w-full mb-4 p-2 border" type="password" />
      <button onClick={submit} className="btn">Login</button>
    </div>
  )
}
