import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, findAll, remove, update } from '@/modules/backoffice/newsCategoryModule'
import { newsCategoryStore } from '@/store/backoffice/newsCategoryStore'
import { userStore } from '@/store/userStore'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useNewsCategory() {
    // global states
    const { setIsCreating, setIsDeleting, setIsFetching, setIsUpdating, setNewsCategories } = newsCategoryStore()
    const { loggedInUser } = userStore()

    async function getNewsCategories() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setNewsCategories(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getNewsCategory() {}

    async function createNewsCategory(e: FormEvent<HTMLFormElement>) {
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

    async function updateNewsCategory(id: string, name: string) {
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

    async function deleteNewsCategory(id: string) {
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
        getNewsCategories,
        getNewsCategory,
        createNewsCategory,
        updateNewsCategory,
        deleteNewsCategory,
    }
}
