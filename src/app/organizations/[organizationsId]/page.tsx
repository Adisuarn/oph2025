import Link from 'next/link'
import Organizations from '~/_data/content/organizations.json'
import General from '~/app/_components/General'

export default function Programs({ params }: { params: { organizationsId: string } }) {
  const selection = params.organizationsId

  const organization = Organizations.find((org) => org.key === selection)

  if (!organization) {
    return <div>Organization not found</div>
  }

  const reviews = organization.reviews || []
  const [review1, review2, review3] = [reviews[0] || null, reviews[1] || null, reviews[2] || null]

  return (
    <div>
      <General
        editFormData={organization}
        review1={review1}
        review2={review2}
        review3={review3}
        reviews={reviews.length}
      />
    </div>
  )
}
