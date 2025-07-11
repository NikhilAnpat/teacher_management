import Skeleton from '../../components/Loader';

export default function ScheduleLoading() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-6">
        <Skeleton width="300px" height="2rem" className="mb-4" />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height="80px" />
          ))}
        </div>

        {/* Filters */}
        <Skeleton height="80px" className="mb-6" />

        {/* Schedule Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Skeleton width="200px" height="1.5rem" />
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-8 gap-2 mb-4">
                  <Skeleton height="40px" />
                  {[...Array(7)].map((_, i) => (
                    <Skeleton key={i} height="40px" />
                  ))}
                </div>
                
                {/* Table Rows */}
                {[...Array(10)].map((_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-8 gap-2 mb-2">
                    <Skeleton height="48px" />
                    {[...Array(7)].map((_, colIndex) => (
                      <Skeleton key={colIndex} height="48px" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 