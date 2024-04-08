import Link from 'next/link'
import { JSX } from 'react'

export default function NotFound(): JSX.Element {
    return (
        <div className='flex h-screen items-center justify-center bg-primary text-center text-white'>
            <header className='space-y-4'>
                <h1 className='text-3xl md:text-6xl'>
                    Opps... <br /> Page Not Found
                </h1>

                <p className='text-2xl'>
                    Back to{' '}
                    <span className='font-bold underline'>
                        <Link href={'/'}>Home</Link>
                    </span>
                </p>
            </header>
        </div>
    )
}
