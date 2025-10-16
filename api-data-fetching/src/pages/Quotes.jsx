import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { httpClient } from "../lib/httpClient.js";

export default function Quotes() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchQuotes() {
      try {
        setLoading(true);
        setError(null);
        const json = await httpClient(
          `https://api.quotable.io/quotes?page=${page}`,
          { signal: controller.signal }
        );
        setData(json);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        await new Promise((res) => setTimeout(res, 800)); // artificial delay for spinner test
        setLoading(false);
      }
    }
    fetchQuotes();
    return () => controller.abort();
  }, [page]);

  return (
    <section className="min-h-screen bg-gray-50 p-6 w-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Quotes Library
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse inspirational, humorous, and motivational quotes
          </p>
        </header>

        {loading && <LoadingSpinner label="Fetching quotes…" />}
        {error && (
          <div className="rounded-lg p-4 bg-red-50 text-red-700 border border-red-100 text-center">
            Error: {String(error)}
          </div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {data.results.map((q) => (
                <div
                  key={q._id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                  <p className="text-lg text-gray-800 mb-3 font-medium">
                    “{q.content}”
                  </p>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-sky-700 font-semibold">
                      — {q.author}
                    </span>
                    {q.tags && q.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {q.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-sky-50 text-sky-600 text-xs rounded-full border border-sky-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/*pagination*/}
            <div className="flex items-center justify-center gap-4 mb-2">
              <button
                className="px-4 py-2 rounded bg-sky-600 text-white font-medium shadow hover:bg-sky-700 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
              <span className="text-sm text-gray-700">
                Page {data.page} / {data.totalPages}
              </span>
              <button
                className="px-4 py-2 rounded bg-sky-600 text-white font-medium shadow hover:bg-sky-700 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
            <div className="text-center text-xs text-gray-400 mb-4">
              Showing {data.count} of {data.totalCount} quotes
            </div>
          </>
        )}
      </div>
    </section>
  );
}
