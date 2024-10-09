export default function Overview() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Overview</h1>
      <div className="flex items-center space-x-4">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Operational
        </span>
        {/* Add icons for GitHub, Twitter, Email, and Theme toggle */}
      </div>
    </div>
  );
}