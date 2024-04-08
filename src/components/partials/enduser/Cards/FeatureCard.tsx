import { JSX } from 'react'
import { FeatureCard } from '@/@types'
import { AssetsBeranda } from '@/assets'
import Image from 'next/image'
import { createTranslation } from '@/i18n/server'

export default async function FeatureCard(): Promise<JSX.Element> {
    const { t } = await createTranslation('home')

    return (
        <>
            <div className='relative h-full rounded-lg bg-[#7CCC6C] p-4 pt-24 shadow-lg sm:pt-28 md:p-8 md:pt-32'>
                <Image
                    className='absolute inset-0 -top-8 mx-auto max-h-28 object-contain md:max-h-36 lg:-top-14'
                    src={AssetsBeranda.asset_feature_1}
                    alt='Asset Feature'
                />

                <p className='font-bold text-light sm:text-xl md:text-2xl'>{t('gambar1')}</p>
            </div>

            <div className='relative h-full rounded-lg bg-[#4AC9E3] p-4 pt-24 shadow-lg sm:pt-28 md:p-8 md:pt-32'>
                <Image
                    className='absolute inset-0 -top-8 mx-auto max-h-28 object-contain md:max-h-36 lg:-top-14'
                    src={AssetsBeranda.asset_feature_2}
                    alt='Asset Feature'
                />

                <p className='font-bold text-light sm:text-xl md:text-2xl'>{t('gambar2')}</p>
            </div>

            <div className='relative h-full rounded-lg bg-[#FF8F1C] p-4 pt-24 shadow-lg sm:pt-28 md:p-8 md:pt-32'>
                <Image
                    className='absolute inset-0 -top-8 mx-auto max-h-28 object-contain md:max-h-36 lg:-top-14'
                    src={AssetsBeranda.asset_feature_3}
                    alt='Asset Feature'
                />

                <p className='font-bold text-light sm:text-xl md:text-2xl'>{t('gambar3')}</p>
            </div>

            <div className='relative h-full rounded-lg bg-[#F35A38] p-4 pt-24 shadow-lg sm:pt-28 md:p-8 md:pt-32'>
                <Image
                    className='absolute inset-0 -top-8 mx-auto max-h-28 object-contain md:max-h-36 lg:-top-14'
                    src={AssetsBeranda.asset_feature_4}
                    alt='Asset Feature'
                />

                <p className='font-bold text-light sm:text-xl md:text-2xl'>{t('gambar4')}</p>
            </div>
        </>
    )
}
