import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, findAll, findOne, remove, update } from '@/modules/backoffice/harvestModule'
import { harvestStore } from '@/store/backoffice/harvestStore'
import { format } from 'date-fns'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useHarvest() {
    // states

    // global states
    const { setHarvest, setHarvests, setIsFetching, setIsCreating, setIsUpdating, setIsDeleting } = harvestStore()

    async function getHarvests() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setHarvests(res)

            return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)

            throw error
        } finally {
            setIsFetching(false)
        }
    }

    async function getHarvest(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setHarvest(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createHarvest(e: FormEvent<HTMLFormElement>, chosen_date: string) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)
        formData.append('total_ffb', e.currentTarget.total_ffb.value.replace(/\./g, '').replace(',', '.'))
        formData.append('total_price', e.currentTarget.total_price.value.replace(/\./g, '').replace(',', '.'))
        formData.append(
            'total_weight',
            parseFloat(e.currentTarget.total_weight.value.replace(/\./g, '').replace(',', '.')).toFixed(2),
        )

        if (chosen_date) formData.append('date', format(chosen_date, 'yyyy-MM-dd'))

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

    async function updateHarvest(id: string, e: FormEvent<HTMLFormElement>, chosen_date: string) {
        e.preventDefault()

        setIsUpdating(true)

        const urlSearchParams = new URLSearchParams()

        urlSearchParams.append('date', format(chosen_date, 'yyyy-MM-dd'))
        urlSearchParams.append('total_ffb', e.currentTarget.total_ffb.value.replace(/\./g, '').replace(',', '.'))
        urlSearchParams.append('total_price', e.currentTarget.total_price.value.replace(/\./g, '').replace(',', '.'))
        urlSearchParams.append(
            'total_weight',
            parseFloat(e.currentTarget.total_weight.value.replace(/\./g, '').replace(',', '.')).toFixed(2),
        )
        urlSearchParams.append('plantation_id', e.currentTarget.plantation_id.value)
        urlSearchParams.append('id', id)

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

    async function deleteHarvest(id: string) {
        setIsDeleting(true)

        try {
            await remove(id)

            toast.success('Harvest deleted', successToast)
        } catch (error) {
            toast.error('Something went wrong', failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    return { getHarvests, getHarvest, createHarvest, updateHarvest, deleteHarvest }
}
