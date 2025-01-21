import { SearchResults } from '~/components/SearchResults'
import ListingMapNoSSR from '~/components/ListingMapNoSSR'
import ListingMarkersNoSSR from '~/components/ListingMarkersNoSSR'
import { SearchHeader } from '~/components/SearchHeader'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className='grid grid-rows-[auto_1fr] h-full'>
      <SearchHeader />
      <div className='grid grid-cols-2 h-full min-h-0 min-w-0'>
        <div className='p-4 overflow-y-auto'>
          <Suspense>
            <SearchResults />
          </Suspense>
        </div>
        <div className='p-4'>
          <Suspense>
            <ListingMapNoSSR />
          </Suspense>
          <Suspense>
            <ListingMarkersNoSSR />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
