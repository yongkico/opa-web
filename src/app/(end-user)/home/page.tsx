import Link from 'next/link'
import FeatureCard from '@/components/partials/enduser/Cards/FeatureCard'
import Header from '@/components/partials/enduser/Header'
import Image from 'next/image'
import { AssetsBeranda } from '@/assets'
import Marquee from 'react-fast-marquee'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/Carousel'
import { findAll } from '@/modules/enduser/newsModule'
import { findAll as findAllArticles } from '@/modules/enduser/articleModule'
import NewsCard from '@/components/partials/enduser/Cards/NewsCard'
import ArticleCard from '@/components/partials/enduser/Cards/ArticleCard'
import { News } from '@/@types/News'
import { Article } from '@/@types/Article'
import { createTranslation } from '@/i18n/server'

const fetchData = async () => {
    const newsRes = await findAll()
    const articlesRes = await findAllArticles()

    return { news: newsRes.data, articles: articlesRes.data }
}

export default async function Home(): Promise<JSX.Element> {
    const { news, articles }: { news: News[]; articles: Article[] } = await fetchData()

    const { t } = await createTranslation('home')

    return (
        <>
            <div className='apply-dark'>
                {/* header section */}
                <Header />
                {/* end of header section */}

                {/* app feature section */}
                <section className='py-4 lg:py-8'>
                    <div className='container p-4 lg:p-8'>
                        <header className='mb-24'>
                            <h2 className='text-center text-2xl md:mb-16 md:text-4xl lg:text-left'>
                                {t('fiturAplikasi')}
                            </h2>
                        </header>

                        <div className='grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-8'>
                            <FeatureCard />
                        </div>

                        <div className='mt-8 flex justify-center lg:justify-end'>
                            <a href={'/about#feature'}>
                                <span className='text-lg font-semibold text-primary'>{t('selengkapnya')}</span>
                            </a>
                        </div>
                    </div>
                </section>
                {/* end of app feature section */}

                {/* app trial section */}
                <section className='py-4 lg:pb-8'>
                    <div className='container p-4 lg:p-8'>
                        <div className='flex flex-col items-center gap-x-8 gap-y-4 rounded-lg bg-[#F6F6F6] px-12 pt-12 shadow-lg dark:bg-accent lg:flex-row lg:justify-between lg:px-16 lg:pt-0'>
                            <header className='space-y-4 text-center lg:order-2'>
                                <h2 className='text-3xl font-bold lg:text-5xl'>{t('cobaOpaHeader')}</h2>

                                <p className='lg:text-lg'>{t('cobaOpaSubheader')}</p>
                            </header>

                            <a
                                href={'/auth/register'}
                                className='btn-secondary whitespace-nowrap uppercase lg:order-3 lg:px-12 lg:py-4'
                            >
                                {t('daftarGratis')}
                            </a>

                            <Image
                                className='w-36 lg:order-1 lg:w-64'
                                src={AssetsBeranda.asset_tryapp}
                                alt='Asset Try App'
                            />
                        </div>
                    </div>
                </section>
                {/* end of app trial section */}

                {/* news section */}
                <section className='py-4 lg:py-8'>
                    <div className='container space-y-16 p-4 lg:p-8'>
                        <hr />

                        <header>
                            <h2 className='text-center text-2xl md:mb-12 md:text-4xl lg:text-left'>
                                {t('beritaTerbaru')}
                            </h2>
                        </header>

                        {/* if news is fetching */}
                        {/* {isFetchingNews && (
                            <div className='flex justify-center p-4 lg:p-8'>
                                <Loading />
                            </div>
                        )} */}

                        {/* if news is empty */}
                        {news.length < 1 && (
                            <div className='container p-4 lg:p-8'>
                                <p className='text-center'>Berita Kosong</p>
                            </div>
                        )}

                        {/* if news is not empty */}
                        {news.length > 0 && (
                            <div className='space-y-12'>
                                <div>
                                    <Carousel>
                                        <CarouselContent>
                                            {news?.map((item: News, index: number) => (
                                                <CarouselItem className='cursor-grab' key={`news-${index}`}>
                                                    <NewsCard news={item} />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>

                                        <CarouselPrevious className='h-12 w-12 border-none bg-dark/40 text-light' />

                                        <CarouselNext className='h-12 w-12 border-none bg-dark/40 text-light' />
                                    </Carousel>
                                </div>

                                <div>
                                    <Link href={'/news'}>
                                        <span className='btn-secondary mx-auto block w-max border-none bg-[#E2BC82]'>
                                            {t('bacaLebihBanyak')}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                {/* end of news section */}

                {/* article section */}
                <section>
                    <div className='container space-y-16 p-4 lg:p-8'>
                        <hr />

                        <header className='text-center text-2xl md:text-3xl lg:text-left'>
                            <h2 className='text-center text-2xl md:mb-12 md:text-4xl lg:text-left'>
                                {t('artikelTerbaru')}
                            </h2>
                        </header>

                        {/* if articles is fetching */}
                        {/* {isFetching && (
                            <div className='flex justify-center p-4 lg:p-8'>
                                <Loading />
                            </div>
                        )} */}

                        {/* if articles is empty */}
                        {articles?.length < 1 && (
                            <div className='container p-4 lg:p-8'>
                                <p className='text-center'>Artikel Kosong</p>
                            </div>
                        )}

                        {/* if articles is not empty */}
                        {articles?.length > 0 && (
                            <>
                                <div>
                                    <Carousel>
                                        <CarouselContent>
                                            {articles?.map((article: Article, index: number) => (
                                                <CarouselItem
                                                    className='cursor-grab md:basis-1/2 md:pb-4 lg:basis-1/3'
                                                    key={`news-${index}`}
                                                >
                                                    <ArticleCard article={article} />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>

                                        <CarouselPrevious className='h-12 w-12 border-none bg-dark/40 text-light' />

                                        <CarouselNext className='h-12 w-12 border-none bg-dark/40 text-light' />
                                    </Carousel>
                                </div>

                                <div>
                                    <Link href={'/articles'}>
                                        <span className='btn-primary mx-auto block w-max'>{t('bacaLebihBanyak')}</span>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </section>
                {/* end of article section */}

                {/* sponsor section */}
                <section className='py-4 lg:py-8'>
                    <div className='container space-y-8 p-4 lg:p-8'>
                        <hr />

                        <header className='text-center text-2xl md:text-3xl'>
                            <h2>{t('didukungOleh')}</h2>
                        </header>

                        <div className='py-8 lg:py-16'>
                            <Marquee speed={60} pauseOnHover>
                                <div className='flex space-x-12 lg:space-x-36'>
                                    <Image
                                        className='h-20 w-20 rounded-lg bg-light object-contain p-4 md:h-32 md:w-32'
                                        src={AssetsBeranda.asset_sponsor_1}
                                        alt='Asset Sponsor 1'
                                    />

                                    <Image
                                        className='h-20 w-20 rounded-lg bg-light object-contain p-4 md:h-32 md:w-32'
                                        src={AssetsBeranda.asset_sponsor_2}
                                        alt='Asset Sponsor 2'
                                    />
                                    <Image
                                        className='h-20 w-20 rounded-lg bg-light object-contain p-4 md:h-32 md:w-32'
                                        src={AssetsBeranda.asset_sponsor_3}
                                        alt='Asset Sponsor 3'
                                    />
                                    <Image
                                        className='h-20 w-20 rounded-lg bg-light object-contain p-4 md:h-32 md:w-32'
                                        src={AssetsBeranda.asset_sponsor_4}
                                        alt='Asset Sponsor 4'
                                    />
                                    <Image
                                        className='h-20 w-20 rounded-lg bg-light object-contain p-4 md:h-32 md:w-32'
                                        src={AssetsBeranda.asset_sponsor_5}
                                        alt='Asset Sponsor 5'
                                    />
                                    <Image
                                        className='h-20 w-20 rounded-lg bg-light object-contain p-4 md:h-32 md:w-32'
                                        src={AssetsBeranda.asset_sponsor_6}
                                        alt='Asset Sponsor 6'
                                    />
                                    <div></div>
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </section>
                {/* end of sponsor section */}
            </div>
        </>
    )
}
