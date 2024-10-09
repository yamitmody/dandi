import { useState } from 'react';

export default function ApiKeysSection({ apiKeys, setApiKeys, setIsModalOpen, setIsEditModalOpen, setEditingKey, showToast, supabase }) {
  const [visibleKeyId, setVisibleKeyId] = useState(null);

  const toggleKeyVisibility = (id) => {
    setVisibleKeyId(visibleKeyId === id ? null : id);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied API Key to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy API Key', 'error');
    });
  };

  const openEditModal = (key) => {
    setEditingKey(key);
    setIsEditModalOpen(true);
  };

  const deleteKey = async (id) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting API key:', error);
        showToast('Failed to delete API key', 'error');
      } else {
        setApiKeys(prevKeys => prevKeys.filter(key => key.id !== id));
        showToast('API key deleted successfully', 'error');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">API Keys</h2>
        <button onClick={() => setIsModalOpen(true)} className="text-blue-500">+ Add New Key</button>
      </div>
      <p className="mb-4 text-gray-600">
        The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
      </p>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2">NAME</th>
            <th className="pb-2">USAGE LIMIT</th>
            <th className="pb-2">KEY</th>
            <th className="pb-2">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((key) => (
            <tr key={key.id} className="border-t">
              <td className="py-4">{key.name}</td>
              <td className="py-4">
                <span className="bg-gray-100 px-2 py-1 rounded-full">{key.limit.toLocaleString()}</span>
              </td>
              <td className="py-4">
                {visibleKeyId === key.id ? key.key : key.key.replace(/(?<=^.{4}).*(?=.{4}$)/g, '*'.repeat(32))}
              </td>
              <td className="py-4">
                <div className="flex space-x-2">
                  <button onClick={() => toggleKeyVisibility(key.id)}>
                    {visibleKeyId === key.id ? '🙈' : '👁️'}
                  </button>
                  <button onClick={() => copyToClipboard(key.key)}>📋</button>
                  <button onClick={() => openEditModal(key)}>✏️</button>
                  <button onClick={() => deleteKey(key.id)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}