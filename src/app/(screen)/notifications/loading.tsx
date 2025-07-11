import Skeleton from '../../../components/Loader';

export default function NotificationsLoading() {
  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <Skeleton width="200px" height="2.2rem" className="mb-8" />
        {/* Notification cards skeleton */}
        <div className="grid grid-cols-1 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
              {/* Avatar/Icon */}
              <Skeleton width="40px" height="40px" circle className="flex-shrink-0" />
              <div className="flex-1">
                {/* Title */}
                <Skeleton width="120px" height="1.1rem" className="mb-2" />
                {/* Message */}
                <Skeleton width="100%" height="0.9rem" className="mb-1" />
                <Skeleton width="80%" height="0.9rem" className="mb-2" />
                {/* Time */}
                <Skeleton width="60px" height="0.8rem" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 