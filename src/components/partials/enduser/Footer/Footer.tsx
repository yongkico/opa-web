import { JSX } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import { AssetsBeranda } from '@/assets'
import Logo from '../../Logo'
import { useTranslation } from '@/i18n/client'

export default function Footer(): JSX.Element {
    const { t } = useTranslation('footer')

    return (
        <footer className='bg-primary py-8 text-white lg:py-16'>
            <div className='container p-4 lg:p-8'>
                <div className='flex flex-col items-center gap-y-16 lg:flex-row lg:justify-between'>
                    <div className='order-3 space-y-4 text-center text-xs font-normal md:text-base lg:order-none lg:text-left'>
                        <Logo className='mx-auto w-32 lg:mx-0' dark />

                        <p>{t('produkDariPpks')}</p>

                        <p>{t('alamat')} </p>

                        <a
                            className='inline-block space-x-2'
                            href='mailto:admin@opa.co.id'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <EnvelopeIcon className='inline h-6 w-6' />

                            <span>admin@opa.co.id</span>
                        </a>
                    </div>

                    <div>
                        <ul className='space-y-4 text-center lg:text-left'>
                            <li>
                                <Link href={'/about'}>
                                    <span className='underline-offset-4 hover:underline'>{t('tentangOpa')}</span>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/about/#team'}>
                                    <span className='underline-offset-4 hover:underline'>{t('timPengembang')}</span>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/faq'}>
                                    <span className='underline-offset-4 hover:underline'>{t('faq')}</span>
                                </Link>
                            </li>

                            <li>
                                <Link href={'/terms-and-conditions'}>
                                    <span className='underline-offset-4 hover:underline'>{t('syaratKetentuan')}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='space-y-6'>
                        <p className='text-center text-xl font-semibold'>{t('mariTerhubung')}</p>
                        <ul className='flex items-center gap-x-8'>
                            <li>
                                <a
                                    href='https://www.facebook.com/people/OPA-John/100095341272820/?mibextid=LQQJ4d'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <Image src={AssetsBeranda.asset_facebook} alt='Asset Facebook' />
                                </a>
                            </li>

                            <li>
                                <a
                                    href='https://www.instagram.com/opabyppks/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <Image src={AssetsBeranda.asset_instagram} alt='Asset Instagram' />
                                </a>
                            </li>

                            <li>
                                <a href='https://www.youtube.com/@opabyppks' target='_blank' rel='noopener noreferrer'>
                                    <Image src={AssetsBeranda.asset_youtube} alt='Asset Youtube' />
                                </a>
                            </li>

                            <li>
                                <a href='https://www.tiktok.com/@opabyppks' target='_blank' rel='noopener noreferrer'>
                                    <Image src={AssetsBeranda.asset_tiktok} alt='Asset Tiktok' />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
