import React, { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip)

export default function Covid() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://api.covidtracking.com/v1/us/daily.json', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setRows(json.slice(0, 120)) 
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => controller.abort()
  }, [])

  const chartData = useMemo(() => {
    const labels = rows.map(r => String(r.date))
    const positives = rows.map(r => r.positive || 0)
    const deaths = rows.map(r => r.death || 0)
    return {
      labels,
      datasets: [
        { label: 'Positive Cases', data: positives },
        { label: 'Deaths', data: deaths }
      ]
    }
  }, [rows])

  return (
    <section>
      <h2>COVID-19 — US Daily</h2>
      {loading && <div className="loading">Loading…</div>}
      {error && <div className="error">Error: {error}</div>}
      {!loading && !error && rows.length > 0 && (
        <>
          <div className="chart-wrap">
            <Line data={chartData} />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date (YYYYMMDD)</th>
                  <th>Positive</th>
                  <th>Deaths</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 20).map((r) => (
                  <tr key={r.date}>
                    <td>{r.date}</td>
                    <td>{r.positive ?? '—'}</td>
                    <td>{r.death ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}
