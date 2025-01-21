'use client'

import { useMemo } from 'react'
import { useSearchResults } from '~/hooks/useSearchResults'
import ListingMarker from './ListingMarker'
import { useGoogleMaps } from '~/providers/GoogleMapsProvider'
export default function ListingMarkers() {
  const { googleLoaded } = useGoogleMaps()
  const { data: results } = useSearchResults()
  const listings = useMemo(() => results?.listings || [], [results?.listings])

  if (!googleLoaded) return null

  return (
    <>
      {listings.map((listing) => (
        <ListingMarker key={listing._id} listing={listing} />
      ))}
    </>
  )
}
