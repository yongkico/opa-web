import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import {
    findAll,
    create,
    remove,
    update,
    findOne,
    updateBannerImage,
    updateThumbnailImage,
} from '@/modules/backoffice/newsModule'
import { newsStore } from '@/store/backoffice/newsStore'
import { userStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent } from 'react'
import { toast } from 'sonner'

export function useNews() {
    // global states
    const {
        setIsCreating,
        setIsDeleting,
        setIsFetching,
        setIsUpdating,
        setSingleNews,
        setNews,
        setIsUpdatingBanner,
        setIsUpdatingThumbnail,
    } = newsStore()
    const { loggedInUser } = userStore()

    // router
    const router = useRouter()

    async function getNews(page?: string) {
        setIsFetching(true)

        try {
            const res = await findAll(page)

            setNews(res)

            return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getSingleNews(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setSingleNews(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createNews(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = await create(formData)

            router.push('/author/news')

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsCreating(false)
        }
    }

    async function updateNews(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        // req body (id, title, banner_image, thumbnail_image, content, news_category_id, news_subcategory_id, updated_by_id)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('title', e.currentTarget.news_title.value)
        urlSearchParams.append('content', e.currentTarget.content.value)
        urlSearchParams.append('news_category_id', e.currentTarget.news_category_id.value)
        urlSearchParams.append('news_subcategory_id', e.currentTarget.news_subcategory_id.value)
        urlSearchParams.append('updated_by', loggedInUser.data.id)

        try {
            const res = await update(urlSearchParams)

            router.push('/author/news')

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteNews(id: string) {
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

    return { getNews, getSingleNews, createNews, updateNews, deleteNews, updateBanner, updateThumbnail }
}
