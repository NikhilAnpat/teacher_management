import Skeleton from '../../components/Loader';

export default function ReportsLoading() {
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
        {/* Chart cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} height="320px" />
          ))}
        </div>
      </div>
    </div>
  );
} 