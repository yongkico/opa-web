import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, findAll, update, remove } from '@/modules/backoffice/newsSubCategoryModule'
import { newsSubCategoryStore } from '@/store/backoffice/newsSubCategoryStore'
import { userStore } from '@/store/userStore'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useNewsSubCategory() {
    // global states
    const { setIsCreating, setIsDeleting, setIsFetching, setIsUpdating, setNewsSubCategories } = newsSubCategoryStore()
    const { loggedInUser } = userStore()

    async function getNewsSubCategories() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setNewsSubCategories(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getNewsSubCategory() {}

    async function createNewsSubCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)
        formData.append('id', loggedInUser.data.id.toString())

        try {
            const res = await create(formData)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsCreating(false)
        }
    }

    async function updateNewsSubCategory(id: string, name: string, news_category_id: string) {
        setIsUpdating(true)

        try {
            const res = await update(id, name, news_category_id)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteNewsSubCategory(id: string) {
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

    return {
        getNewsSubCategories,
        getNewsSubCategory,
        createNewsSubCategory,
        updateNewsSubCategory,
        deleteNewsSubCategory,
    }
}
