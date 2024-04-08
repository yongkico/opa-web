import { JSX } from 'react'
import Link from 'next/link'
import { Article } from '@/@types/Article'
import { createTranslation } from '@/i18n/server'

export default async function ArticleCard({ article }: { article: Article }): Promise<JSX.Element> {
    // translation
    const { t } = await createTranslation('article')

    return (
        <div className='apply-dark flex h-full flex-col rounded-lg bg-white shadow-lg duration-150'>
            <img
                className='aspect-video w-full rounded-t-xl object-cover'
                src={article.banner_image_url}
                alt='Asset News'
            />

            <div className='flex flex-col justify-center gap-y-2 p-2 md:gap-y-6 lg:p-6'>
                <div className='flex justify-between'>
                    <p className='text-xs md:text-sm'>{article.article_category_name}</p>

                    <p className='text-xs md:text-sm'>{article.created_at}</p>
                </div>

                <p className='line-clamp-2 text-xl font-bold md:text-2xl'>{article.title}</p>

                <p className='line-clamp-3 text-sm md:text-base'>{article.content.replace(/<[^>]+>/g, '')}</p>

                <Link className='self-end' href={`/articles/${article.id}`}>
                    <span className='text-xs font-semibold text-primary hover:text-accent md:text-base'>
                        {t('bacaSelengkapnya')}
                    </span>
                </Link>
            </div>
        </div>
    )
}
