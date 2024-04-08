'use client'

import { JSX } from 'react'
import { Category, SubCategory } from '@/@types'
import Link from 'next/link'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import SecondaryCard from '@/components/partials/enduser/Cards/SecondaryCard'
import { Article } from '@/@types/Article'
import { useParams } from 'next/navigation'
import { useEffectOnce } from 'usehooks-ts'
import { articleStore } from '@/store/enduser/articleStore'
import { useTranslation } from '@/i18n/client'

export default function ArticleDetail(): JSX.Element {
    // translation
    const { t } = useTranslation('detailArticle')

    // params
    const params = useParams()

    // global states
    const {
        article,
        initialArticles,
        categories,
        subCategories,
        fetchArticle,
        fetchArticles,
        fetchCategories,
        fetchSubCategories,
    } = articleStore()

    useEffectOnce(() => {
        fetchArticles()
        fetchArticle(params.id as string)
        fetchCategories()
        fetchSubCategories()
    })

    return (
        <main>
            {/* categories section */}
            <section className='pt-24'>
                <div className='flex justify-between gap-x-4 overflow-x-scroll bg-primary py-4 md:gap-x-8 md:p-6 lg:px-28'>
                    {categories?.map((category: Category, index: number) => (
                        <Link key={`category-${index}`} href={'/articles'}>
                            <span className='hover:text-semibold whitespace-nowrap p-2 text-white hover:text-secondary'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
            {/* end of categories section */}

            <header>
                <div className='container p-4 lg:p-8'>
                    <div className='relative'>
                        <img
                            src={article.banner_image_url}
                            alt={article.title}
                            className='aspect-video w-full rounded-lg object-cover'
                        />

                        <div className='pill-primary absolute left-4 top-4 rounded px-4 py-0 text-sm md:px-8 md:py-2'>
                            <span>{article.article_category_name}</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className=''>
                <div className='container px-4 lg:p-8'>
                    <div className='flex flex-col md:flex-row md:gap-x-4 lg:gap-x-8'>
                        <div className='md:w-3/5 lg:w-2/3'>
                            <div className='flex flex-col gap-y-4'>
                                <header>
                                    <h1 className=''>{article.title}</h1>
                                </header>

                                {/* author and published date */}
                                <div className=''>
                                    <div className='flex gap-x-2'>
                                        <p className='text-grey'>{t('ditulisOleh')}</p>

                                        <div className='flex items-center gap-x-2'>
                                            <UserCircleIcon className='h-4 w-4' />
                                            <span>{article.created_by}</span>
                                        </div>
                                    </div>

                                    <div className='flex gap-x-2'>
                                        <p className='text-xs text-grey'>
                                            {t('terakhirDiperbarui')}{' '}
                                            <span className='text-secondary'>
                                                {article.updated_at || article.created_at}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                {/* end of author and published date */}

                                {/* article content */}
                                <div className='apply-dark prose min-w-full overflow-x-auto'>
                                    <article dangerouslySetInnerHTML={{ __html: article.content }}></article>
                                </div>
                                {/* end of article content */}
                            </div>
                        </div>

                        {/* mobile layout */}
                        <div className='flex flex-col gap-y-4 md:hidden'>
                            {/* popular articles */}
                            <div>
                                <header className='mb-4'>
                                    <h3 className='text-xl md:text-3xl'>{t('artikelPopuler')}</h3>
                                </header>

                                <div className='grid grid-cols-2 gap-4 md:grid-cols-1'>
                                    {initialArticles.data
                                        ?.slice(9, 13)
                                        ?.map((article: Article, index: number) => (
                                            <SecondaryCard
                                                id={article.id}
                                                key={`item-${index}`}
                                                image={article.banner_image_url}
                                                title={article.title}
                                                path='articles'
                                            />
                                        ))}
                                </div>
                            </div>
                            {/* end of popular articles */}

                            {/* sub categories */}
                            <div>
                                <header className='mb-4'>
                                    <h3 className='text-xl md:text-3xl'>{t('subKategori')}</h3>
                                </header>

                                <div className='flex justify-between gap-x-4 overflow-x-scroll py-4 md:p-6 lg:px-28'>
                                    {categories?.map((category: Category, index: number) => (
                                        <Link key={`category-${index}`} href={'/articles'}>
                                            <span className='pill-secondary hover:text-semibold whitespace-nowrap hover:text-secondary'>
                                                {category.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* end of sub categories */}

                            {/* advertisement 2 */}
                            <div className='mb-20'>
                                <div className='flex h-72 items-center justify-center rounded-lg bg-gray-300'>
                                    <p>{t('iklanDisini')}</p>
                                </div>
                            </div>
                            {/* end of advertisement 2 */}
                        </div>
                        {/* end of mobile layout */}

                        <aside className='hidden md:block md:w-2/5 md:space-y-12 lg:w-1/3'>
                            {/* popular articles */}
                            <div>
                                <header className='mb-4'>
                                    <h3 className='text-xl md:text-2xl'>{t('artikelPopuler')}</h3>
                                </header>

                                <div className='md:grid md:grid-cols-1 md:gap-4'>
                                    {initialArticles.data
                                        ?.slice(5)
                                        ?.map((article: Article, index: number) => (
                                            <SecondaryCard
                                                path='articles'
                                                id={article.id}
                                                key={`item-${index}`}
                                                image={article.banner_image_url}
                                                title={article.title}
                                            />
                                        ))}
                                </div>
                            </div>
                            {/* end of popular articles */}

                            {/* sub categories */}
                            <div>
                                <header className='mb-4'>
                                    <h3 className='text-xl md:text-2xl'>{t('subKategori')}</h3>
                                </header>

                                <div className='gap-4 md:flex md:flex-wrap'>
                                    {subCategories?.map((subcategory: SubCategory, index: number) => (
                                        <Link
                                            href={'/articles'}
                                            key={`category-${index}`}
                                            className='pill-secondary text-sm'
                                        >
                                            <span>{subcategory.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* end of sub categories */}

                            {/* advertisement 1 */}
                            <div className=''>
                                <div className='flex h-72 items-center justify-center rounded-lg bg-gray-300'>
                                    <p>{t('iklanDisini')}</p>
                                </div>
                            </div>
                            {/* end of advertisement 1 */}
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    )
}
