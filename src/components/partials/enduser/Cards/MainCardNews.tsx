import { JSX } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/client'
type Props = {
    id: string
    image: string
    category: string
    title: string
    content: string
}

export default function MainCardNews({ image, category, title, content, id }: Props): JSX.Element {
    // translation
    const { t } = useTranslation('news')

    return (
        <div className='apply-dark flex gap-x-4 rounded-lg p-2 hover:bg-light hover:dark:bg-dark'>
            <img src={image} alt={title} className='aspect-video w-2/5 rounded-lg bg-primary/25 object-contain' />

            <div className='flex flex-col'>
                <div className='pill-primary px-4 py-0 text-xs md:py-1'>
                    <span>{category} </span>
                </div>

                <header className='mt-auto space-y-1 md:space-y-2 lg:space-y-4'>
                    <h3 className='line-clamp-1 xl:text-2xl'>{title}</h3>

                    <p className='line-clamp-1 text-xs md:line-clamp-2'>{content.replace(/<[^>]+>/g, '')}</p>
                </header>

                <Link className='mt-auto  text-xs  text-secondary lg:text-sm' href={`/news/${id}`}>
                    <span>{t('bacaSelengkapnya')}</span>
                </Link>
            </div>
        </div>
    )
}
