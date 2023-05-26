'use client'
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export function Header() {
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [noOfGuests, setNoOfGuests] = useState(1)
  const router = useRouter()

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }

  const handleSelect = (ranges: any) => {
    setStartDate(ranges?.selection.startDate)
    setEndDate(ranges?.selection.endDate)
  }

  const resetInput = () => {
    setSearchInput('')
  }

  const handleSearch = () => {
    if (startDate && endDate) {
      router.push(
        `/search?location=${searchInput}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&noOfGuest=${noOfGuests}`,
      )
    }
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div
        onClick={() => router.push('/')}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          alt="logo project"
          width={118}
          height={64}
        />
      </div>
      <div className="flex items-center md:border-2 rounded-full py-2 justify-between md:shadow-sm">
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          type="text"
          placeholder="start your search"
          className="outline-none pl-5 bg-transparent text-sm text-gray-600 placeholder-gray-400"
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-10">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>

            <UsersIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(Number(e.target.value))}
              min={1}
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button className="flex-grow text-red-400" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
