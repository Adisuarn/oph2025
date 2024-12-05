import Clubs from '~/_data/content/clubs.json'
import General from '~/app/_components/General'

export default async function clubData(props: { params: Promise<{ clubsId: string }> }) {
  const params = await props.params;
  const selection = decodeURIComponent(params.clubsId);

  const clubs = Clubs.find((club) => club.key === selection)

  const reviews = clubs?.reviews || []
  const [review1, review2, review3] = [reviews[0] || null, reviews[1] || null, reviews[2] || null]

  return (
    <div>
      <General
        editFormData={clubs}
        review1={review1}
        review2={review2}
        review3={review3}
        reviews={reviews.length}
      />
    </div>
  )
}
