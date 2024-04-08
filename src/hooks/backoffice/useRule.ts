import { DataResponse, ErrorResponse } from '@/@types'
import { failToast, successToast } from '@/configs/toastConfig'
import { create, remove, update, findAll, findOne } from '@/modules/backoffice/ruleModule'
import { ruleStore } from '@/store/backoffice/ruleStore'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

type ErrorMessage = {
    average_ffb_weight: string[]
    average_ffb_quantity: string[]
    productivity: string[]
    conclusion_id: string[]
}

export function useRule() {
    // global states
    const { setIsCreating, setIsDeleting, setIsFetching, setIsUpdating, setRules, setRule } = ruleStore()

    // states
    const [errorMessages, setErrorMessages] = useState<ErrorResponse<ErrorMessage>>({} as ErrorResponse<ErrorMessage>)

    async function getRules(page?: string) {
        setIsFetching(true)

        try {
            const res = await findAll(page)

            setRules(res)
            // return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function getRule(id: string) {
        setIsFetching(true)

        try {
            const res = await findOne(id)

            setRule(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message, failToast)
        } finally {
            setIsFetching(false)
        }
    }

    async function createRule(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = await create(formData)

            getRules('1')

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

    async function updateRule(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        // req body (id, conclusion_id)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('conclusion_id', e.currentTarget.conclusion_id.value)
        urlSearchParams.append('average_ffb_weight', e.currentTarget.average_ffb_weight.value)
        urlSearchParams.append('average_ffb_quantity', e.currentTarget.average_ffb_quantity.value)
        urlSearchParams.append('productivity', e.currentTarget.productivity.value)

        try {
            const res = await update(urlSearchParams)

            getRules('1')

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

    async function deleteRule(id: string) {
        setIsDeleting(true)

        try {
            const res = await remove(id)

            toast.success(res.message, successToast)

            getRules('1')
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    return { getRules, getRule, createRule, updateRule, deleteRule, errorMessages }
}
