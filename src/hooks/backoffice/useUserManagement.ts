import { DataResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, findAll, findOne, remove, update } from '@/modules/backoffice/userManagementModule'
import { userManagementStore } from '@/store/backoffice/userManagementStore'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useUserManagement() {
    // global states
    const { setIsCreating, setIsFetching, setIsUpdating, setIsDeleting, setUsers, setUser } = userManagementStore()

    async function getUsers() {
        setIsFetching(true)

        try {
            const res = await findAll()

            setUsers(res)

            return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)

            throw error
        } finally {
            setIsFetching(false)
        }
    }

    async function getUser(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setUser(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)

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

    async function updateUser(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('name', e.currentTarget.user_name.value)
        urlSearchParams.append('is_active', e.currentTarget.is_active.value)
        urlSearchParams.append('role_id', e.currentTarget.role_id.value)

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

    async function deleteUser(id: string) {
        setIsDeleting(true)

        try {
            await remove(id)

            toast.success('User deleted', successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    return { getUsers, getUser, createUser, updateUser, deleteUser }
}
