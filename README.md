# WorkZen

WorkZen is a role-based internal workflow app for managing employees and tasks.
It is built with React + TypeScript + Vite and includes responsive UI, access control, and data management with local persistence.

## Core Features

- Authentication with role-based route protection (`Admin`, `Manager`, `Employee`)
- Dashboard with charts and task overview
- Employee management (list, create, edit, delete)
- Task management (list, create, edit, delete, status update)
- Global search across tasks and employees
- Theme toggle (light/dark)
- Loading skeletons and motion transitions
- Excel import for employees with duplicate detection

## Excel Import (Employees)

Employees page supports importing `.xlsx`, `.xls`, and `.csv` files.

### Supported columns

- Required: `Name`, `Email`
- Optional: `Role`, `Status`

Accepted aliases are also supported (for example: `Full Name`, `Mail`, `Position`, `State`, `Vai tro`, `Trang thai`).

### Validation and duplicate rules

- Rows with missing/invalid email are skipped
- Rows with missing name are skipped
- Existing employees are matched by normalized email (case-insensitive)
- Duplicate emails inside the same file are skipped
- Import summary is shown after each upload:
  - Total rows
  - Valid rows
  - Added rows
  - Duplicates already in system
  - Duplicates inside file
  - Invalid rows

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- TanStack Table
- Recharts
- Zustand
- React Hook Form
- XLSX (lazy-loaded on demand for Excel import)

## Project Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Suggested Production Next Steps

- Replace localStorage with real backend + database
- Add audit logs for employee/task changes
- Add automated tests (unit + integration + e2e)
- Add CI/CD pipeline and environment configs
- Improve chunk splitting and lazy route loading for smaller initial bundle
