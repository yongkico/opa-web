import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, remove, update, findAll, findOne } from '@/modules/backoffice/varietyModule'
import { varietyStore } from '@/store/backoffice/varietyStore'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useVariety() {
    // global states
    const { setIsCreating, setIsDeleting, setIsFetching, setIsUpdating, setVariety, setVarieties } = varietyStore()

    // router
    const router = useRouter()

    async function getVarieties() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setVarieties(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getVariety(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setVariety(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createVariety(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = await create(formData)

            router.push('/administrator/varieties')

            getVarieties()

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)

            throw error
        } finally {
            setIsCreating(false)
        }
    }

    async function updateVariety(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('name', e.currentTarget.variety_name.value)

        try {
            const res = await update(urlSearchParams)

            toast.success(res.message, successToast)

            getVarieties()
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)

            throw error
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteVariety(id: string) {
        setIsDeleting(true)

        try {
            const res = await remove(id)

            toast.success(res.message, successToast)

            getVarieties()
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    return { getVarieties, getVariety, createVariety, updateVariety, deleteVariety }
}
