import { DataResponse, ErrorResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, remove, update, findAll, findOne } from '@/modules/backoffice/conclusionModule'
import { conclusionStore } from '@/store/backoffice/conclusionStore'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export type ErrorMessage = {
    message: string[]
}

export function useConclusion() {
    // global states
    const { setIsCreating, setIsDeleting, setIsFetching, setIsUpdating, setConclusions, setConclusion } =
        conclusionStore()

    // states
    const [errorMessages, setErrorMessages] = useState<ErrorResponse<ErrorMessage>>({} as ErrorResponse<ErrorMessage>)

    async function getConclusions(page?: string, per_page?: string) {
        setIsFetching(true)

        try {
            const res = await findAll(page, per_page)

            setConclusions(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getConclusion(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setConclusion(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createConclusion(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = await create(formData)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as ErrorResponse<ErrorMessage>

            setErrorMessages(err)

            toast.error('Something went wrong', failToast)

            throw error
        } finally {
            setIsCreating(false)
        }
    }

    async function updateConclusion(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        // req body (id, message)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('message', e.currentTarget.message.value)

        try {
            const res = await update(urlSearchParams)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as ErrorResponse<ErrorMessage>

            setErrorMessages(err)

            toast.error('Something went wrong', failToast)

            throw error
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteConclusion(id: string) {
        setIsDeleting(true)

        try {
            const res = await remove(id)

            toast.success(res.message, successToast)

            getConclusions('1')
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    return { getConclusions, getConclusion, createConclusion, updateConclusion, deleteConclusion, errorMessages }
}
