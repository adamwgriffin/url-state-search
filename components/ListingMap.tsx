'use client'

import { useGoogleMaps } from '~/providers/GoogleMapsProvider'
import { useSearchParams } from 'next/navigation'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import { GoogleMapsMapOptions } from '~/config/googleMapsOptions'
import {
  convertBoundsToParams,
  getAvailableBounds,
  getPolygonPaths
} from '~/lib/polygon'
import type { URLParams } from '~/types'
import { useSearchResults } from '~/hooks/useSearchResults'
import { useCallback, useMemo } from 'react'
import GoogleMap from './GoogleMap'

let userAdjustedMap = false

let previousZoom: number | null = null

function handleDragend() {
  userAdjustedMap = true
}

export default function ListingMap() {
  const { googleMap, googleLoaded } = useGoogleMaps()
  const queryParams = useSearchParams()
  const updateFilters = useUpdateFilters()
  const { data: results } = useSearchResults()

  const polygonPaths = useMemo(() => {
    return results && 'boundary' in results ? getPolygonPaths(results) : null
  }, [results])

  const bounds = useMemo(() => {
    if (!googleLoaded) return null
    return getAvailableBounds(
      queryParams,
      polygonPaths,
      results && 'viewport' in results ? results.viewport || null : null
    )
  }, [googleLoaded, polygonPaths, queryParams, results])

  const zoom = useMemo(
    () => Number(queryParams.get('zoom')) || null,
    [queryParams]
  )

  const handleIdle = useCallback(
    function () {
      if (!userAdjustedMap) return
      userAdjustedMap = false
      const mapBounds = googleMap?.getBounds()
      if (!mapBounds) return
      const updatedFilters: URLParams = convertBoundsToParams(
        mapBounds.toJSON()
      )
      updatedFilters.zoom = googleMap?.getZoom() || GoogleMapsMapOptions.zoom!
      if (results && 'boundary' in results && results?.boundary?._id) {
        updatedFilters.boundary_id = results.boundary._id
      }
      updateFilters(updatedFilters)
    },
    [googleMap, results, updateFilters]
  )

  if (!googleLoaded) return

  if (zoom) {
    if (zoom !== previousZoom) {
      googleMap?.setZoom(zoom)
    }
    previousZoom = zoom
  }

  if (bounds) {
    // googleMap?.fitBounds(bounds)
  }

  return (
    <div className='relative h-full'>
      <GoogleMap
        options={GoogleMapsMapOptions}
        onIdle={handleIdle}
        onDragEnd={handleDragend}
      ></GoogleMap>
    </div>
  )
}
