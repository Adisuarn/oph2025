import Clubs from '~/_data/content/clubs.json'
import General from '~/app/_components/General'

export default function ClubsData({ params }: { params: { clubsId: string } }) {
  const selection = params.clubsId

  const club = Clubs.find((club) => club.key === selection)
  console.log(club)

  const reviews = club?.reviews || []
  const [review1, review2, review3] = [reviews[0] || null, reviews[1] || null, reviews[2] || null]

  return (
    <div>
      <General
        editFormData={club}
        review1={review1}
        review2={review2}
        review3={review3}
        reviews={reviews.length}
      />
    </div>
  )
}
