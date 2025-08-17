# README: Battery Analysis Web Application

## Overview
This is a Vue 3 application built for the NewGlobe Front-End Engineer Coding Exercise. The app analyzes battery data from teacher tablets (e-ink devices) across schools (referred to as "academies" in the data). It identifies devices with unhealthy batteries (average daily usage >30%) and prioritizes schools by the number of such issues, helping field teams decide visit order.

The solution is written in TypeScript, uses Vue Composition API, and focuses on core functionality: data loading from `battery.json`, calculations for battery usage, and a simple UI to display results. It anticipates growth (e.g., modular services/components) without over-engineering. Total development time: ~2.5 hours, prioritizing quality over extended scope.

## Design and Assumptions
### Key Features
- **Data Integration:** Loads `battery.json` locally (treated as an API-like source). Groups data by `serialNumber` for calculations.
- **Battery Calculation Logic:**
    - Uses all data points per device, sorted by timestamp.
    - Computes average daily usage weighted by interval duration (chosen for accuracy; e.g., longer intervals have more influence).
    - Only considers discharge intervals (battery level decreases); ignores charges (increases) or static levels.
    - Formula: `avg_daily = (total_consumption / total_hours) * 24` if data sufficient; else "unknown".
    - Threshold: >30% flags as unhealthy.
    - Edge cases: Single point → "unknown"; no discharge → "unknown".
- **UI:**
    - Simple table listing academies sorted by descending number of bad devices.
    - Each row shows academy ID, bad device count, and list of bad serial numbers.
    - Not pixel-perfect; responsive for latest Chrome.
- **Structure:**
    - `src/units/batteryCalculator.ts`: Pure functions for calculations (reusable, testable).
    - `src/views/Home.vue`: Main component for data loading and display.
    - Types in `env.d.ts` (e.g., `BatteryEntry`, `DeviceUsage`, `AcademySummary`).
- **Assumptions:**
    - JSON format: Matches examples (e.g., `serialNumber`, `batteryLevel`, `academyId` as number, etc.). Data may not be sorted; code handles sorting.
    - Academies: Grouped by `academyId` (number); assume devices tied to one academy.
    - Timestamps: ISO format, handled via `Date`; ignore timezones (assume UTC).
    - No network/security; local JSON only.
    - UI: Basic CSS; leverages existing `main.css` if available.
    - Cut Scope: No filters/search/pagination (add via Vue refs/computed later). No production build/minification. If data grows huge, add lazy loading/virtual scrolling.

## Setup and Running
This project uses pnpm for package management (as per your setup). Assume Node.js >=18.

1. Install dependencies:
   ```
   pnpm install
   ```

2. Run in development mode:
   ```
   pnpm run dev
   ```
    - Opens at `http://localhost:5173` (or similar; check console).
    - Hot module replacement enabled.

3. Build for preview (optional, since no production packaging required):
   ```
   pnpm run build
   pnpm run preview
   ```

## Testing
Unit tests focus on core logic (e.g., `batteryCalculator.ts`) using Vitest. Covers PDF examples and edges.

- Run tests:
  ```
  pnpm test
  ```
    - Watches for changes; use `pnpm test --run` for one-time execution.
- Test files: Co-located (e.g., `batteryCalculator.test.ts`).
- Coverage: Basic; expandable later.

## Dependencies
- Core: Vue 3.5, Vue Router 4.5, TypeScript 5.7.
- UI/Extras: PrimeVue 4.2 (for potential components; not heavily used), TanStack Vue Query (for data handling if extended), etc. (as in your lockfile).
- Dev: Vitest (added for tests), ESLint 9, Prettier 3, TailwindCSS 3.4.
- All installed via pnpm; no exotic tools.

## Future Work Strategy
- If time allows: Add pagination for large data, search/filter by academy/device, visualizations (e.g., charts via Chart.js).
- Extend: Replace JSON with real API (use Axios/TanStack Query for fetching).
- Testing: Add component/integration tests with `@vue/test-utils`.

Forked from: https://github.com/omarfarouklakhdar/fe-take-home-assesment  
Submitted by: [Antonov Vladyslav] on August 17, 2025.