
import Link from 'next/link'
import Gifted from '~/_data/content/gifted.json'
import General from '~/app/_components/General'

export default function GiftedData({ params }: { params: { giftedId: string } }) {
  const selection = params.giftedId

  const gifted = Gifted.find((gif) => gif.key === selection)

  const reviews = gifted?.reviews || []
  const [review1, review2, review3] = [reviews[0] || null, reviews[1] || null, reviews[2] || null]

  return (
    <div>
      <General
        editFormData={gifted}
        review1={review1}
        review2={review2}
        review3={review3}
        reviews={reviews.length}
      />
    </div>
  )
}
