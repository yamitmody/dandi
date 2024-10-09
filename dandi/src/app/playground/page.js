'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '../components/Toast';

export default function ApiPlayground() {
  const [apiKey, setApiKey] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (data.valid) {
        setToast({ show: true, message: 'Valid API key, /protected can be accessed', type: 'success' });
        setTimeout(() => {
          router.push('/protected');
        }, 2000);
      } else {
        setToast({ show: true, message: 'Invalid API key', type: 'error' });
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      setToast({ show: true, message: 'Error validating API key', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Playground</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}