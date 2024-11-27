import Link from 'next/link'

export default function NotFound() {
    return(
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1>404 Handler</h1>
            <Link href='/'>Go Back Home</Link>
        </div>
    );
}