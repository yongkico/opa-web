// 'use client'

import { JSX } from 'react'
import Image from 'next/image'
import { AssetAbout } from '@/assets/index'
import Link from 'next/link'
import { createTranslation } from '@/i18n/server'

export default async function Home(): Promise<JSX.Element> {
    const { t } = await createTranslation('about')

    return (
        <>
            <main>
                {/* header section */}
                <header className='relative max-h-[50rem] min-h-full overflow-hidden pt-24 text-light'>
                    {/* dot background */}
                    <Image
                        src={AssetAbout.background}
                        alt='Asset header'
                        className='absolute top-4 -z-50 md:hidden lg:right-0 lg:top-24 lg:block'
                    />
                    {/* blobs */}
                    <div className='container p-4 lg:p-8'>
                        <div className="space-y-8 rounded-[2rem] bg-[url('/webp/asset-about-cover.webp')] bg-cover p-4 md:space-y-0 lg:p-0">
                            <header className='pt-4 md:pt-12'>
                                <h1 className='text-center text-3xl font-bold text-white sm:text-4xl md:text-6xl'>
                                    Oil Palm Assistant
                                </h1>
                            </header>

                            <div className='flex flex-col items-center gap-x-20 gap-y-4 md:flex-row'>
                                <div className='rounded-lg bg-primary/50 p-4 backdrop-blur-sm md:m-8 md:p-8 lg:mt-auto lg:p-10'>
                                    <header className='space-y-4'>
                                        <h2 className='text-lg font-bold lg:text-3xl'>{t('apaItuOpa')}</h2>

                                        <p className='pt-2 text-sm lg:text-lg'>{t('opaAdalah')}</p>
                                    </header>
                                </div>

                                <Image
                                    src={AssetAbout.manGrab}
                                    alt='Asset Header'
                                    className='hidden h-40 w-20 object-cover md:h-full md:w-96 lg:block'
                                />
                            </div>
                        </div>

                        <div>
                            <Image
                                src={AssetAbout.background_arrow}
                                alt='Background'
                                className='h-20 w-20 md:h-40 md:w-40'
                            />
                        </div>
                    </div>
                </header>
                {/* end of header section */}

                <section className='relative py-4 md:pb-24 lg:py-8 lg:pb-40'>
                    <div className='container p-4 lg:p-8'>
                        <div className='relative flex flex-col gap-x-20 gap-y-8 md:flex-row'>
                            <div className='rounded-lg bg-primary p-4 text-white md:w-1/2 lg:w-3/5 lg:p-10'>
                                <div className='lg:mb-4 lg:w-3/4'>
                                    <span className='text-lg font-bold lg:text-4xl'>{t('bagaimanaKondisi')}</span>
                                </div>
                                <p className='pt-2 text-sm md:w-5/6 lg:text-lg'>{t('saatIniLuas')}</p>
                            </div>

                            <div className='absolute -top-20 left-96 hidden md:block lg:left-[50%]'>
                                <Image src={AssetAbout.man_confuse} alt='Asset About' className='h-[75%]' />
                            </div>

                            <div className='absolute -top-20 left-96 -z-50 lg:left-0 lg:top-0'>
                                <Image src={AssetAbout.background} alt='Asset About' className='' />
                            </div>

                            <div className='top-20 rounded-lg bg-tertiary p-4 text-white md:absolute md:left-80 md:w-1/2 lg:left-[48%] lg:top-40 lg:p-10'>
                                <span className='text-lg font-bold lg:text-4xl'>{t('apaPenyebabnya')}</span>
                                <p className='pt-2 text-sm lg:text-lg'>{t('salahSatuPenyebab')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fitur Aplikasi */}
                <section id='feature' className='pb-4 pt-4 md:pb-24 lg:py-8'>
                    <div className='container p-4 lg:p-8'>
                        <header className='mb-4'>
                            <h3 className='text-center text-3xl lg:text-5xl'>{t('fiturAplikasi')}</h3>
                        </header>

                        <div className='grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-8 lg:gap-x-20'>
                            <div className='relative pt-20'>
                                <div className='absolute left-[25%] top-[5%] md:left-[15%] lg:left-[10%]'>
                                    <Image
                                        src={AssetAbout.asset_about_fitur_1}
                                        alt='Asset Fitur 1'
                                        className='h-40 w-40'
                                    />
                                </div>

                                <div className='h-full rounded-2xl bg-[#7CCC6C] px-4 pb-6 pt-24 lg:px-20 lg:pt-6 xl:aspect-[5/3]'>
                                    <div className='mb-4 text-center lg:mb-14 lg:pl-40 lg:text-left '>
                                        <span className='text-lg font-semibold text-white lg:text-xl'>
                                            {t('koleksiDanMenampilkan')}
                                        </span>
                                    </div>

                                    <p className='text-center text-white'>{t('opaAkanMencatat')}</p>
                                </div>
                            </div>

                            <div className='relative pt-20'>
                                <div className='absolute left-[25%] top-[5%] md:left-[15%] lg:left-[10%]'>
                                    <Image
                                        src={AssetAbout.asset_about_fitur_2}
                                        alt='Asset Fitur 1'
                                        className='h-40 w-40'
                                    />
                                </div>

                                <div className='h-full rounded-2xl bg-primary px-4 pb-4 pt-24 lg:px-20 lg:pt-6 xl:aspect-[5/3]'>
                                    <div className='mb-4 text-center lg:mb-14 lg:pl-48 lg:text-left '>
                                        <span className='text-lg font-semibold text-white lg:text-xl'>
                                            {t('menghitungDosisPemupukan')}
                                        </span>
                                    </div>

                                    <p className='text-center text-white'>{t('opaAkanMembantu')}</p>
                                </div>
                            </div>

                            <div className='relative pt-20'>
                                <div className='absolute left-[20%] top-[5%] md:left-[15%] lg:left-[10%]'>
                                    <Image
                                        src={AssetAbout.asset_about_fitur_3}
                                        alt='Asset Fitur 1'
                                        className='h-40 w-40'
                                    />
                                </div>

                                <div className='h-full rounded-2xl bg-secondary px-4 pb-4 pt-24 lg:px-20 lg:pt-6 xl:aspect-[5/3]'>
                                    <div className='mb-4 text-center lg:mb-14 lg:pl-40 lg:text-left '>
                                        <span className='text-lg font-semibold text-white lg:text-xl'>
                                            {t('memberikanInformasiIklim')}
                                        </span>
                                    </div>

                                    <p className='text-center text-white'>{t('opaAkanMenampilkan')}</p>
                                </div>
                            </div>

                            <div className='relative pt-20'>
                                <div className='absolute left-[20%] top-[5%] md:left-[15%] lg:left-[10%]'>
                                    <Image
                                        src={AssetAbout.asset_about_fitur_4}
                                        alt='Asset Fitur 1'
                                        className='h-40 w-40'
                                    />
                                </div>

                                <div className='h-full rounded-2xl bg-tertiary px-4 pb-4 pt-24 lg:px-20 lg:pt-6 xl:aspect-[5/3]'>
                                    <div className='mb-4 text-center lg:mb-14 lg:pl-40 lg:text-left '>
                                        <span className='text-lg font-semibold text-white'>
                                            {t('memberikanSaranTeknis')}
                                        </span>
                                    </div>

                                    <p className='text-center text-white'>{t('opaAkanMengelola')}</p>
                                </div>
                            </div>

                            <div className='relative pt-20'>
                                <div className='absolute left-[20%] top-[5%] md:left-[15%] lg:left-[10%]'>
                                    <Image
                                        src={AssetAbout.asset_about_fitur_5}
                                        alt='Asset Fitur 1'
                                        className='h-40 w-40'
                                    />
                                </div>

                                <div className='h-full rounded-2xl bg-[#9B1CFF] px-4 pb-4 pt-24 lg:px-20 lg:pb-16 lg:pt-6 xl:aspect-[5/3]'>
                                    <div className='mb-4 text-center lg:mb-14 lg:pl-40 lg:text-left '>
                                        <span className='text-lg font-semibold text-white lg:text-xl'>
                                            {t('grupDataDiskusi')}
                                        </span>
                                    </div>

                                    <p className='text-center text-white lg:pb-2'>{t('opaMemilikiFitur')}</p>
                                </div>
                            </div>

                            <div className='relative pt-20'>
                                <div className='absolute left-[20%] top-[5%] md:left-[15%] lg:left-[10%]'>
                                    <Image
                                        src={AssetAbout.asset_about_fitur_6}
                                        alt='Asset Fitur 1'
                                        className='h-40 w-40'
                                    />
                                </div>

                                <div className='h-full rounded-2xl bg-[#386CF3] px-4 pb-4 pt-24 lg:px-20 lg:pb-36 lg:pt-6 xl:aspect-[5/3]'>
                                    <div className='mb-4 text-center lg:mb-14 lg:pl-40 lg:text-left '>
                                        <span className='text-lg font-semibold text-white lg:text-xl'>
                                            {t('prediksiProduksi')}
                                        </span>
                                    </div>

                                    <p className='text-center text-white'>{t('opaDapatMemberikan')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id='team' className='pb-4 pt-4 md:pb-24 lg:py-8 lg:pb-40'>
                    <div className='container p-4 lg:p-8'>
                        <header className='mb-8 flex flex-col items-center gap-y-4  text-center md:gap-y-8'>
                            <h3 className='font-semibold uppercase text-grey md:text-2xl lg:text-4xl'>
                                {t('timPengembang')}
                            </h3>

                            <h4 className='text-2xl font-bold text-dark dark:text-light md:text-4xl lg:text-6xl'>
                                {t('kenalanDenganTim')}
                            </h4>
                        </header>

                        <div className='grid gap-x-20 gap-y-8 md:grid-cols-2'>
                            <div className='rounded-lg px-4 py-6 shadow-lg lg:py-10'>
                                <h2 className='mb-4 rounded-3xl bg-primary p-2 text-center font-semibold text-white'>
                                    {t('researchDevelopment')}
                                </h2>

                                <div className='space-y-4 text-center'>
                                    <div className='flex flex-col'>
                                        <Link
                                            href={'/profile/winarna'}
                                            className='font-bold duration-150 hover:text-secondary'
                                        >
                                            Dr. Winarna
                                        </Link>

                                        <span className='text-sm'>{t('advisor')}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <Link
                                            href={'/profile/muhdan-syahroni'}
                                            className='font-bold duration-150 hover:text-secondary'
                                        >
                                            Muhdan Syarovy, S.P., M.Sc
                                        </Link>

                                        <span className='text-sm'>{t('koordinatorPengembang')}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <Link
                                            href={'/profile/iput-pradiko'}
                                            className='font-bold duration-150 hover:text-secondary'
                                        >
                                            Iput Pradiko, S.Si., M.Si
                                        </Link>

                                        <span className='text-sm'>{t('pengembanganAgroklimatologi')}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <Link
                                            href={'/profile/rana-farrasati'}
                                            className='font-bold duration-150 hover:text-secondary'
                                        >
                                            Rana Farrasati, S.P.
                                        </Link>

                                        <span className='text-sm'>{t('pengembanganRekomendasiPupuk')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='rounded-lg px-4 py-6 shadow-lg lg:py-10'>
                                <h2 className='mb-4 rounded-3xl bg-primary p-2 text-center font-semibold text-white'>
                                    {t('pengembanganAplikasiMedsos')}
                                </h2>

                                <div className='space-y-4 text-center'>
                                    <div className='flex flex-col'>
                                        <span className='font-bold'>Arfandi Nasution, S. Kom</span>

                                        <span className='text-sm'>{t('backendDeveloper')}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='font-bold'>Yongki Hutagalung, S. Kom</span>

                                        <span className='text-sm'>{t('server')}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='font-bold'>Mukhes Sri Muna, S.T.P., M.Sc</span>

                                        <span className='text-sm'>{t('qualityAssurance')}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='font-bold'>SSDIGITAL</span>

                                        <span className='text-sm'>{t('frontendDevloper')}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='font-bold'>Focaloom Studio</span>

                                        <span className='text-sm'>{t('medsosDesainGrafis')}</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='font-bold'>{t('timTransformasiBisnis')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
