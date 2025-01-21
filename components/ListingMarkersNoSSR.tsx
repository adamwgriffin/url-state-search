'use client'

import dynamic from 'next/dynamic'

const ListingMarkers = dynamic(() => import('./ListingMarkers'), { ssr: false })

export default function ListingMapNoSSR() {
  return <ListingMarkers/>
}
