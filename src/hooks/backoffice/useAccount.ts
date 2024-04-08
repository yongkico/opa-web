import { ErrorResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { findOne, update, updatePassword } from '@/modules/backoffice/accountModule'
import { avatarStore } from '@/store/avatarStore'
import { accountStore } from '@/store/backoffice/accountStore'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

type ChangePasswordFailed = {
    old_password: string[]
    new_password: string[]
}

export function useAccount() {
    // global states
    const { setIsFetching, setIsUpdatingProfile, setIsUpdatingPassword, setProfile } = accountStore()
    const { setAvatar } = avatarStore()

    // states
    const [updatePasswordErrorMessages, setUpdatePasswordErrorMessages] = useState<ErrorResponse<ChangePasswordFailed>>(
        {} as ErrorResponse<ChangePasswordFailed>,
    )

    async function getProfile() {
        setIsFetching(true)

        try {
            const res = await findOne()

            setProfile(res)
        } catch (error) {
        } finally {
            setIsFetching(false)
        }
    }

    async function updateProfile(e: FormEvent<HTMLFormElement>) {
        setIsUpdatingProfile(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = await update(formData)

            setAvatar(res.data.image_url)

            toast.success(res.message, successToast)
        } catch (error) {
            const err = error as ErrorResponse<ChangePasswordFailed>

            setUpdatePasswordErrorMessages(err)

            toast.error('Failed to update profile', failToast)
        } finally {
            setIsUpdatingProfile(false)
        }
    }

    async function changePassword(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdatingPassword(true)

        const urlSearchParams = new URLSearchParams()

        urlSearchParams.append('old_password', e.currentTarget.old_password.value)
        urlSearchParams.append('new_password', e.currentTarget.new_password.value)

        try {
            const res = await updatePassword(urlSearchParams)

            toast.success(res.message, successToast)

            setUpdatePasswordErrorMessages({} as ErrorResponse<ChangePasswordFailed>)

            const formReset = e.target as HTMLFormElement
            formReset.reset()
        } catch (error) {
            const err = error as ErrorResponse<ChangePasswordFailed>

            setUpdatePasswordErrorMessages(err)

            toast.error('Failed to update password', failToast)
        } finally {
            setIsUpdatingPassword(false)
        }
    }

    return { getProfile, updateProfile, changePassword, updatePasswordErrorMessages }
}
