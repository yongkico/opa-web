'use client'

import { ChangeEvent, JSX, useEffect, useRef, useState } from 'react'
import TinyMceEditor from '@/components/partials/backoffice/TinyMceEditor/TinyMceEditor'
import { useNews } from '@/hooks/backoffice/useNews'
import { useNewsCategory } from '@/hooks/backoffice/useNewsCategory'
import { useNewsSubCategory } from '@/hooks/backoffice/useNewsSubCategory'
import { newsSubCategoryStore } from '@/store/backoffice/newsSubCategoryStore'
import { newsCategoryStore } from '@/store/backoffice/newsCategoryStore'
import { useEffectOnce } from 'usehooks-ts'
import { newsStore } from '@/store/backoffice/newsStore'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { NewsCategory, NewsSubCategory } from '@/@types/News'
import { useParams } from 'next/navigation'
import { PhotoIcon } from '@heroicons/react/24/outline'

export default function Edit(): JSX.Element {
    // states
    const [title, setTitle] = useState<string>('')

    // custom hooks
    const { updateNews, getSingleNews, updateBanner, updateThumbnail } = useNews()
    const { getNewsCategories } = useNewsCategory()
    const { getNewsSubCategories } = useNewsSubCategory()

    // global states
    const { isUpdating, singleNews } = newsStore()
    const { newsCategories, isFetching } = newsCategoryStore()
    const { newsSubCategories, isFetching: isFetchingSubCategory } = newsSubCategoryStore()

    // query params
    const params = useParams()

    useEffectOnce(() => {
        getNewsCategories()
        getNewsSubCategories()
    })

    useEffect(() => {
        getSingleNews(params.id as string)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id as string])

    // states
    const [isImageUploaded, setIsImageUploaded] = useState<{ banner: boolean; thumbnail: boolean }>({
        banner: false,
        thumbnail: false,
    })

    // refs
    const bannerRef = useRef<HTMLImageElement | null>(null)
    const bannerLabelRef = useRef<HTMLLabelElement | null>(null)
    const thumbnailRef = useRef<HTMLImageElement | null>(null)
    const thumbnailLabelRef = useRef<HTMLLabelElement | null>(null)

    function handleBannerChange(e: ChangeEvent<HTMLInputElement>) {
        const image: File | null | undefined = e.currentTarget.files?.item(0)

        if (image) {
            const imageUrl = URL.createObjectURL(image)

            bannerRef.current!.src = imageUrl

            setIsImageUploaded((prev) => ({ ...prev, banner: true }))

            return
        }

        setIsImageUploaded((prev) => ({ ...prev, banner: false }))
    }

    function handleThumbnailChange(e: ChangeEvent<HTMLInputElement>) {
        const image: File | null | undefined = e.currentTarget.files?.item(0)

        if (image) {
            const imageUrl = URL.createObjectURL(image)

            thumbnailRef.current!.src = imageUrl

            setIsImageUploaded((prev) => ({ ...prev, thumbnail: true }))

            return
        }

        setIsImageUploaded((prev) => ({ ...prev, thumbnail: false }))
    }

    return (
        <main className='apply-dark container mt-4 min-h-screen space-y-8 rounded-lg bg-white p-4 shadow md:mt-8 md:p-8'>
            <header>
                <h1 className='text-xl'>Sunting Berita</h1>
            </header>

            <section>
                <form
                    onSubmit={(e) => {
                        updateNews(singleNews.data.id, e)
                    }}
                >
                    {/* file input */}
                    <div className='mb-4 flex flex-col gap-x-20 gap-y-4 md:mb-8 md:flex-row'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label>Cover</label>

                            {/* banner image */}
                            <div>
                                <div className={`${isImageUploaded.banner || singleNews.data ? 'hidden' : ''}`}>
                                    <label
                                        ref={bannerLabelRef}
                                        className='relative flex flex-col items-center rounded-lg border-2 border-dashed border-neutral-500 px-8 py-4 text-center text-sm text-neutral-500'
                                        htmlFor='banner_image'
                                    >
                                        <PhotoIcon className='h-12 w-12' />
                                        <span>Upload Banner</span>
                                    </label>

                                    <input
                                        onChange={(e) => {
                                            updateBanner(params.id as string, e)

                                            handleBannerChange(e)
                                        }}
                                        className='hidden'
                                        type='file'
                                        name='banner_image'
                                        id='banner_image'
                                    />
                                </div>

                                {/* image preview */}
                                <div
                                    className={`${
                                        isImageUploaded.banner || singleNews.data ? '' : 'hidden'
                                    } apply-dark flex flex-col gap-y-4 rounded-lg border p-4`}
                                >
                                    <img
                                        ref={bannerRef}
                                        className='aspect-video h-full w-full rounded-lg object-contain'
                                        src={singleNews.data && singleNews.data.banner_image_url}
                                        alt='photo banner'
                                    />

                                    <Button
                                        onClick={() => bannerLabelRef.current?.click()}
                                        color='secondary'
                                        type='button'
                                        variant='ghost'
                                        radius='sm'
                                    >
                                        Change
                                    </Button>
                                </div>
                                {/* end of image preview */}
                            </div>
                            {/* end of banner image */}
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label>Thumbnail</label>

                            {/* thumbnail image */}
                            <div>
                                <div className={`${isImageUploaded.thumbnail || singleNews.data ? 'hidden' : ''}`}>
                                    <label
                                        ref={thumbnailLabelRef}
                                        className='relative flex flex-col items-center rounded-lg border-2 border-dashed border-neutral-500 px-8 py-4 text-center text-sm text-neutral-500'
                                        htmlFor='thumbnail_image'
                                    >
                                        <PhotoIcon className='h-12 w-12' />
                                        <span>Upload Thumbnail</span>
                                    </label>

                                    <input
                                        onChange={(e) => {
                                            updateThumbnail(params.id as string, e)

                                            handleThumbnailChange(e)
                                        }}
                                        className='hidden'
                                        type='file'
                                        name='thumbnail_image'
                                        id='thumbnail_image'
                                    />
                                </div>

                                {/* image preview */}
                                <div
                                    className={`${
                                        isImageUploaded.thumbnail || singleNews.data ? '' : 'hidden'
                                    } apply-dark flex flex-col gap-y-4 rounded-lg border p-4`}
                                >
                                    <img
                                        ref={thumbnailRef}
                                        className='aspect-video h-full w-full rounded-lg object-contain'
                                        src={singleNews.data && singleNews.data.thumbnail_image_url}
                                        alt='photo thumbnail'
                                    />

                                    <Button
                                        onClick={() => thumbnailLabelRef.current?.click()}
                                        color='secondary'
                                        type='button'
                                        variant='ghost'
                                        radius='sm'
                                    >
                                        Change
                                    </Button>
                                </div>
                                {/* end of image preview */}
                            </div>
                            {/* end of thumbnail image */}
                        </div>
                    </div>

                    {/* category & subcategory input */}
                    <div className='mb-4 flex flex-col gap-x-20 gap-y-4 md:mb-8 md:flex-row'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label>Kategori</label>

                            <Select
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                size='sm'
                                radius='sm'
                                placeholder='Pilih Kategori'
                                name='news_category_id'
                                aria-label='Pilih kategori'
                                variant='bordered'
                                isLoading={isFetching}
                                selectedKeys={[singleNews.data?.news_category_id]}
                            >
                                {newsCategories.data?.map((newsCategory: NewsCategory) => (
                                    <SelectItem key={newsCategory.id} value={newsCategory.id}>
                                        {newsCategory.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label>Sub-Kategori</label>

                            <Select
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                size='sm'
                                radius='sm'
                                placeholder='Pilih Kategori'
                                name='news_subcategory_id'
                                aria-label='Pilih kategori'
                                variant='bordered'
                                isLoading={isFetchingSubCategory}
                                selectedKeys={[singleNews.data?.news_subcategory_id]}
                            >
                                {newsSubCategories.data?.map((newsSubCategory: NewsSubCategory) => (
                                    <SelectItem key={newsSubCategory.id} value={newsSubCategory.id}>
                                        {newsSubCategory.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* title input */}
                    <div className='mb-8 flex w-full flex-col gap-y-1'>
                        <label>Judul</label>

                        <Input
                            onValueChange={setTitle}
                            classNames={{
                                inputWrapper: 'border apply-dark',
                            }}
                            type='text'
                            variant='bordered'
                            size='sm'
                            name='title'
                            radius='sm'
                            value={title || singleNews.data?.title}
                        />
                    </div>

                    {/* content input */}
                    <div className='mb-8 flex w-full flex-col gap-y-1'>
                        <label>Konten</label>

                        <TinyMceEditor textareaName='content' initialValue={singleNews.data?.content} />
                    </div>

                    {/* button draft or publish */}
                    <div className='flex gap-x-4'>
                        {/* <Button color='secondary' radius='sm'>
                                Draft
                            </Button> */}

                        <Button type='submit' color='primary' radius='sm' isLoading={isUpdating}>
                            Update
                        </Button>
                    </div>
                </form>
            </section>
        </main>
    )
}
