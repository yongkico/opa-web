import { DataResponse, ErrorResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, remove, update, findAll, findOne } from '@/modules/backoffice/roleModule'
import { roleStore } from '@/store/backoffice/roleStore'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

type ErrorMessage = {
    name: string[]
}

export function useRole() {
    // global states
    const { setIsCreating, setIsDeleting, setIsFetching, setIsUpdating, setRoles, setRole } = roleStore()

    // states
    const [errorMessages, setErrorMessages] = useState<ErrorResponse<ErrorMessage>>({} as ErrorResponse<ErrorMessage>)

    async function getRoles(page?: string) {
        setIsFetching(true)

        try {
            const res = await findAll(page)

            setRoles(res)
            // return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getRole(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setRole(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createRole(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = await create(formData)

            getRoles('1')

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

    async function updateRole(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        // req body (id, role_name)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('name', e.currentTarget.role_name.value)

        try {
            const res = await update(urlSearchParams)

            getRoles('1')

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

    async function deleteRole(id: string) {
        setIsDeleting(true)

        try {
            const res = await remove(id)

            toast.success(res.message, successToast)

            getRoles('1')
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    return { getRoles, getRole, createRole, updateRole, deleteRole, errorMessages }
}
