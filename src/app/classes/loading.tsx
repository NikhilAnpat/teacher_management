import Skeleton from '../../components/Loader';

export default function ClassesLoading() {
  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <Skeleton width="200px" height="2.2rem" className="mb-8" />
        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height="80px" />
          ))}
        </div>
        {/* Class table skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <Skeleton width="100%" height="2rem" className="mb-4" />
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} width="100%" height="1.5rem" className="mb-2" />
          ))}
        </div>
      </div>
    </div>
  );
} 