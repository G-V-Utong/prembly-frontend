import React, { useEffect, useMemo, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip, TimeScale)

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
        // API returns descending dates; keep first 120 days
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

  // helpers
  const fmt = (n) => (n == null ? '—' : n.toLocaleString())
  const formatDate = (yyyymmdd) => {
    // input like 20210307 -> 2021-03-07
    const s = String(yyyymmdd)
    if (s.length !== 8) return s
    return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6)}`
  }

  const latest = rows[0] || null

  const chartData = useMemo(() => {
    // show last 60 days on chart (reverse rows to chronological order)
    const slice = rows.slice(0, 60).reverse()
    const labels = slice.map(r => formatDate(r.date))
    const positives = slice.map(r => r.positive || 0)
    const deaths = slice.map(r => r.death || 0)
    return {
      labels,
      datasets: [
        {
          label: 'Positive Cases',
          data: positives,
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14,165,233,0.08)',
          tension: 0.3,
          pointRadius: 2,
          fill: true
        },
        {
          label: 'Deaths',
          data: deaths,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.06)',
          tension: 0.3,
          pointRadius: 2,
          fill: true
        }
      ]
    }
  }, [rows])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    },
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 12 }
      },
      y: {
        ticks: { callback: (v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v }
      }
    }
  }), [])

  return (
    <section className="min-h-screen bg-gray-50 p-6 w-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">COVID-19 Dashboard — US (Daily)</h1>
            <p className="text-sm text-gray-500 mt-1">A concise overview of recent daily metrics from the COVID Tracking Project</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Last updated</div>
            <div className="text-sm text-gray-800">{latest ? (latest.lastModified ?? latest.dateChecked ?? formatDate(latest.date)) : '—'}</div>
          </div>
        </header>

        {loading && <LoadingSpinner label="Fetching COVID-19 data…" />}

        {error && (
          <div className="rounded-lg p-4 bg-red-50 text-red-700 border border-red-100">Error: {String(error)}</div>
        )}

        {!loading && !error && rows.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="text-sm text-gray-500">Positive (cumulative)</div>
                <div className="mt-2 text-2xl font-semibold text-sky-600">{fmt(latest.positive)}</div>
                <div className="mt-1 text-xs text-gray-500">+{fmt(latest.positiveIncrease)} today</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="text-sm text-gray-500">Deaths (cumulative)</div>
                <div className="mt-2 text-2xl font-semibold text-red-600">{fmt(latest.death)}</div>
                <div className="mt-1 text-xs text-gray-500">+{fmt(latest.deathIncrease)} today</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="text-sm text-gray-500">Hospitalized Currently</div>
                <div className="mt-2 text-2xl font-semibold text-amber-600">{fmt(latest.hospitalizedCurrently)}</div>
                <div className="mt-1 text-xs text-gray-500">Cumulative: {fmt(latest.hospitalizedCumulative)}</div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="text-sm text-gray-500">Total Test Results</div>
                <div className="mt-2 text-2xl font-semibold text-emerald-600">{fmt(latest.totalTestResults)}</div>
                <div className="mt-1 text-xs text-gray-500">+{fmt(latest.totalTestResultsIncrease)} today</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 h-96">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Last 60 days — Positive vs Deaths</h3>
                  <div className="text-xs text-gray-500">Interactive</div>
                </div>
                <div className="w-full h-[320px]">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Recent snapshot</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                  <div>
                    <dt className="text-gray-500">States reporting</dt>
                    <dd className="font-medium text-gray-800">{fmt(latest.states)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Pending</dt>
                    <dd className="font-medium text-gray-800">{fmt(latest.pending)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">In ICU</dt>
                    <dd className="font-medium text-gray-800">{fmt(latest.inIcuCurrently)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">On Ventilator</dt>
                    <dd className="font-medium text-gray-800">{fmt(latest.onVentilatorCurrently)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Recent daily values</h3>
                  <div className="text-xs text-gray-500">Showing most recent 20 rows</div>
                </div>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase">
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Positive</th>
                      <th className="py-2 pr-4">Positive ↑</th>
                      <th className="py-2 pr-4">Deaths</th>
                      <th className="py-2 pr-4">Deaths ↑</th>
                      <th className="py-2 pr-4">Hospitalized</th>
                      <th className="py-2 pr-4">Tests ↑</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 20).map((r, i) => (
                      <tr key={r.date} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 pr-4 align-top font-medium text-gray-800">{formatDate(r.date)}</td>
                        <td className="py-3 pr-4 align-top">{fmt(r.positive)}</td>
                        <td className="py-3 pr-4 align-top text-gray-500">{fmt(r.positiveIncrease)}</td>
                        <td className="py-3 pr-4 align-top">{fmt(r.death)}</td>
                        <td className="py-3 pr-4 align-top text-gray-500">{fmt(r.deathIncrease)}</td>
                        <td className="py-3 pr-4 align-top">{fmt(r.hospitalizedCurrently ?? r.hospitalized)}</td>
                        <td className="py-3 pr-4 align-top">{fmt(r.totalTestResultsIncrease)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
