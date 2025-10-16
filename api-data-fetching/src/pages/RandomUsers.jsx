import React, { useEffect, useState } from "react";
import { httpClient } from "../lib/httpClient.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function RandomUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const json = await httpClient("https://randomuser.me/api/?results=12", {
          signal: controller.signal,
        });
        setUsers(json.results);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        await new Promise((res) => setTimeout(res, 800)); // artificial delay for spinner test
        setLoading(false);
      }
    }
    fetchUsers();
    return () => controller.abort();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 p-6 w-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Random Users Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              A sample of 12 random user profiles
            </p>
          </div>
        </header>

        {loading && <LoadingSpinner label="Fetching user data…" />}

        {error && (
          <div className="rounded-lg p-4 bg-red-50 text-red-700 border border-red-100">
            Error: {String(error)}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {users.map((u, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={u.picture.large}
                  alt={`${u.name.first} ${u.name.last}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 mb-4 shadow"
                />
                <div className="text-center w-full">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1 flex items-center justify-center gap-2">
                    {u.name.title} {u.name.first} {u.name.last}
                    <span className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-500 ml-2">
                      {u.gender}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-500 mb-1">
                    Username:{" "}
                    <span className="font-medium text-gray-700">
                      {u.login.username}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">{u.email}</p>
                  <p className="text-xs text-gray-400 mb-2">
                    Registered:{" "}
                    {new Date(u.registered.date).toLocaleDateString()}
                  </p>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="block font-medium text-gray-700">
                      Address
                    </span>
                    <span>
                      {u.location.street.number} {u.location.street.name},{" "}
                      {u.location.city}, {u.location.state},{" "}
                      {u.location.country}, {u.location.postcode}
                    </span>
                  </div>
                </div>
                <hr className="my-1 border-gray-200 w-full" />
                <div className="mt-2 flex flex-col gap-1 w-full items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Age:</span>
                    <span className="text-base font-medium text-gray-700">
                      {u.dob.age}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Phone</span>
                    <span className="text-base font-medium text-gray-700">
                      {u.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Cell: </span>
                    <span className="text-base font-medium text-gray-700">
                      {u.cell}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
