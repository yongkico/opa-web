import Link from 'next/link'
import { JSX } from 'react'

export default function AuthorList(): JSX.Element {
    return (
        <div>
            <header className='mb-4'>
                <h3 className='text-xl md:text-xl'>Penulis</h3>
            </header>
            <ul className='space-y-4'>
                <li className=' border-b'>
                    <Link href={'/profile/winarna'} className='hover:text-secondary'>
                        Dr. Winarna
                    </Link>
                </li>
                <li className=' border-b'>
                    <Link href={'/profile/muhdan-syahroni'} className='hover:text-secondary'>
                        Muhdan Syarovy, S.P., M.Sc
                    </Link>
                </li>
                <li className=' border-b'>
                    {' '}
                    <Link href={'/profile/iput-pradiko'} className='hover:text-secondary'>
                        Iput Pradiko, S.Si., M.Si
                    </Link>
                </li>
                <li className=' border-b'>
                    {' '}
                    <Link href={'/profile/rana-farrasati'} className='hover:text-secondary'>
                        Rana Farrasati, S.P.
                    </Link>
                </li>
            </ul>
        </div>
    )
}
