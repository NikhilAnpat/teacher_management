import Skeleton from '../../components/Loader';

export default function SettingsLoading() {
  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-2xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <Skeleton width="200px" height="2.2rem" className="mb-8" />
        {/* Settings form skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} width="100%" height="2rem" className="mb-4" />
          ))}
        </div>
      </div>
    </div>
  );
} 