export async function httpClient(url, { signal } = {}) {
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw new Error(e.message || 'Network error');
  }
}
