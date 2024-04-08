'use client'

import { ChangeEvent, JSX, useRef, useState } from 'react'
import TinyMceEditor from '@/components/partials/backoffice/TinyMceEditor/TinyMceEditor'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useArticle } from '@/hooks/backoffice/useArticle'
import { useArticleCategory } from '@/hooks/backoffice/useArticleCategory'
import { useEffectOnce } from 'usehooks-ts'
import { articleCategoryStore } from '@/store/backoffice/articleCategoryStore'
import { ArticleCategory, ArticleSubCategory } from '@/@types/Article'
import { articleSubCategoryStore } from '@/store/backoffice/articleSubCategoryStore'
import { useArticleSubCategory } from '@/hooks/backoffice/useArticleSubCategory'
import { articleStore } from '@/store/backoffice/articleStore'
import { PhotoIcon } from '@heroicons/react/24/outline'

export default function Create(): JSX.Element {
    // custom hooks
    const { createArticle } = useArticle()
    const { getArticleCategories } = useArticleCategory()
    const { getArticleSubCategories } = useArticleSubCategory()

    // global states
    const { isCreating } = articleStore()
    const { articleCategories, isFetching } = articleCategoryStore()
    const { articleSubCategories, isFetching: isFetchingSubCategory } = articleSubCategoryStore()

    useEffectOnce(() => {
        getArticleCategories()
        getArticleSubCategories()
    })

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
                <h1 className='text-xl'>Tambah Artikel</h1>
            </header>

            <section>
                <form
                    onSubmit={(e) => {
                        createArticle(e)
                    }}
                >
                    {/* file input */}
                    <div className='mb-4 flex flex-col gap-x-20 gap-y-4 md:mb-8 md:flex-row'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label>Cover</label>

                            {/* banner image */}
                            <div>
                                <div className={`${isImageUploaded.banner ? 'hidden' : ''}`}>
                                    <label
                                        ref={bannerLabelRef}
                                        className='relative flex flex-col items-center rounded-lg border-2 border-dashed border-neutral-500 px-8 py-4 text-center text-sm text-neutral-500'
                                        htmlFor='banner_image'
                                    >
                                        <PhotoIcon className='h-12 w-12' />
                                        <span>Upload Banner</span>
                                    </label>

                                    <input
                                        onChange={handleBannerChange}
                                        className='hidden'
                                        type='file'
                                        name='banner_image'
                                        id='banner_image'
                                    />
                                </div>

                                {/* image preview */}
                                <div className={`${isImageUploaded.banner ? '' : 'hidden'} flex flex-col gap-y-4`}>
                                    <img
                                        ref={bannerRef}
                                        className='aspect-video h-full w-full rounded-lg object-contain'
                                        src=''
                                        alt='photo banner'
                                    />

                                    <Button
                                        onClick={() => bannerLabelRef.current?.click()}
                                        color='primary'
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
                                <div className={`${isImageUploaded.thumbnail ? 'hidden' : ''}`}>
                                    <label
                                        ref={thumbnailLabelRef}
                                        className='relative flex flex-col items-center rounded-lg border-2 border-dashed border-neutral-500 px-8 py-4 text-center text-sm text-neutral-500'
                                        htmlFor='thumbnail_image'
                                    >
                                        <PhotoIcon className='h-12 w-12' />
                                        <span>Upload Thumbnail</span>
                                    </label>

                                    <input
                                        onChange={handleThumbnailChange}
                                        className='hidden'
                                        type='file'
                                        name='thumbnail_image'
                                        id='thumbnail_image'
                                    />
                                </div>

                                {/* image preview */}
                                <div className={`${isImageUploaded.thumbnail ? '' : 'hidden'} flex flex-col gap-y-4`}>
                                    <img
                                        ref={thumbnailRef}
                                        className='aspect-video h-full w-full rounded-lg object-contain'
                                        src=''
                                        alt='photo thumbnail'
                                    />

                                    <Button
                                        onClick={() => thumbnailLabelRef.current?.click()}
                                        color='primary'
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
                                name='article_category_id'
                                aria-label='Pilih kategori'
                                variant='bordered'
                                isLoading={isFetching}
                            >
                                {articleCategories.data?.map((articleCategory: ArticleCategory) => (
                                    <SelectItem key={articleCategory.id} value={articleCategory.id}>
                                        {articleCategory.name}
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
                                name='article_subcategory_id'
                                aria-label='Pilih kategori'
                                variant='bordered'
                                isLoading={isFetchingSubCategory}
                            >
                                {articleSubCategories.data?.map((articleSubCategory: ArticleSubCategory) => (
                                    <SelectItem key={articleSubCategory.id} value={articleSubCategory.id}>
                                        {articleSubCategory.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* title input */}
                    <div className='mb-8 flex w-full flex-col gap-y-1'>
                        <label>Judul</label>

                        <Input
                            classNames={{
                                inputWrapper: 'border apply-dark',
                            }}
                            type='text'
                            variant='bordered'
                            size='sm'
                            name='title'
                            radius='sm'
                        />
                    </div>

                    {/* content input */}
                    <div className='mb-8 flex w-full flex-col gap-y-1'>
                        <label>Konten</label>

                        <TinyMceEditor textareaName='content' />
                    </div>

                    {/* button draft or publish */}
                    <div className='flex gap-x-4'>
                        {/* <Button color='secondary' radius='sm'>
                            Draft
                        </Button> */}

                        <Button type='submit' color='primary' radius='sm' isLoading={isCreating}>
                            Publish
                        </Button>
                    </div>
                </form>
            </section>
        </main>
    )
}
