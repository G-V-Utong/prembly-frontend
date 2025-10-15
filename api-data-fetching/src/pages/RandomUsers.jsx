import React, { useEffect, useState } from 'react'

export default function RandomUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    async function fetchUsers() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://randomuser.me/api/?results=12', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setUsers(json.results)
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
    return () => controller.abort()
  }, [])

  return (
    <section>
      <h2>Random Users</h2>
      {loading && <div className="loading">Loading…</div>}
      {error && <div className="error">Error: {error}</div>}
      <div className="user-grid">
        {users.map((u, idx) => (
          <div key={idx} className="user-card">
            <img src={u.picture.large} alt={`${u.name.first} ${u.name.last}`} />
            <div className="body">
              <h4>{u.name.title} {u.name.first} {u.name.last}</h4>
              <p>{u.email}</p>
              <p>{u.location.city}, {u.location.country}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
