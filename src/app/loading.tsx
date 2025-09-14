export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Loading MountPole</h2>
        <p className="text-sm text-gray-600">Preparing your technology distribution experience...</p>
      </div>
    </div>
  );
}
