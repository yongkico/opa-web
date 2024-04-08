import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import {
    create,
    remove,
    update,
    findAll,
    findOne,
    updateBannerImage,
    updateThumbnailImage,
} from '@/modules/backoffice/articleModule'
import { articleStore } from '@/store/backoffice/articleStore'
import { userStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent } from 'react'
import { toast } from 'sonner'

export function useArticle() {
    // global states
    const {
        setIsCreating,
        setIsDeleting,
        setIsFetching,
        setIsUpdating,
        setArticles,
        setArticle,
        setIsUpdatingBanner,
        setIsUpdatingThumbnail,
    } = articleStore()
    const { loggedInUser } = userStore()

    // router
    const router = useRouter()

    async function getArticles(page?: string) {
        setIsFetching(true)

        try {
            const res = await findAll(page)

            setArticles(res)
            // return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getArticle(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setArticle(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createArticle(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = await create(formData)

            router.push('/author/articles')

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsCreating(false)
        }
    }

    async function updateArticle(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        // req body (id, title, banner_image, thumbnail_image, content, article_category_id, article_subcategory_id, updated_by_id)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('title', e.currentTarget.article_title.value)
        urlSearchParams.append('content', e.currentTarget.content.value)
        urlSearchParams.append('article_category_id', e.currentTarget.article_category_id.value)
        urlSearchParams.append('article_subcategory_id', e.currentTarget.article_subcategory_id.value)
        urlSearchParams.append('updated_by', loggedInUser.data.id)

        try {
            const res = await update(urlSearchParams)

            router.push('/author/articles')

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteArticle(id: string) {
        setIsDeleting(true)

        try {
            const res = await remove(id)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    async function updateBanner(id: string, e: ChangeEvent<HTMLInputElement>) {
        setIsUpdatingBanner(true)

        const formData = new FormData()
        formData.append('banner_image', e.currentTarget?.files?.item(0) as File)
        formData.append('id', id)

        try {
            const res = await updateBannerImage(formData)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsUpdatingBanner(false)
        }
    }

    async function updateThumbnail(id: string, e: ChangeEvent<HTMLInputElement>) {
        setIsUpdatingThumbnail(true)

        const formData = new FormData()
        formData.append('thumbnail_image', e.currentTarget?.files?.item(0) as File)
        formData.append('id', id)

        try {
            const res = await updateThumbnailImage(formData)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsUpdatingThumbnail(false)
        }
    }

    return { getArticles, getArticle, createArticle, updateArticle, deleteArticle, updateBanner, updateThumbnail }
}
