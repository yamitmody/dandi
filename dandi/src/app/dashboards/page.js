'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Toast from '../components/Toast';
import Sidebar from '../components/Sidebar';
import Overview from '../components/Overview';
import CurrentPlan from '../components/CurrentPlan';
import ApiKeysSection from '../components/ApiKeysSection';
import CreateApiKeyModal from '../components/CreateApiKeyModal';
import EditApiKeyModal from '../components/EditApiKeyModal';
import ContactSection from '../components/ContactSection';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Dashboards() { 
  const [apiKeys, setApiKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchApiKeys = async () => {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching API keys:', error);
      showToast('Failed to fetch API keys', 'error');
    } else {
      setApiKeys(data);
      showToast('API keys loaded successfully');
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-grow transition-margin duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4 flex items-center">
          <button onClick={toggleSidebar} className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="p-8">
          <div className="container mx-auto relative">
            <Overview />
            <CurrentPlan />
            <ApiKeysSection
              apiKeys={apiKeys}
              setApiKeys={setApiKeys}
              setIsModalOpen={setIsModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              setEditingKey={setEditingKey}
              showToast={showToast}
              supabase={supabase}
            />
            {isModalOpen && (
              <CreateApiKeyModal
                setIsModalOpen={setIsModalOpen}
                setApiKeys={setApiKeys}
                showToast={showToast}
                supabase={supabase}
              />
            )}
            {isEditModalOpen && (
              <EditApiKeyModal
                editingKey={editingKey}
                setIsEditModalOpen={setIsEditModalOpen}
                setApiKeys={setApiKeys}
                showToast={showToast}
                supabase={supabase}
              />
            )}
            <ContactSection />
            {toast.show && <Toast message={toast.message} type={toast.type} />}
          </div>
        </div>
      </div>
    </div>
  );
}