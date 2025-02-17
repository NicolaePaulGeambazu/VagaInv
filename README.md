# Vega Dashboard

Vega Dashboard is a modern financial portfolio dashboard built with React, TypeScript, Redux, React Query, and Tailwind CSS. It allows users to securely log in, view their portfolio data, and visualize performance using advanced charts.

## Features

- **User Authentication:** Secure login and sign-up with Redux.
- **Portfolio Overview:** View detailed positions and asset information.
- **Data Visualization:**
  - **Donut Chart:** Group positions by asset or asset type.
  - **Historical Chart:** Track portfolio performance over selectable date ranges.
- **Responsive Design:** Built with Tailwind CSS for a sleek, responsive UI.
- **Advanced TypeScript:** Robust type checking and modern component patterns.

## Technologies

- React with functional components and hooks
- TypeScript
- Redux Toolkit
- React Query
- Chart.js and react-chartjs-2
- Tailwind CSS
- Vite

## API Endpoints

- **GET /assets** – Retrieves a list of all financial assets.
- **GET /prices?assets=...&asOf=...&from=...&to=...** – Retrieves asset prices, with optional filtering by date or date range.
- **GET /portfolios?asOf=...** – Retrieves portfolio data for a specific date.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vega-dashboard.git
   cd vega-dashboard
   ```

### Run project

1. Start project: npm run dev and will start on http://localhost:5173/
2. Start Json-db : json-server --watch db.json --port 3000
   You should see:
   Endpoints:
   http://localhost:3000/assets
   http://localhost:3000/prices
   http://localhost:3000/portofolios
# VagaInv
