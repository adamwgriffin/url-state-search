'use client'

import dynamic from 'next/dynamic'

const ListingMap = dynamic(() => import('./ListingMap'), { ssr: false })

export default function ListingMapNoSSR() {
  return <ListingMap />
}
