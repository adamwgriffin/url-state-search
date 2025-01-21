import type { PolygonPaths } from '~/types'
import { useGoogleMaps } from '~/providers/GoogleMapsProvider'

export type MapBoundaryProps = {
  paths: PolygonPaths | null
  visible: boolean
  options: google.maps.PolygonOptions
}

let polygon: google.maps.Polygon

export function MapBoundary ({
  paths,
  visible = true,
  options = {}
}: MapBoundaryProps) {
  const { googleMap } = useGoogleMaps()

  polygon ||= new google.maps.Polygon()
  polygon.setMap(googleMap)
  if (paths) polygon.setPaths(paths)
  polygon.setOptions({ ...options, visible })

  return null
}
