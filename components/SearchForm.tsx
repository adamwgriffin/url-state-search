'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useSearchNewLocation } from '~/hooks/useSearchNewLocation'

export function SearchForm() {
  const searchParams = useSearchParams()
  const searchNewLocation = useSearchNewLocation()

  const [address, setAddress] = useState(searchParams.get('address') ?? '')

  return (
    <div className='p-4'>
      <form
        name='search-form'
        onSubmit={(e) => {
          e.preventDefault()
          searchNewLocation(address)
        }}
      >
        <fieldset className='flex gap-x-3'>
          <input
            type='text'
            name='address'
            value={address}
            autoComplete='off'
            onChange={(e) => setAddress(e.target.value)}
            className='p-2 rounded-md w-72 border border-gray-400'
            data-1p-ignore
            spellCheck='false'
          />
          <button
            type='submit'
            form='search-form'
            value='Submit'
            onClick={() => searchNewLocation(address)}
          >
            <FaSearch size={26} />
          </button>
        </fieldset>
      </form>
    </div>
  )
}
