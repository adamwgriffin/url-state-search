'use client'

import { useGoogleMaps } from '~/providers/GoogleMapsProvider'
import { formatPriceAbbreviated } from '~/lib/listingHelpers'
import { memo, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type ListingMarkerProps = {
  latitude: number
  longitude: number
  listPrice: number
  soldPrice: number | null | undefined
}

function ListingMarker({
  latitude,
  longitude,
  listPrice,
  soldPrice
}: ListingMarkerProps) {
  console.log(`ListingMarker rendering ${latitude}/${longitude}`)
  const { googleMap, googleLoaded } = useGoogleMaps()
  const [markerContainer, setMarkerContainer] = useState<HTMLDivElement | null>(
    null
  )

  const createMarker = useCallback(
    (
      markerContainer: HTMLElement
    ): google.maps.marker.AdvancedMarkerElement => {
      return new google.maps.marker.AdvancedMarkerElement({
        map: googleMap,
        position: {
          lat: latitude,
          lng: longitude
        },
        content: markerContainer
      })
    },
    [googleMap, latitude, longitude]
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

  if (googleLoaded === false) return null

  if (googleMap === null) return null

  if (markerContainer === null) return null

  return createPortal(
    <div
      className='
        flex items-center justify-center
        rounded-full min-h-6 min-w-12
        shadow-md shadow-gray-500
        font-medium bg-white text-black dark:bg-gray-600 dark:text-white
        '
    >
      {formatPriceAbbreviated(soldPrice || listPrice)}
    </div>,
    markerContainer
  )
}

// Don't re-render the marker if all of these conditions are true
// const propsAreEqual = (
//   prevProps: Readonly<ListingMarkerProps>,
//   nextProps: Readonly<ListingMarkerProps>
// ) => {
//   console.log('propsAreEqual running.')
//   return (
//     prevProps.latitude === nextProps.latitude &&
//     prevProps.longitude === nextProps.longitude
//   )
// }

export default memo(ListingMarker)
