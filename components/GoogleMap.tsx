import { type ReactNode, useRef, useEffect, useCallback } from 'react'
import { useGoogleMaps } from '~/providers/GoogleMapsProvider'

export type GoogleMapState = {
  bounds: google.maps.LatLngBoundsLiteral | undefined
  center: google.maps.LatLngLiteral | undefined
  zoom: number | undefined
}

export type GoogleMapProps = {
  options: google.maps.MapOptions
  onDragEnd?: (currentMapState: GoogleMapState) => void
  onUserChangedZoom?: (currentMapState: GoogleMapState) => void
  onIdle?: (currentMapState: GoogleMapState) => void
  children?: ReactNode
}

let fitBoundsInProgress = false

const GoogleMap: React.FC<GoogleMapProps> = ({
  options,
  children,
  onDragEnd,
  onUserChangedZoom,
  onIdle
}) => {
  const mapEl = useRef<HTMLDivElement>(null)
  const { googleMap, setGoogleMap } = useGoogleMaps()

  const getCurrentMapState = useCallback((): GoogleMapState => {
    return {
      bounds: googleMap?.getBounds()?.toJSON(),
      center: googleMap?.getCenter()?.toJSON(),
      zoom: googleMap?.getZoom()
    }
  }, [googleMap])

  useEffect(() => {
    if (!mapEl.current) return
    if (!googleMap) {
      setGoogleMap(new google.maps.Map(mapEl.current, options))
    } else {
      googleMap.setOptions(options)
    }
  }, [googleMap, options, setGoogleMap])

  useEffect(() => {
    if (!googleMap) return
    const eventListeners: google.maps.MapsEventListener[] = []
    eventListeners.push(
      google.maps.event.addListener(googleMap, 'dragend', () =>
        onDragEnd?.(getCurrentMapState())
      )
    )
    eventListeners.push(
      google.maps.event.addListener(googleMap, 'zoom_changed', () => {
        // Make sure we only call this when a user action changed the zoom event
        // rather than the bounds changing
        if (!fitBoundsInProgress) {
          onUserChangedZoom?.(getCurrentMapState())
        }
      })
    )
    eventListeners.push(
      google.maps.event.addListener(googleMap, 'idle', () => {
        // Reset fitBoundsInProgress after fitBounds() completes and map is
        // idle.
        fitBoundsInProgress = false
        onIdle?.(getCurrentMapState())
      })
    )
    // The events get re-added each time a dependency changes in this useEffect,
    // so we have to clean them up, otherwise they will multiply quickly and
    // cause many unecessary api requests.
    return () => {
      eventListeners.forEach((eventListener) =>
        google.maps.event.removeListener(eventListener)
      )
      eventListeners.length = 0
    }
  }, [getCurrentMapState, googleMap, onDragEnd, onIdle, onUserChangedZoom])

  return (
    <div ref={mapEl} id='#googleMap' className='h-full rounded-md'>
      {googleMap && children}
    </div>
  )
}

export default GoogleMap