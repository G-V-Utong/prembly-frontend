# api-data-fetching

Public API demos with loading and error states.

## Endpoints
- Quotes: https://api.quotable.io/quotes?page=1 (pagination supported)
- COVID-19 (US daily): https://api.covidtracking.com/v1/us/daily.json
- Random Users: https://randomuser.me/api/

## Setup
```bash
npm install
npm run dev
```

## Notes
- Quotes page supports Prev/Next pagination and shows total pages
- COVID page shows a line chart (cases & deaths), table and other data displayed in a grid
- Users page displays a responsive card grid
- a HttpClient function was created to simplify the fetch  calls and make the code more readable
- a delay of 8ms has been added to the fetch calls. This is solely to display the loading spinner in action for the purpose of this test. In production, this code would be removed:
```bash
... await new Promise((res) => setTimeout(res, 800));
```
