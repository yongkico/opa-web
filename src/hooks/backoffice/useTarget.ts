import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, findAll, findOne, remove, update } from '@/modules/backoffice/targetModule'
import { targetStore } from '@/store/backoffice/targetStore'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useTarget() {
    // states

    // global states
    const { setTarget, setTargets, setIsFetching, setIsCreating, setIsUpdating, setIsDeleting } = targetStore()

    async function getTargets() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setTargets(res)

            return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)

            throw error
        } finally {
            setIsFetching(false)
        }
    }

    async function getTarget(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setTarget(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createTarget(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)
        formData.append(
            'target',
            parseFloat(e.currentTarget.target_panen?.value.replace(/\./g, '').replace(',', '.')).toFixed(2),
        )

        try {
            const res = await create(formData)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)

            throw error
        } finally {
            setIsCreating(false)
        }
    }

    async function updateTarget(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        const urlSearchParams = new URLSearchParams()

        urlSearchParams.append('id', id)
        urlSearchParams.append('plantation_id', e.currentTarget.plantation_id.value)
        urlSearchParams.append(
            'target',
            parseFloat(e.currentTarget.target_panen?.value.replace(/\./g, '').replace(',', '.')).toFixed(2),
        )
        urlSearchParams.append('year', e.currentTarget.year?.value)

        try {
            const res = await update(urlSearchParams)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)

            throw error
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteTarget(id: string) {
        setIsDeleting(true)

        try {
            await remove(id)

            toast.success('Target deleted', successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    return { getTargets, getTarget, createTarget, updateTarget, deleteTarget }
}
