import Link from 'next/link'
import General from '~/app/_components/General'
import Organizations from "~/_data/content/organizations.json";

export default function Programs({ params }: { params: { organizationsId: string } }) {
  const selection = params.organizationsId

  const organization = Organizations.find(
    (org) => org.key === selection
  );

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
      <div>
        <h1>{organization.name}</h1>
      <p>{organization.ig}</p>
        <General editFormData={organization} review1={organization.reviews[0]} review2={organization.reviews[1]} review3={organization.reviews[2]} reviews={organization.reviews.length} />
      </div>
  )
}
