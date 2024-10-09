'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '../components/Toast';

export default function ProtectedPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = async () => {
      // In a real application, you would check the user's session or token here
      // For this example, we'll just show a success message
      setIsAuthorized(true);
      setToast({ show: true, message: 'Valid API key, /protected can be accessed', type: 'success' });
    };

    checkAuthorization();
  }, []);

  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p>This is a protected page that can only be accessed with a valid API key.</p>
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}