import { JSX } from 'react'
import Link from 'next/link'
import { News } from '@/@types/News'
import { Image } from '@nextui-org/react'
import { createTranslation } from '@/i18n/server'

export default async function NewsCard({ news }: { news: News }): Promise<JSX.Element> {
    // translation
    const { t } = await createTranslation('news')

    return (
        <div className='apply-dark flex flex-col gap-x-24 gap-y-4 rounded-lg duration-150 lg:flex-row'>
            <Image
                removeWrapper
                className='aspect-video w-full rounded-lg bg-primary/25 object-contain lg:w-1/2'
                src={news.banner_image_url}
                alt='Asset News'
            />

            <div className='flex max-w-xl flex-col justify-center gap-y-2.5 p-2 lg:w-1/2 lg:gap-y-8'>
                <div className='pill-primary'>{news.news_category_name}</div>

                <p className='text-xl font-bold'>{news.title}</p>

                <p className='line-clamp-2'>{news.content.replace(/<[^>]+>/g, '')}</p>

                <Link href={`/news/${news.id}`}>
                    <span className='text-[#E2BC82] hover:text-secondary'>{t('bacaSelengkapnya')}</span>
                </Link>
            </div>
        </div>
    )
}
