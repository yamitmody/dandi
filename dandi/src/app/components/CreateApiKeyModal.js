import { useState } from 'react';

export default function CreateApiKeyModal({ setIsModalOpen, setApiKeys, showToast, supabase }) {
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState(1000000);

  const handleCreateKey = async (e) => {
    e.preventDefault();
    const newKey = `key_${Math.random().toString(36).substr(2, 20)}`;
    const { data, error } = await supabase
      .from('api_keys')
      .insert({ name: newKeyName, key: newKey, limit: newKeyLimit })
      .select();

    if (error) {
      console.error('Error creating API key:', error);
      showToast('Failed to create API key', 'error');
    } else {
      setApiKeys(prevKeys => [...prevKeys, data[0]]);
      setIsModalOpen(false);
      setNewKeyName('');
      setNewKeyLimit(1000000);
      showToast('API key created successfully');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create a new API key</h2>
        <p className="mb-4">Enter a name and limit for the new API key.</p>
        <form onSubmit={handleCreateKey}>
          <div className="mb-4">
            <label htmlFor="keyName" className="block mb-2">Key Name — A unique name to identify this key</label>
            <input
              id="keyName"
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Key Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="keyLimit" className="block mb-2">Monthly Usage Limit</label>
            <input
              id="keyLimit"
              type="number"
              value={newKeyLimit}
              onChange={(e) => setNewKeyLimit(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}