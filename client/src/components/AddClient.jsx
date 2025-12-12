import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE } from '../config'

export default function AddClient({ onAdded }) {
  const [form, setForm] = useState({
    client_id: '',
    name: '',
    business: '',
    contact_person: '',
    phone: '',
    email: '',
    gstn: '',
    address: '',
    fee_amount: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const validate = () => {
    if (!form.name?.trim()) return 'Name is required'
    if (!form.phone?.trim()) return 'Phone is required'
    // optionally add regex checks for phone/email/gstn
    return ''
  }

  const submit = async (e) => {
    e?.preventDefault()
    setError('')
    const v = validate()
    if (v) { setError(v); return }
    setLoading(true)
    try {
      // ensure correct API route on server: POST /clients
      const payload = { ...form, fee_amount: Number(form.fee_amount || 0) }
      const res = await axios.post(`${API_BASE}/clients`, payload)
      // server should return created client -> refresh parent list
      onAdded && onAdded(res.data || true)
      // reset form
      setForm({
        client_id: '',
        name: '',
        business: '',
        contact_person: '',
        phone: '',
        email: '',
        gstn: '',
        address: '',
        fee_amount: ''
      })
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.message || 'Failed to add client. Check server logs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="card p-4 space-y-2">
      <h3 className="font-semibold">Add New Client</h3>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input value={form.client_id} onChange={e=>onChange('client_id', e.target.value)} placeholder="Client ID (e.g. C010)" className="p-2 border rounded" />
        <input value={form.name} onChange={e=>onChange('name', e.target.value)} placeholder="Name" className="p-2 border rounded" />
        <input value={form.business} onChange={e=>onChange('business', e.target.value)} placeholder="Business" className="p-2 border rounded" />
        <input value={form.contact_person} onChange={e=>onChange('contact_person', e.target.value)} placeholder="Contact Person" className="p-2 border rounded" />
        <input value={form.phone} onChange={e=>onChange('phone', e.target.value)} placeholder="Phone" className="p-2 border rounded" />
        <input value={form.email} onChange={e=>onChange('email', e.target.value)} placeholder="Email" className="p-2 border rounded" />
        <input value={form.gstn} onChange={e=>onChange('gstn', e.target.value)} placeholder="GSTN" className="p-2 border rounded" />
        <input value={form.address} onChange={e=>onChange('address', e.target.value)} placeholder="Address" className="p-2 border rounded" />
        <input value={form.fee_amount} onChange={e=>onChange('fee_amount', e.target.value)} placeholder="Fee amount (₹)" className="p-2 border rounded" />
      </div>
      <div className="flex items-center space-x-2">
        <button type="submit" className="btn" disabled={loading}>{loading ? 'Saving...' : 'Add client'}</button>
        <button type="button" onClick={() => {
          setForm({
            client_id: '',
            name: '',
            business: '',
            contact_person: '',
            phone: '',
            email: '',
            gstn: '',
            address: '',
            fee_amount: ''
          })
          setError('')
        }} className="btn-ghost">Clear</button>
      </div>
    </form>
  )
}
