import { JSX } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/client'

type Props = {
    id: string
    image: string
    title: string
    path: string
}

export default function SecondaryCard({ image, title, id, path }: Props): JSX.Element {
    // translation
    const { t } = useTranslation('detailArticle')

    return (
        <div className='apply-dark relative text-light hover:bg-light hover:dark:bg-dark md:flex md:p-2 md:text-dark'>
            <img
                src={image}
                alt={title}
                className='aspect-square w-full rounded-lg object-cover md:aspect-video md:w-1/3'
            />
            <Link
                href={`/${path}/${id}`}
                className='absolute inset-x-0 bottom-0 rounded-b-xl bg-primary/20 p-4 backdrop-blur-sm md:static md:flex md:flex-col md:bg-transparent md:p-2'
            >
                <div>
                    <header className=''>
                        <h3 className='line-clamp-2 md:text-sm lg:text-base'>{title}</h3>
                    </header>

                    <span className='mt-auto hidden text-xs text-secondary md:block'>{t('bacaSelengkapnya')}</span>
                </div>
            </Link>
        </div>
    )
}
