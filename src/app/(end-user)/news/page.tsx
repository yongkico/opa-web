'use client'

import { JSX } from 'react'
import Link from 'next/link'
import { Category } from '@/@types'
import SecondaryCard from '@/components/partials/enduser/Cards/SecondaryCard'
import MainCardNews from '@/components/partials/enduser/Cards/MainCardNews'
import { newsStore } from '@/store/enduser/newsStore'
import { useEffectOnce } from 'usehooks-ts'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel'
import { News, NewsSubCategory } from '@/@types/News'
import { Pagination, Skeleton, Spinner } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from '@/i18n/client'

export default function News(): JSX.Element {
    // translation
    const { t } = useTranslation('news')

    // params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    // global states
    const { isFetching, news, categories, subCategories, fetchNews, fetchCategories, fetchSubCategories } = newsStore()

    useEffectOnce(() => {
        fetchNews()
        fetchCategories()
        fetchSubCategories()
    })

    return (
        <main>
            <header className='pt-24'>
                <div className='container p-4 lg:p-8'>
                    <div className='flex flex-col gap-4 lg:flex-row'>
                        <div className='lg:w-4/5'>
                            {news.data?.length === 0 ? (
                                <Skeleton>
                                    <div className='aspect-video rounded-lg'></div>
                                </Skeleton>
                            ) : (
                                <Carousel
                                    opts={{
                                        loop: true,
                                    }}
                                >
                                    <CarouselContent>
                                        {news.data?.slice(0, 4)?.map((news: News, index: number) => (
                                            <CarouselItem key={`news-${index}`}>
                                                <div className='relative rounded-lg bg-accent'>
                                                    <img
                                                        src={news.banner_image_url}
                                                        alt={news.title}
                                                        className='aspect-video w-full rounded-lg object-contain object-center'
                                                    />

                                                    <div className='pill-primary absolute left-4 top-4'>
                                                        {news.news_category_name}
                                                    </div>

                                                    <Link
                                                        href={`/news/${news.id}`}
                                                        className='absolute inset-x-0 bottom-0 rounded-b-xl bg-primary/50 p-4 backdrop-blur-sm lg:p-8'
                                                    >
                                                        <header className='text-white'>
                                                            <h1 className='line-clamp-2 text-base sm:text-lg md:text-4xl'>
                                                                {news.title}
                                                            </h1>
                                                        </header>
                                                    </Link>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    <CarouselPrevious className='h-12 w-12 border-none bg-dark/75 text-light' />

                                    <CarouselNext className='h-12 w-12 border-none bg-dark/75 text-light' />
                                </Carousel>
                            )}
                        </div>

                        <div className='flex grid-cols-1 gap-4 overflow-x-scroll pb-2 lg:grid lg:w-1/5'>
                            {news.data?.length === 0 && (
                                <>
                                    {Array(4)
                                        .fill(0)
                                        .map((_, index) => (
                                            <Skeleton key={`skeleton-${index}`}>
                                                <div className='aspect-video rounded-lg lg:aspect-auto lg:h-[8rem]'></div>
                                            </Skeleton>
                                        ))}
                                </>
                            )}

                            {news.data?.slice(0, 4)?.map((news: News, _index: number) => (
                                <div className='relative min-w-3/4' key={`item-${news.id}`}>
                                    <img
                                        src={news.banner_image_url}
                                        alt={news.title}
                                        className='aspect-[16/8] h-full w-full rounded-lg object-cover'
                                    />

                                    <Link
                                        href={`/news/${news.id}`}
                                        className='absolute inset-x-0 bottom-0 rounded-b-xl bg-primary/20 p-4 backdrop-blur-sm'
                                    >
                                        <header className='text-white'>
                                            <h2 className='line-clamp-1 text-sm sm:text-xl lg:text-sm'>{news.title}</h2>
                                        </header>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* categories section */}
            <section>
                <div className='container p-4 lg:p-8'>
                    <div className='apply-dark flex min-w-full justify-around gap-x-4 overflow-x-scroll border-y py-4 md:w-1/2 lg:px-28'>
                        <button
                            onClick={() => {
                                fetchNews('1', '8')

                                params.delete('category_id')
                                params.delete('subcategory_id')
                                window.history.pushState(null, '', `?${params.toString()}`)
                            }}
                            className={`${
                                !params.get('category_id') && 'text-secondary'
                            } whitespace-nowrap font-semibold hover:text-secondary`}
                        >
                            {t('semua')}
                        </button>

                        {categories?.map((category: Category, index: number) => (
                            <button
                                onClick={() => {
                                    fetchNews('1', '8', category.id.toString())

                                    params.delete('subcategory_id')
                                    params.set('category_id', category.id.toString())
                                    window.history.pushState(null, '', `?${params.toString()}`)
                                }}
                                key={`category-${index}`}
                            >
                                <span
                                    className={`${
                                        params.get('category_id') === category.id.toString()
                                            ? 'text-secondary'
                                            : 'hover:text-secondary'
                                    } whitespace-nowrap font-semibold`}
                                >
                                    {category.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            {/* end of categories section */}

            {/* mobile layout */}
            <section className='py-4 md:hidden lg:pb-8'>
                <div className='container p-4 lg:p-8'>
                    <div className='flex flex-col gap-y-4'>
                        {/* popular news */}
                        <div>
                            <header className='mb-4'>
                                <h3 className='text-xl md:text-3xl'>{t('beritaPopuler')}</h3>
                            </header>

                            <div className='grid grid-cols-2 gap-4 md:grid-cols-1'>
                                {news.data
                                    ?.slice(0, 4)
                                    .map((news: News, index: number) => (
                                        <SecondaryCard
                                            path='news'
                                            image={news.banner_image_url}
                                            title={news.title}
                                            key={`news-${index}`}
                                            id={news.id}
                                        />
                                    ))}
                            </div>
                        </div>
                        {/* end of popular news */}

                        {/* advertisement 1 */}
                        <div className=''>
                            <div className='flex h-72 items-center justify-center rounded-lg bg-gray-300'>
                                <p>{t('iklanDisini')}</p>
                            </div>
                        </div>
                        {/* end of advertisement 1 */}

                        {/* sub categories */}
                        <div>
                            <header className='mb-4'>
                                <h3 className='text-xl md:text-3xl'>{t('subKategori')}</h3>
                            </header>

                            <div className='flex justify-between gap-x-4 overflow-x-scroll py-4 md:p-6 lg:px-28'>
                                {subCategories?.map((subcategory: NewsSubCategory) => (
                                    <button
                                        key={`subcategory-${subcategory.id}`}
                                        onClick={() => {
                                            fetchNews('1', '8', '', subcategory.id.toString())

                                            params.delete('category_id')
                                            params.set('subcategory_id', subcategory.id.toString())
                                            window.history.pushState(null, '', `?${params.toString()}`)
                                        }}
                                        className='pill-secondary hover:text-semibold whitespace-nowrap'
                                    >
                                        {subcategory.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* end of sub categories */}

                        {/* main news */}
                        <div className='relative space-y-4'>
                            {isFetching && (
                                <div className='absolute inset-0 z-30 flex h-full justify-center rounded-2xl bg-white/10 backdrop-blur-sm'>
                                    <Spinner size='lg' />
                                </div>
                            )}

                            {news.data?.map((news: News, index: number) => (
                                <MainCardNews
                                    id={news.id}
                                    key={`news-${index}`}
                                    image={news.banner_image_url}
                                    title={news.title}
                                    category={news.news_category_name}
                                    content={news.content}
                                />
                            ))}

                            {/* pagination */}
                            {news.data && (
                                <div className='flex flex-col items-center justify-between gap-4 py-4 lg:flex-row lg:py-8'>
                                    <p className='text-sm'>
                                        Showing {news.pagination?.from} to {news.pagination?.to} of{' '}
                                        {news.pagination?.total} entries
                                    </p>

                                    <div className='flex items-center gap-x-2'>
                                        <Pagination
                                            onChange={(page) => {
                                                params.set('page', page.toString())
                                                window.history.pushState(null, '', `?${params.toString()}`)

                                                fetchNews(page.toString(), '8')
                                            }}
                                            classNames={{
                                                item: 'bg-primary/10',
                                            }}
                                            total={Math.ceil(news.pagination?.total! / news.pagination?.per_page!) || 1}
                                            initialPage={1}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* end of main news */}

                        {/* advertisement 2 */}
                        <div className=''>
                            <div className='flex h-72 items-center justify-center rounded-lg bg-gray-300'>
                                <p>{t('iklanDisini')}</p>
                            </div>
                        </div>
                        {/* end of advertisement 2 */}
                    </div>
                </div>
            </section>
            {/* end of mobile layout */}

            {/* tablet and desktop layout */}
            <section className='hidden md:block'>
                <div className='container p-4 lg:p-8'>
                    <div className='flex md:gap-x-4 lg:gap-x-8'>
                        {/* main news */}
                        <div className='relative md:w-3/5 lg:w-2/3'>
                            <div className='md:flex md:flex-col md:gap-y-12'>
                                {isFetching && (
                                    <div className='absolute inset-0 flex h-full justify-center rounded-2xl bg-white/10 backdrop-blur-sm'>
                                        <Spinner size='lg' />
                                    </div>
                                )}

                                {news.data?.map((news: News, index: number) => (
                                    <MainCardNews
                                        id={news.id}
                                        key={`news-${index}`}
                                        image={news.banner_image_url}
                                        title={news.title}
                                        category={news.news_category_name}
                                        content={news.content}
                                    />
                                ))}

                                {/* pagination */}
                                {news.data && (
                                    <div className='flex flex-col items-center justify-between gap-4 p-4 lg:flex-row lg:p-8'>
                                        <p className='text-sm'>
                                            Showing {news.pagination?.from} to {news.pagination?.to} of{' '}
                                            {news.pagination?.total} entries
                                        </p>

                                        <div className='flex items-center gap-x-2'>
                                            <Pagination
                                                onChange={(page) => {
                                                    params.set('page', page.toString())
                                                    window.history.pushState(null, '', `?${params.toString()}`)

                                                    fetchNews(page.toString(), '8')
                                                }}
                                                classNames={{
                                                    item: 'bg-primary/10',
                                                }}
                                                total={
                                                    Math.ceil(news.pagination?.total! / news.pagination?.per_page!) || 1
                                                }
                                                initialPage={1}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* end of main news */}

                        <aside className='md:w-2/5 md:space-y-12 lg:w-1/3'>
                            {/* popular news */}
                            <div>
                                <header className='mb-4'>
                                    <h3 className='text-xl md:text-2xl'>{t('beritaPopuler')}</h3>
                                </header>

                                <div className='md:grid md:grid-cols-1 md:gap-4'>
                                    {news.data
                                        ?.slice(0, 4)
                                        .map((news: News, index: number) => (
                                            <SecondaryCard
                                                path='news'
                                                key={`news-${index}`}
                                                image={news.banner_image_url}
                                                title={news.title}
                                                id={news.id}
                                            />
                                        ))}
                                </div>
                            </div>
                            {/* end of popular news */}

                            {/* sub categories */}
                            <div>
                                <header className='mb-4'>
                                    <h3 className='text-xl md:text-2xl'>{t('subKategori')}</h3>
                                </header>

                                <div className='gap-4 md:flex md:flex-wrap'>
                                    {subCategories?.map((subcategory: NewsSubCategory, index: number) => (
                                        <button
                                            onClick={() => {
                                                fetchNews('1', '8', '', subcategory.id.toString())

                                                params.delete('category_id')
                                                params.set('subcategory_id', subcategory.id.toString())
                                                window.history.pushState(null, '', `?${params.toString()}`)

                                                window.scrollTo(0, 600)
                                            }}
                                            key={`category-${index}`}
                                            className='pill-secondary text-sm'
                                        >
                                            <span>{subcategory.name}</span>
                                        </button>
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

                            {/* advertisement 2 */}
                            <div className=''>
                                <div className='flex h-72 items-center justify-center rounded-lg bg-gray-300'>
                                    <p>{t('iklanDisini')}</p>
                                </div>
                            </div>
                            {/* end of advertisement 2 */}
                        </aside>
                    </div>
                </div>
            </section>
            {/* end of tablet and desktop layout */}
        </main>
    )
}
