import { CardsData } from '@/types/cardsData'
import Image from 'next/image'

export function MediumCard({ img, title }: CardsData) {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image
          src={img}
          alt={title}
          className="rounded-xl"
          height={320}
          width={320}
        />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  )
}
