import Link from 'next/link'
import General from '~/app/_components/General'
import Organizations from "~/_data/content/organizations.json";

// ดึง data จาก API มาแสดง

export default function Programs({ params }: { params: { organizationsId: string } }) {
  const selection = params.organizationsId
  console.log(Organizations[0])
  return (
      <div>
        <General editFormData={'hi'} review1={'hi'} review2={'hi'} review3={'hi'} reviews={'hi'} />
      </div>
  )
}
