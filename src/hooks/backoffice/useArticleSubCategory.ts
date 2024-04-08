import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { findAll, create, remove, update } from '@/modules/backoffice/articleSubCategoryModule'
import { articleSubCategoryStore } from '@/store/backoffice/articleSubCategoryStore'
import { userStore } from '@/store/userStore'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useArticleSubCategory() {
    // global states
    const { setIsCreating, setIsDeleting, setIsFetching, setIsUpdating, setArticleSubCategories } =
        articleSubCategoryStore()
    const { loggedInUser } = userStore()

    async function getArticleSubCategories() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setArticleSubCategories(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getArticleSubCategory() {}

    async function createArticleSubCategory(e: FormEvent<HTMLFormElement>) {
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

    async function updateArticleSubCategory(id: string, name: string, article_category_id: string) {
        setIsUpdating(true)

        try {
            const res = await update(id, name, article_category_id)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteArticleSubCategory(id: string) {
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
        getArticleSubCategories,
        getArticleSubCategory,
        createArticleSubCategory,
        updateArticleSubCategory,
        deleteArticleSubCategory,
    }
}
