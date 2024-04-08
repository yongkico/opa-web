import { JSX } from 'react'
import AssetComingSoon from '@/assets/svg/asset-coming-soon.svg'
import { Image } from '@nextui-org/react'

export default function ComingSoon(): JSX.Element {
    return (
        <div className='apply-dark flex h-[calc(100vh-10rem)] flex-col items-center justify-center gap-y-8 rounded-lg bg-white text-center'>
            <Image className='w-44 sm:w-64' src={AssetComingSoon.src} alt='coming soon' />

            <header className='space-y-4'>
                <h1 className='text-3xl text-primary md:text-4xl'>Coming Soon...</h1>
            </header>
        </div>
    )
}
