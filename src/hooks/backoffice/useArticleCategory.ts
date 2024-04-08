import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, findAll, remove, update } from '@/modules/backoffice/articleCategoryModule'
import { articleCategoryStore } from '@/store/backoffice/articleCategoryStore'
import { userStore } from '@/store/userStore'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useArticleCategory() {
    // global states
    const { setIsCreating, setIsDeleting, setIsFetching, setIsUpdating, setArticleCategories } = articleCategoryStore()
    const { loggedInUser } = userStore()

    async function getArticleCategories() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setArticleCategories(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getArticleCategory() {}

    async function createArticleCategory(e: FormEvent<HTMLFormElement>) {
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

    async function updateArticleCategory(id: string, name: string) {
        setIsUpdating(true)

        try {
            const res = await update(id, name)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteArticleCategory(id: string) {
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
        getArticleCategories,
        getArticleCategory,
        createArticleCategory,
        updateArticleCategory,
        deleteArticleCategory,
    }
}
