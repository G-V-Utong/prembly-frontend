import React, { useEffect, useState } from 'react'

export default function Quotes() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    async function fetchQuotes() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://quotable.io/quotes?page=${page}`, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchQuotes()
    return () => controller.abort()
  }, [page])

  return (
    <section>
      <h2>Quotable — Paginated</h2>
      {loading && <div className="loading">Loading…</div>}
      {error && <div className="error">Error: {error}</div>}
      {data && (
        <>
          <div className="quotes">
            {data.results.map((q) => (
              <div key={q._id} className="quote-card">
                <p className="content">“{q.content}”</p>
                <p className="author">— {q.author}</p>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
            <span>Page {data.page} / {data.totalPages}</span>
            <button disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}
    </section>
  )
}
