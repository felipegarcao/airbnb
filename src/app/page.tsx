import { Banner } from '@/components/Banner'
import { LargeCard } from '@/components/LargeCard'
import { MediumCard } from '@/components/MediumCard'
import { SmallCard } from '@/components/SmallCard'
import { api } from '@/lib/api'
import { CardsData } from '@/types/cardsData'
import { exploreDate } from '@/types/exploreDate'

export default async function Home() {
  const exploreDate: exploreDate[] = await api
    .get('https://www.jsonkeeper.com/b/4G1G')
    .then((res) => res.data)

  const cardsData: CardsData[] = await api
    .get('https://www.jsonkeeper.com/b/VHHT')
    .then((res) => res.data)

  return (
    <div>
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreDate?.map((item, index) => (
              <SmallCard key={index} {...item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData.map((item, index) => (
              <MediumCard key={index} {...item} />
            ))}
          </div>
        </section>

        <LargeCard />
      </main>
    </div>
  )
}
