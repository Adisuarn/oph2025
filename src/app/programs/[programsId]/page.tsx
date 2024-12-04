import Link from 'next/link'
import Programs from '~/_data/content/programs.json'
import General from '~/app/_components/General'

export default async function ProgramsData(props: { params: Promise<{ programsId: string }> }) {
  const params = await props.params;
  const selection = params.programsId

  const programs = Programs.find((prog) => prog.key === selection)

  const reviews = programs?.reviews || []
  const [review1, review2, review3] = [reviews[0] || null, reviews[1] || null, reviews[2] || null]

  return (
    <div>
      <General
        editFormData={programs}
        review1={review1}
        review2={review2}
        review3={review3}
        reviews={reviews.length}
      />
    </div>
  )
}
