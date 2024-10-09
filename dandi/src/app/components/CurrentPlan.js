export default function CurrentPlan() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-yellow-500 rounded-lg p-6 mb-8 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm mb-2">CURRENT PLAN</p>
          <h2 className="text-4xl font-bold">Researcher</h2>
        </div>
        <button className="bg-white bg-opacity-20 text-white px-4 py-2 rounded">
          Manage Plan
        </button>
      </div>
      <div>
        <p className="text-sm mb-2">API Limit</p>
        <div className="bg-white bg-opacity-20 rounded-full h-2 mb-2">
          <div className="bg-white h-2 rounded-full" style={{width: '0%'}}></div>
        </div>
        <p className="text-sm">0 / 1,000 Requests</p>
      </div>
    </div>
  );
}