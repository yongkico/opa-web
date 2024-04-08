import { JSX } from 'react'
import { AssetProfile } from '@/assets/index'
import Image from 'next/image'
import Head from 'next/head'

export default function Index(): JSX.Element {
    return (
        <>
            <Head>
                <title>Dr. Winarna - Oil Palm Assistant (OPA)</title>
            </Head>

            <main>
                <section className='pb-4 pt-20 md:pb-24 lg:py-8 lg:pb-64 lg:pt-40 '>
                    <div className='container gap-x-10 md:flex'>
                        <div className='mb-4 flex justify-center overflow-hidden rounded-lg bg-primary'>
                            <Image src={AssetProfile.profile} alt='Asset Profile' className='object-cover' />
                        </div>
                        <div>
                            <h1 className='my-8 text-center text-2xl md:mt-0 md:text-left lg:text-4xl'>Dr. Winarna</h1>
                            <div className='flex flex-col gap-y-4'>
                                <div className=''>
                                    <div>
                                        <span className='text-lg font-bold lg:text-xl'>Pendidikan</span>
                                    </div>
                                    <div className='flex flex-col text-sm text-grey lg:text-base'>
                                        <span>S1, Program Ilmu Tanah, Universitas Gadjah Mada, 1998</span>
                                        <span>S2, Ilmu Tanah, Universitas Gadjah Mada, 2007</span>
                                        <span>S3, ilmu Tanah, Institut Pertanian Bogor, 2015</span>
                                    </div>
                                </div>

                                <div className=''>
                                    <div>
                                        <span className='text-lg font-bold lg:text-xl'>Bidang Kepakaran</span>
                                    </div>

                                    <span className='text-sm text-grey lg:text-base'>
                                        {' '}
                                        Ilmu Tanah, Agroklimatologi dan Hidrologi
                                    </span>
                                </div>

                                <div className=''>
                                    <div>
                                        <span className='text-lg font-bold lg:text-xl'>Jabatan Fungsional</span>
                                    </div>
                                    <span className='text-sm text-grey lg:text-base'> Peneliti Ahli Madya</span>
                                </div>

                                <div className=''>
                                    <div>
                                        <span className='text-lg font-bold lg:text-xl'>Jabatan Struktural</span>
                                    </div>
                                    <span className='text-sm text-grey lg:text-base'> Ka. Bagian Usaha</span>
                                </div>

                                <div className=''>
                                    <div>
                                        <span className='text-lg font-bold '>Email</span>
                                    </div>
                                    <span className='text-sm text-grey lg:text-base'> - </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}