# Banking Transactions - Transaction History

Frontend Engineer interview assessment: transaction history screen with filters, search, pagination, and modal details.

## Features

- Transaction list with detail modal
- Filters: type (all/debit/credit), date range, search by narration
- Client-side filtering for json-server
- Pagination with "Load More" and merged pages
- Filter state preserved in the URL for back/forward navigation
- Empty and error states

## Tech Stack

- React + TypeScript + Vite
- Zustand for filter state
- React Query for data fetching
- json-server for mock API
- Tailwind CSS for styling

## Getting Started

Install dependencies:

```bash
npm install
```

Start the mock API (json-server) in one terminal:

```bash
npx json-server db.json --port 3000
```

Start the Vite dev server in another terminal:

```bash
npm run dev
```

Then open the local URL printed by Vite (for example, http://localhost:5173).

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - type-check and build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Notes

Expected API format:

```
GET /api/transactions?type=debit&from=2026-02-01&to=2026-02-10
```

Response format:

```json
{
	"status": "success",
	"page": 1,
	"limit": 10,
	"totalRecords": 27,
	"totalPages": 3,
	"data": []
}
```

When running locally with json-server, the app applies client-side filtering for `search`, `from`, and `to` because json-server does not implement those query params by default.

## Project Structure

- [src/pages/TransactionsPage.tsx](src/pages/TransactionsPage.tsx) - main page and modal
- [src/components/FilterBar.tsx](src/components/FilterBar.tsx) - filters and search
- [src/hooks/useTransactions.ts](src/hooks/useTransactions.ts) - data fetching (infinite query)
- [src/api/transactionsApi.ts](src/api/transactionsApi.ts) - API access
- [src/store/transactionStore.ts](src/store/transactionStore.ts) - filter state
- [db.json](db.json) - mock data for json-server

## Notes

- Ensure json-server is running on port 3000.
- Search input is debounced to reduce refetch churn during typing.
