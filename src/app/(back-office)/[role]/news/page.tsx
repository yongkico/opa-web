'use client'

import { JSX } from 'react'
import Link from 'next/link'
import NewsTable from '@/components/partials/backoffice/Tables/News/NewsTable'
import { useNews } from '@/hooks/backoffice/useNews'
import { News } from '@/@types/News'
import { Button, Pagination } from '@nextui-org/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useEffectOnce } from 'usehooks-ts'
import { newsStore } from '@/store/backoffice/newsStore'
import { useSearchParams } from 'next/navigation'

export default function News(): JSX.Element {
    // custom hooks
    const { getNews } = useNews()

    // global states
    const { news } = newsStore()

    // params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    useEffectOnce(() => {
        getNews()
    })

    return (
        <>
            <div className='container min-h-screen space-y-4 px-0 py-4 md:space-y-8 md:py-8'>
                <section className='apply-dark rounded-lg bg-white p-4 lg:p-8'>
                    <div className='flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between'>
                        <Button
                            as={Link}
                            href={'/author/news/create'}
                            className='w-max'
                            color='primary'
                            radius='sm'
                            startContent={<PlusIcon className='h-4 w-4' />}
                        >
                            <span className='hidden sm:inline'>Tambah Berita</span>
                        </Button>

                        {/* filter section */}
                        {/* <div>
                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                variant='bordered'
                                type='text'
                                labelPlacement='outside'
                                radius='sm'
                                placeholder='Pencarian'
                            />
                        </div> */}
                    </div>
                </section>

                <section>
                    <div>
                        <NewsTable list={news} />
                    </div>

                    {/* pagination */}
                    <div className='flex flex-col items-center justify-between gap-4 py-4 lg:flex-row lg:py-8'>
                        <p className='text-sm'>
                            Showing {news.pagination?.from} to {news.pagination?.to} of {news.pagination?.total} entries
                        </p>

                        <div className='flex items-center gap-x-2'>
                            <Pagination
                                onChange={(page) => {
                                    params.set('page', page.toString())
                                    window.history.pushState(null, '', `?${params.toString()}`)

                                    getNews(page.toString())
                                }}
                                classNames={{
                                    item: 'bg-primary/10',
                                }}
                                total={Math.ceil(news.pagination?.total! / news.pagination?.per_page!) || 1}
                                initialPage={1}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
