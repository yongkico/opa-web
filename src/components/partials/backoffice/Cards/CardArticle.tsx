import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'
import AssetCover from '@/assets/cover.png'
import Image from 'next/image'

export default function CardArticle() {
    return (
        <div className='flex flex-col gap-x-4 rounded-2xl p-4 md:flex-row'>
            <Image
                src={AssetCover}
                alt='Asset Cover'
                width={600}
                className='aspect-video rounded-lg object-cover lg:aspect-[4/3]'
            />

            <div className='flex flex-col justify-center gap-y-2 px-2 py-4 lg:py-0'>
                <div className='flex flex-col justify-between gap-y-1 md:flex-row'>
                    <p className='w-max rounded-lg bg-tertiary px-2 py-1 text-sm font-semibold text-light md:py-2'>
                        Manajemen Tata Air
                    </p>
                </div>

                <header>
                    <h2 className='line-clamp-2 text-lg md:text-2xl'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda expedita aliquid id ad
                        delectus. Dolorum
                    </h2>

                    <p className='line-clamp-3'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum illo sequi blanditiis repellat
                        id sapiente vel nostrum quas maiores laborum perspiciatis veritatis eveniet eius aliquid
                        possimus, explicabo, labore amet repellendus.
                    </p>
                </header>

                <div className='mt-4 flex flex-col justify-between md:mt-auto md:flex-row'>
                    <Link href={'#'}>
                        <span className='flex items-center gap-x-1 font-semibold text-secondary hover:underline hover:underline-offset-4'>
                            <span>Baca Selengkapnya</span>

                            <ArrowRightIcon className='h-4 w-4' />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
