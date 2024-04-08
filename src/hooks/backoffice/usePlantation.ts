import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, findAll, findOne, remove, update } from '@/modules/backoffice/plantationModule'
import { globalStore } from '@/store/backoffice/global'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function usePlantation() {
    // global states
    const { setPlantation, setPlantations, setIsFetching, setIsCreating, setIsUpdating, setIsDeleting } =
        plantationStore()
    const { setCoordinate } = globalStore()

    // router
    const router = useRouter()

    async function getPlantations() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setPlantations(res)

            return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getPlantation(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setPlantation(res)

            return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createPlantation(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)
        formData.append('latitude', e.currentTarget.latitude.value)
        formData.append('longitude', e.currentTarget.longitude.value)
        formData.append(
            'land_area',
            parseFloat(e.currentTarget.land_area.value.replace(/\./g, '').replace(',', '.')).toFixed(2),
        )
        formData.append('number_tree', e.currentTarget.number_tree.value.replace(/\./g, '').replace(',', '.'))

        try {
            const res = await create(formData)

            toast.success(res.message, successToast)

            setCoordinate({
                lat: '',
                lng: '',
            })

            router.back()
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)

            throw error
        } finally {
            setIsCreating(false)
        }
    }

    async function updatePlantation(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('name', e.currentTarget.plantation_name.value)
        urlSearchParams.append(
            'land_area',
            parseFloat(e.currentTarget.land_area.value.replace(/\./g, '').replace(',', '.')).toFixed(2),
        )
        urlSearchParams.append('number_tree', e.currentTarget.number_tree.value.replace(/\./g, '').replace(',', '.'))
        urlSearchParams.append('planting_year', e.currentTarget.planting_year.value)
        urlSearchParams.append('harvest_rotation', e.currentTarget.harvest_rotation.value)
        urlSearchParams.append('topography_type', e.currentTarget.topography_type.value)
        urlSearchParams.append('soil_type', e.currentTarget.soil_type.value)
        urlSearchParams.append('address', e.currentTarget.address.value)
        urlSearchParams.append('latitude', e.currentTarget.latitude.value)
        urlSearchParams.append('longitude', e.currentTarget.longitude.value)
        urlSearchParams.append('seed_variety_id', e.currentTarget.seed_variety_id.value)

        try {
            const res = await update(urlSearchParams)

            router.back()

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)

            throw error
        } finally {
            setIsUpdating(false)
        }
    }

    async function deletePlantation(id: string) {
        setIsDeleting(true)

        try {
            await remove(id)

            toast.success('Plantation deleted', successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    return { getPlantations, getPlantation, createPlantation, updatePlantation, deletePlantation }
}
