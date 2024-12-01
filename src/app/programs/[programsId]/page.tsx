import Link from 'next/link'

export default function Programs({ params }: { params: { programsId: string } }) {
  return (
      <div>{params.programsId}</div>
  )
}
