# Next.js 15 Data Fetching Race Condition

This repository demonstrates a potential race condition in Next.js 15 when fetching data using `React.useState` and `useEffect`.  If a user navigates away from a page before data fetching is complete, it could lead to unexpected behavior, such as errors or incorrect data display.

## Bug Description

The `About` page fetches data from an API endpoint. If the user navigates away from the `About` page before the data fetch completes, the `About` component might throw an error or display stale data. This is because the `useEffect` hook might still be running, trying to update the state after the component has unmounted.

## Solution

The solution involves using the `AbortController` API to cancel the fetch request when the component unmounts. This prevents unnecessary updates and potential race conditions.

## How to Reproduce

1. Clone this repository.
2. Run `npm install`.
3. Run `npm run dev`.
4. Navigate to the `/about` page.
5. Quickly navigate away from the `/about` page before the data finishes loading.  You should see the error in the console.