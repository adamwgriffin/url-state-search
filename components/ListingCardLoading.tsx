export function ListingCardLoading() {
  return (
    <div role='status' className='animate-pulse flex flex-col gap-4'>
      <svg
        className='w-full h-full text-gray-200 dark:text-gray-600'
        viewBox='0 0 20 20'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        width={300}
        height={300}
      >
        <path d='M2 0C0.895432 0 0 0.895447 0 2V18C0 19.1046 0.895432 20 2 20H18C19.1046 20 20 19.1046 20 18V2C20 0.895447 19.1046 0 18 0H2ZM12.5 5C12.697 5 12.892 5.03882 13.074 5.1142C13.256 5.18958 13.4214 5.30005 13.5607 5.43933C13.7 5.57861 13.8104 5.74396 13.8858 5.92596C13.9612 6.10797 14 6.30304 14 6.5C14 6.69696 13.9612 6.89203 13.8858 7.07404C13.8104 7.25604 13.7 7.42139 13.5607 7.56067C13.4214 7.69995 13.256 7.81042 13.074 7.8858C12.892 7.96118 12.697 8 12.5 8C12.1022 8 11.7206 7.84198 11.4393 7.56067C11.158 7.27936 11 6.89783 11 6.5C11 6.10217 11.158 5.72064 11.4393 5.43933C11.7206 5.15802 12.1022 5 12.5 5ZM16.876 15.481C16.7898 15.6381 16.6631 15.769 16.509 15.8604C16.3549 15.9517 16.1791 15.9999 16 16H4C3.82953 16.0001 3.66187 15.9566 3.51292 15.8736C3.364 15.7906 3.23874 15.671 3.14906 15.526C3.05939 15.381 3.00827 15.2155 3.00056 15.0452C2.99284 14.8749 3.02879 14.7055 3.105 14.553L6.605 7.55298C6.68558 7.39154 6.80833 7.25488 6.96027 7.15753C7.1122 7.06018 7.28764 7.00574 7.468 7C7.64992 6.98987 7.83098 7.03149 7.99025 7.11993C8.14952 7.20844 8.28049 7.34021 8.368 7.5L11.143 12.257L12.689 10.37C12.7894 10.2477 12.9174 10.1509 13.0625 10.0878C13.2076 10.0246 13.3656 9.9967 13.5236 10.0065C13.6815 10.0162 13.8349 10.0634 13.9711 10.1439C14.1073 10.2245 14.2224 10.3362 14.307 10.47L16.848 14.47C16.9421 14.6208 16.9943 14.794 16.9992 14.9717C17.0042 15.1494 16.9616 15.3252 16.876 15.481Z' />
      </svg>

      <div className='w-1/4 h-4 rounded-md bg-gray-200 dark:bg-gray-700'></div>
      <div>
        <div className='w-3/5 h-4 rounded-md bg-gray-200 dark:bg-gray-700 mb-3'></div>
        <div className='w-3/5 h-4 rounded-md bg-gray-200 dark:bg-gray-700'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
