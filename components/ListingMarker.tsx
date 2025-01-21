'use client'

import { type Listing } from '~/types'
import { formatPriceAbbreviated } from '~/lib/listingHelpers'
import { memo, useCallback, useEffect, useState } from 'react'
import get from 'lodash/get'
import { useGoogleMaps } from '~/providers/GoogleMapsProvider'
import { createPortal } from 'react-dom'

export type ListingMarkerProps = {
  listing: Listing
}

export const listingLocationToLatLngLiteral = (
  listing: Listing
): google.maps.LatLngLiteral => {
  return {
    lat: listing?.latitude,
    lng: listing?.longitude
  }
}

function ListingMarker({ listing }: ListingMarkerProps) {
  // console.log(`ListingMarker for ${listing._id}`)
  const { googleMap } = useGoogleMaps()
  const [markerContainer, setMarkerContainer] = useState<HTMLDivElement | null>(
    null
  )

  const createMarker = useCallback(
    (
      markerContainer: HTMLElement
    ): google.maps.marker.AdvancedMarkerElement => {
      return new google.maps.marker.AdvancedMarkerElement({
        map: googleMap,
        position: listingLocationToLatLngLiteral(listing),
        content: markerContainer
      })
    },
    [googleMap, listing]
  )

  useEffect(() => {
    if (!googleMap) return
    const markerContainer = document.createElement('div')
    const marker = createMarker(markerContainer)
    setMarkerContainer(markerContainer)
    return () => {
      marker.map = null
      markerContainer.remove()
    }
  }, [createMarker, googleMap])

  if (markerContainer === null) return

  return createPortal(
    <div
      className='
        flex items-center justify-center
        rounded-full min-h-6 min-w-12
        shadow-md shadow-gray-500
        font-medium bg-white text-black dark:bg-gray-600 dark:text-white
        '
    >
      {formatPriceAbbreviated(listing.soldPrice || listing.listPrice)}
    </div>,
    markerContainer
  )
}

export const objectsValuesEqual = (
  obj1: object,
  obj2: object,
  attrs: string[]
): boolean => {
  return attrs.every((attr) => {
    return get(obj1, attr) === get(obj2, attr)
  })
}

// Don't re-render the marker if all of these conditions are true
const propsAreEqual = (
  prevProps: Readonly<ListingMarkerProps>,
  nextProps: Readonly<ListingMarkerProps>
) => {
  return objectsValuesEqual(prevProps, nextProps, [
    'listing._id',
    'listing.latitude',
    'listing.longitude'
  ])
}

export default memo(ListingMarker, propsAreEqual)
