import { JSX } from 'react'
import { AssetsDashboard } from '@/assets/index'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import ComingSoon from '@/components/partials/backoffice/VerificationAgronomy/ComingSoon'

export default function Fertilizer(): JSX.Element {
    return (
        <div className='container px-0 py-4 lg:py-8'>
            <ComingSoon />
        </div>
    )

    return (
        <div className='container h-screen p-4 md:p-8'>
            <header>
                <h1 className='mb-8 text-xl'>Pilih Rekomendasi</h1>
            </header>

            <section className='flex flex-col justify-between gap-4 lg:flex-row'>
                <div className='relative'>
                    <img
                        className='rounded-lg'
                        src={AssetsDashboard.asset_rekomendasi_otomatis.src}
                        alt='Auto Recommendation'
                    />

                    <Link
                        href={'/member/fertilizer/auto'}
                        className='absolute right-5 top-[40%] rounded-full bg-white p-2'
                    >
                        <ArrowRightIcon className='h-6 w-6 text-dark lg:h-12 lg:w-12' />
                    </Link>
                </div>

                <div className='relative'>
                    <img
                        className='rounded-lg'
                        src={AssetsDashboard.asset_rekomendasi_manual.src}
                        alt='Manual Recommendation'
                    />
                    <Link
                        href={'/member/fertilizer/manual?step=1'}
                        className='absolute right-5 top-[40%] rounded-full bg-white p-2'
                    >
                        <ArrowRightIcon className='h-6 w-6 text-dark lg:h-12 lg:w-12' />
                    </Link>
                </div>
            </section>
        </div>
    )
}
