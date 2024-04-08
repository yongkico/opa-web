import { JSX } from 'react'
import Image from 'next/image'
import { AssetFaq } from '@/assets/index'
import { createTranslation } from '@/i18n/server'

export default async function Faq(): Promise<JSX.Element> {
    // translation
    const { t } = await createTranslation('faq')

    return (
        <main>
            <header className='relative overflow-hidden pt-20'>
                <div className="bg-[url('/webp/asset-faq-cover.webp')] bg-cover pt-10">
                    <div className='container'>
                        <div className='flex flex-col items-center justify-between gap-y-4 text-center text-white md:flex-row md:text-left'>
                            <div className='flex flex-col gap-y-4'>
                                <h1 className='text-4xl lg:text-6xl'>{t('yangSeringDitanyakan')}</h1>
                                <span className='lg:text-2xl'>{t('opaAkanMenjawab')}</span>
                                <span className='font-semibold text-tertiary underline lg:text-2xl'>
                                    {t('tanyaOpa')}
                                </span>
                            </div>
                            <Image
                                src={AssetFaq.man_confuse}
                                alt='Asset Faq'
                                className='h-40 w-40 object-cover md:h-64 md:w-52 lg:h-80 lg:w-96'
                            />
                        </div>
                    </div>
                </div>
            </header>

            <section className='py-4 lg:py-8'>
                <div className='container'>
                    <div className='space-y-4 text-grey md:space-y-6 lg:space-y-8'>
                        <div className='space-y-2'>
                            <span className='mb-2 font-bold text-tertiary md:text-lg lg:text-xl'>{t('apaItuOpa')}</span>
                            <p className='text-sm md:text-base lg:text-lg'>{t('opaAdalah')}</p>
                        </div>

                        <div className='space-y-2'>
                            <span className='mb-2 font-bold text-tertiary md:text-lg lg:text-xl'>
                                {t('bagaimanaAplikasiOpaBekerja')}
                            </span>
                            <p className='text-sm md:text-base lg:text-lg'>{t('aplikasiIniMengumpulkan')}</p>
                        </div>

                        <div className='space-y-2'>
                            <span className='mb-2 font-bold text-tertiary md:text-lg lg:text-xl'>
                                {t('bagaimanCaraMendaftar')}
                            </span>
                            <p className='text-sm md:text-base lg:text-lg'>{t('untukMendaftarAkun')}</p>
                            <div className='flex flex-col gap-y-2'>
                                <span>{t('cara1')}</span>
                                <span>{t('cara2')}</span>
                                <span>{t('cara3')}</span>
                                <span>{t('cara4')}</span>
                                <span>{t('cara5')}</span>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <span className='mb-2 font-bold text-tertiary md:text-lg lg:text-xl'>
                                {t('apaSajaFitur')}
                            </span>
                            <p className='text-sm md:text-base lg:text-lg'>{t('terdapatFitur')}</p>
                            <div className='flex flex-col gap-y-2'>
                                <span>{t('fitur1')}</span>
                                <span>{t('fitur2')}</span>
                                <span>{t('fitur3')}</span>
                                <span>{t('fitur4')}</span>
                                <span>{t('fitur5')}</span>
                                <span>{t('fitur6')}</span>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <span className='mb-2 font-bold text-tertiary md:text-lg lg:text-xl'>
                                {t('bagaimanaCaraPenggunaanFitur')}
                            </span>
                            <p className='text-sm md:text-base lg:text-lg'>{t('andaAkanDisediakan')}</p>
                        </div>

                        <div className='space-y-2'>
                            <span className='mb-2 font-bold text-tertiary md:text-lg lg:text-xl'>
                                {t('apakahOpaDapatDiakses')}
                            </span>
                            <p className='text-sm md:text-base lg:text-lg'>{t('opaDapatDiakses')}</p>
                        </div>

                        <div className='space-y-2'>
                            <span className='mb-2 font-bold text-tertiary md:text-lg lg:text-xl'>
                                {t('apakahAdaDukungan')}
                            </span>
                            <p className='text-sm md:text-base lg:text-lg'>{t('tentuSajaAdaDukungan')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
