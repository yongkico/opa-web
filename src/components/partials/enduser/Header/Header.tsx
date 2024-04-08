import { JSX } from 'react'
import Image from 'next/image'
import { AssetsBeranda } from '@/assets/index'
import { createTranslation } from '@/i18n/server'

export default async function Header(): Promise<JSX.Element> {
    const { t } = await createTranslation('home')

    return (
        <header className='relative max-h-[50rem] min-h-full overflow-hidden bg-primary pt-40 text-light dark:bg-accent lg:mt-24'>
            {/* blobs */}
            <div className='absolute -left-44 -top-44 hidden h-80 w-80 rounded-full bg-accent dark:bg-primary lg:block'></div>

            <div className='absolute -bottom-72 -right-72 hidden h-[50rem] w-[800px] rounded-full bg-accent dark:bg-primary lg:block'></div>

            <div className='container'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='mb-20 flex flex-col gap-y-8 text-center lg:w-3/4 lg:text-left'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl'>{t('header')}</h1>

                        <p>{t('subHeader')}</p>

                        <a
                            href={'/auth/register'}
                            type='button'
                            className='btn-secondary mx-auto w-max uppercase lg:mx-0'
                        >
                            {t('tombolHeader')}
                        </a>
                    </div>

                    <Image className='z-10 mx-auto' src={AssetsBeranda.asset_header_desktop} alt='Asset Header' />
                </div>
            </div>
        </header>
    )
}
