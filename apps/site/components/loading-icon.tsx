import classNames from 'classnames';

export default function LoadingIcon({
  size = 'base',
}: {
  size?: 'sm' | 'base';
}) {
  return (
    <div
      className={classNames(
        'bg-white ring-1 ring-snow shadow-lg rounded-full flex items-center justify-center',
        {
          'w-7 h-7': size === 'sm',
          'w-10 h-10': size === 'base',
        }
      )}
    >
      <svg
        className={classNames('animate-spin text-orange', {
          'w-4 h-4': size === 'sm',
          'w-5 h-5': size === 'base',
        })}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
