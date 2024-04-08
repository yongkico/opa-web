'use client'

import { JSX } from 'react'
import Link from 'next/link'
import { Button, Pagination } from '@nextui-org/react'
import { useArticle } from '@/hooks/backoffice/useArticle'
import ArticlesTable from '@/components/partials/backoffice/Tables/Articles/ArticlesTable'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useArticleCategory } from '@/hooks/backoffice/useArticleCategory'
import { useArticleSubCategory } from '@/hooks/backoffice/useArticleSubCategory'
import { useEffectOnce } from 'usehooks-ts'
import { articleStore } from '@/store/backoffice/articleStore'
import { useSearchParams } from 'next/navigation'

export default function Articles(): JSX.Element {
    // custom hooks
    const { getArticles } = useArticle()
    const { getArticleCategories } = useArticleCategory()
    const { getArticleSubCategories } = useArticleSubCategory()

    // global states
    const { articles } = articleStore()

    // params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    useEffectOnce(() => {
        getArticles('1')
        getArticleCategories()
        getArticleSubCategories()
    })

    return (
        <main className='container space-y-4 px-0 py-4 lg:space-y-8 lg:py-8'>
            <section>
                <div className='apply-dark flex justify-between gap-x-4 rounded-lg bg-white p-4 lg:p-8'>
                    {/* new article */}
                    <Button as={Link} href={`/author/articles/create`} color='primary' radius='sm'>
                        <PlusIcon className='h-4 w-4' /> <span className='hidden sm:inline'>Tambah Artikel</span>
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

            {/* tables */}
            <section>
                <div>
                    <ArticlesTable list={articles} />
                </div>

                {/* pagination */}
                <div className='flex flex-col items-center justify-between gap-4 py-4 lg:flex-row lg:py-8'>
                    <p className='text-sm'>
                        Showing {articles.pagination?.from} to {articles.pagination?.to} of {articles.pagination?.total}{' '}
                        entries
                    </p>

                    <div className='flex items-center gap-x-2'>
                        <Pagination
                            onChange={(page) => {
                                params.set('page', page.toString())
                                window.history.pushState(null, '', `?${params.toString()}`)

                                getArticles(page.toString())
                            }}
                            classNames={{
                                item: 'bg-primary/10',
                            }}
                            total={Math.ceil(articles.pagination?.total! / articles.pagination?.per_page!) || 1}
                            initialPage={1}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}
