'use client'

import { JSX } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem,
    Input,
} from '@nextui-org/react'
import Loading from '../../../Loading'
import { articleStore } from '@/store/backoffice/articleStore'
import { useArticle } from '@/hooks/backoffice/useArticle'
import { Article, ArticleCategory, ArticleSubCategory } from '@/@types/Article'
import TinyMceEditor from '../../TinyMceEditor'
import { articleCategoryStore } from '@/store/backoffice/articleCategoryStore'
import { articleSubCategoryStore } from '@/store/backoffice/articleSubCategoryStore'

type Props = {
    article: Article
}

export default function EditArticleModal({ article }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isUpdating } = articleStore()
    const { articleCategories } = articleCategoryStore()
    const { articleSubCategories } = articleSubCategoryStore()

    // custom hooks
    const { updateArticle } = useArticle()

    return (
        <>
            <Button onPress={onOpen} className='w-max' color='secondary' size='sm' radius='sm'>
                Edit
            </Button>

            <Modal
                className='dark:text-light'
                size='5xl'
                scrollBehavior='inside'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Hapus?</ModalHeader>

                            <ModalBody className='relative'>
                                {isUpdating && (
                                    <div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm'>
                                        <Loading />
                                    </div>
                                )}

                                <form
                                    onSubmit={(e) => {
                                        updateArticle(article.id, e)
                                    }}
                                >
                                    {/* file input */}
                                    <div className='mb-4 flex flex-col gap-x-20 gap-y-4 md:mb-8 md:flex-row'>
                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label>Cover</label>

                                            <input
                                                className='input-primary file:apply-dark file:rounded file:border-none file:bg-primary file:py-1 file:text-sm file:text-light file:dark:bg-primary'
                                                type='file'
                                                name='banner_image'
                                            />
                                        </div>

                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label>Thumbnail</label>

                                            <input
                                                className='input-primary file:apply-dark file:rounded file:border-none file:bg-primary file:py-1 file:text-sm file:text-light file:dark:bg-primary'
                                                type='file'
                                                name='thumbnail_image'
                                            />
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
                                                selectedKeys={[article.article_category_id.toString()]}
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
                                                selectedKeys={[article.article_subcategory_id.toString()]}
                                            >
                                                {articleSubCategories.data?.map(
                                                    (articleSubCategory: ArticleSubCategory) => (
                                                        <SelectItem
                                                            key={articleSubCategory.id}
                                                            value={articleSubCategory.id}
                                                        >
                                                            {articleSubCategory.name}
                                                        </SelectItem>
                                                    ),
                                                )}
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
                                            defaultValue={article.title}
                                        />
                                    </div>

                                    {/* content input */}
                                    <div className='mb-8 flex w-full flex-col gap-y-1'>
                                        <label>Konten</label>

                                        <TinyMceEditor textareaName='content' initialValue={article.content} />
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button type='submit' color='primary' radius='sm' isLoading={isUpdating}>
                                    Publish
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
