'use client'

import { useSearchResults } from '~/hooks/useSearchResults'
// import { useSearchParams } from 'next/navigation'

export default function Test() {
  // const searchParams = useSearchParams()
  const { data } = useSearchResults()

  // console.log("searchParams:", searchParams.toString())

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4'>
      {data?.listings?.map((listing) => (
        <div
          key={listing._id}
          className='flex justify-center items-center p-2 bg-slate-500 rounded-lg'
        >
          {listing._id}
        </div>
      ))}
    </div>
  )
}
