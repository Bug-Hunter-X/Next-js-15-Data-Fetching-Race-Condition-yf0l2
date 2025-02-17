```javascript
// pages/about.js
import React, { useEffect, useState } from 'react';

export default function About() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const controller = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data', { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>About Us</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```