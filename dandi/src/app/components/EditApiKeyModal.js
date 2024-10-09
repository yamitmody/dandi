import { useState, useEffect } from 'react';

export default function EditApiKeyModal({ editingKey, setIsEditModalOpen, setApiKeys, showToast, supabase }) {
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState(1000000);

  useEffect(() => {
    if (editingKey) {
      setNewKeyName(editingKey.name);
      setNewKeyLimit(editingKey.limit);
    }
  }, [editingKey]);

  const handleEditKey = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('api_keys')
      .update({ name: newKeyName, limit: newKeyLimit })
      .eq('id', editingKey.id)
      .select();

    if (error) {
      console.error('Error updating API key:', error);
      showToast('Failed to update API key', 'error');
    } else {
      setApiKeys(prevKeys => prevKeys.map(key => 
        key.id === editingKey.id ? data[0] : key
      ));
      setIsEditModalOpen(false);
      showToast('API key updated successfully');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit API key</h2>
        <form onSubmit={handleEditKey}>
          <div className="mb-4">
            <label htmlFor="editKeyName" className="block mb-2">Key Name</label>
            <input
              id="editKeyName"
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Key Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="editKeyLimit" className="block mb-2">Monthly Usage Limit</label>
            <input
              id="editKeyLimit"
              type="number"
              value={newKeyLimit}
              onChange={(e) => setNewKeyLimit(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}