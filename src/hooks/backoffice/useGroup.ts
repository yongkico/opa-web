import { DataResponse } from '@/@types'
import { Discussion } from '@/@types/Group'
import { failToast, successToast } from '@/configs/toastConfig'
import {
    addMember,
    confirmInvitation,
    create,
    createComment,
    createDiscussion,
    findAll,
    findAllCommentsByDiscussionId,
    findAllDiscussions,
    findAllDiscussionsByGroupId,
    findGroupStatistic,
    findOneDiscussion,
    join,
    left,
    remove,
    removeComment,
    removeDiscussion,
    removeMember,
    update,
    updateDiscussion,
} from '@/modules/backoffice/groupModule'
import { groupStore } from '@/store/backoffice/groupStore'
import { userStore } from '@/store/userStore'
import { FormEvent } from 'react'
import { toast } from 'sonner'

export function useGroup() {
    // global states
    const {
        setGroups,
        setIsFetchingGroup,
        setIsCreating,
        setDiscussions,
        setIsFetchingDiscussion,
        setDiscussionsById,
        setIsDeleting,
        setIsUpdating,
        setIsJoining,
        setIsLeaving,
        setGroupStatistic,
        setIsAddingMember,
        setIsDeletingMember,
        setIsConfirmingInvitation,
        setIsFilteringStatistics,
    } = groupStore()
    const { loggedInUser } = userStore()

    async function getGroups() {
        setIsFetchingGroup(true)

        try {
            const res = await findAll()

            setGroups(res)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
            setIsFetchingGroup(false)
        }
    }

    async function createGroup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)
        formData.append('id', loggedInUser.data.id)

        try {
            const res = await create(formData)

            toast.success(res.message as string, successToast)

            getGroups()

            return res
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)

            throw err
        } finally {
            setIsCreating(false)
        }
    }

    async function createGroupDiscussion(group_id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsCreating(true)

        const formData = new FormData(e.currentTarget)
        formData.append('group_id', group_id)

        try {
            const res = await createDiscussion(formData)

            toast.success(res.message as string, successToast)

            const formReset = e.target as HTMLFormElement
            formReset.reset()
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
            setIsCreating(false)
        }
    }

    async function editGroup(id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('name', e.currentTarget.group_name.value)
        urlSearchParams.append('description', e.currentTarget.description.value)

        try {
            const res = await update(urlSearchParams)

            toast.success(res.message as string, successToast)

            getGroups()

            return res
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteGroup(id: string) {
        setIsDeleting(true)

        try {
            const res = await remove(id)

            toast.success(res.message as string, successToast)

            getGroups()
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
            setIsDeleting(false)
        }
    }

    async function getGroupDiscussions() {
        setIsFetchingDiscussion(true)

        try {
            const res = await findAllDiscussions()

            setDiscussions(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)
        } finally {
            setIsFetchingDiscussion(false)
        }
    }

    async function getGroupDiscussionsById(id: string) {
        setIsFetchingDiscussion(true)

        try {
            const res = await findAllDiscussionsByGroupId(id)

            setDiscussionsById(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)

            setDiscussionsById({} as DataResponse<Discussion[]>)
        } finally {
            setIsFetchingDiscussion(false)
        }
    }

    async function getGroupDiscussion(id: string) {
        try {
            const res = await findOneDiscussion(id)

            return res
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)

            throw error
        } finally {
        }
    }

    async function editDiscussion(id: string, group_id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsUpdating(true)

        // req body (content, group_id, id)
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)
        urlSearchParams.append('group_id', group_id)
        urlSearchParams.append('content', e.currentTarget.content.value)

        try {
            const res = await updateDiscussion(urlSearchParams)

            toast.success(res.message as string, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)

            throw error
        } finally {
            setIsUpdating(false)
        }
    }

    async function deleteDiscussion(id: string) {
        setIsDeleting(true)

        try {
            const res = await removeDiscussion(id)

            toast.success(res.message as string, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)

            throw error
        } finally {
            setIsDeleting(false)
        }
    }

    async function joinGroup(user_id: string, group_id: string) {
        setIsJoining(true)

        // req body (user_id, group_id)
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('user_id', user_id)
        urlSearchParams.append('group_id', group_id)

        try {
            const res = await join(urlSearchParams)

            toast.success(res.message as string, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
            setIsJoining(false)
        }
    }

    async function leaveGroup(user_id: string, group_id: string) {
        setIsLeaving(true)

        // req body (user_id, group_id)
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('user_id', user_id)
        urlSearchParams.append('group_id', group_id)

        try {
            const res = await left(urlSearchParams)

            toast.success(res.message as string, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
            setIsLeaving(false)
        }
    }

    async function addComment(discussion_id: string, e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        formData.append('discussion_id', discussion_id)

        try {
            const res = await createComment(formData)

            toast.success(res.message as string, successToast)

            const formReset = e.target as HTMLFormElement
            formReset.reset()
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
        }
    }

    async function deleteComment(id: string) {
        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('id', id)

        try {
            const res = await removeComment(urlSearchParams)

            toast.success(res.message as string, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
        }
    }

    async function getCommentsByDiscussionId(limit: string, discussion_id: string) {
        try {
            const res = await findAllCommentsByDiscussionId(limit, discussion_id)

            return res
        } catch (error) {
        } finally {
        }
    }

    async function getGroupStatistic(group_id: string, start_date: string, end_date: string) {
        setIsFilteringStatistics(true)

        try {
            const res = await findGroupStatistic(group_id, start_date, end_date)

            setGroupStatistic(res)
        } catch (error) {
            // const err = error as DataResponse<string>
            // toast.error(err.message as string, failToast)
        } finally {
            setIsFilteringStatistics(false)
        }
    }

    async function deleteMember(user_id: string, group_id: string) {
        setIsDeletingMember(true)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('user_id', user_id)
        urlSearchParams.append('group_id', group_id)

        try {
            const res = await removeMember(urlSearchParams)
            toast.success(res.message as string, successToast)

            getGroups()
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
            setIsDeletingMember(false)
        }
    }

    async function inviteMember(email: string, group_id: string) {
        setIsAddingMember(true)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('email', email)
        urlSearchParams.append('group_id', group_id)

        try {
            const res = await addMember(urlSearchParams)
            toast.success(res.message as string, successToast)

            getGroups()
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)

            throw error
        } finally {
            setIsAddingMember(false)
        }
    }

    async function confirmMemberInvitation(group_id: string) {
        setIsConfirmingInvitation(true)

        const urlSearchParams = new URLSearchParams()
        urlSearchParams.append('group_id', group_id)

        try {
            const res = await confirmInvitation(urlSearchParams)
            toast.success(res.message as string, successToast)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message as string, failToast)
        } finally {
            setIsConfirmingInvitation(false)
        }
    }

    return {
        getGroups,
        deleteGroup,
        editGroup,
        joinGroup,
        leaveGroup,
        createGroup,
        createGroupDiscussion,
        getGroupDiscussions,
        getGroupDiscussionsById,
        getGroupDiscussion,
        editDiscussion,
        deleteDiscussion,
        addComment,
        deleteComment,
        getCommentsByDiscussionId,
        getGroupStatistic,
        deleteMember,
        inviteMember,
        confirmMemberInvitation,
    }
}
