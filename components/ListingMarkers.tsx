'use client'

import { useMemo } from 'react'
import { useSearchResults } from '~/hooks/useSearchResults'
import ListingMarker from './ListingMarker'
import pick from 'lodash/pick'

export default function ListingMarkers() {
  const { data } = useSearchResults()
  const listingsMemoized = useMemo(() => {
    return (data?.listings || []).map((listing) =>
      pick(listing, ['_id', 'latitude', 'longitude', 'listPrice', 'soldPrice'])
    )
  }, [data?.listings])

  return (
    <>
      {listingsMemoized.map((listing) => (
        <ListingMarker
          key={listing._id}
          latitude={listing.latitude}
          longitude={listing.longitude}
          listPrice={listing.listPrice}
          soldPrice={listing.soldPrice}
        />
      ))}
    </>
  )
}
