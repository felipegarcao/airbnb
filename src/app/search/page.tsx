'use client'
import { searchResult } from '@/types/searchResult'
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

interface SearchProps {
  data: searchResult[]
}

export default function Search({ data }: SearchProps) {
  console.log(data)
  const searchParams = useSearchParams()

  const location = searchParams.get('location')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const noOfGuest = searchParams.get('noOfGuest')

  const formatedDate = 'dd MMMM yyyy'

  const formattedStartDate = format(new Date(startDate!), formatedDate, {
    locale: ptBr,
  })
  const formattedEndDate = format(new Date(endDate!), formatedDate, {
    locale: ptBr,
  })
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div>
        <main className="flex">
          <section className="flex-grow pt-14 px-6">
            <p className="text-sm">
              300+ Stays - {range} - of {noOfGuest} guests
            </p>

            <h1 className="text-3xl font-semibold mt-2 mb-6">
              Stays in {location}
            </h1>

            <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
              <p className="button">Cacellation Flexibily</p>
              <p className="button">Type of Place</p>
              <p className="button">Price</p>
              <p className="button">Rooms and Beds</p>
              <p className="button">More filters</p>
            </div>
          </section>
        </main>
      </div>
    </Suspense>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://www.jsonkeeper.com/b/5NPS`)
  const data = await res.json()

  return { props: { data } }
}
