import { DataResponse } from '@/@types'
import { Discussion, Group, GroupStatistic } from '@/@types/Group'
import { create } from 'zustand'

type GroupStore = {
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isFetchingGroup: boolean
    setIsFetchingGroup: (isFetchingGroup: boolean) => void
    isFetchingDiscussion: boolean
    setIsFetchingDiscussion: (isFetchingDiscussion: boolean) => void
    isFetchingComment: boolean
    setIsFetchingComment: (isFetchingComment: boolean) => void
    isGroupListOpen: boolean
    setIsGroupListOpen: (isGroupListOpen: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    isJoining: boolean
    setIsJoining: (isJoining: boolean) => void
    isLeaving: boolean
    setIsLeaving: (isLeaving: boolean) => void
    isDeletingMember: boolean
    setIsDeletingMember: (isDeletingMember: boolean) => void
    isAddingMember: boolean
    setIsAddingMember: (isAddingMember: boolean) => void
    isConfirmingInvitation: boolean
    setIsConfirmingInvitation: (isConfirmingInvitation: boolean) => void
    isFilteringStatistics: boolean
    setIsFilteringStatistics: (isFilteringStatistics: boolean) => void
    groups: DataResponse<Group[]>
    setGroups: (groups: DataResponse<Group[]>) => void
    discussions: DataResponse<Discussion[]>
    setDiscussions: (discussions: DataResponse<Discussion[]>) => void
    discussionsById: DataResponse<Discussion[]>
    setDiscussionsById: (discussionsById: DataResponse<Discussion[]>) => void
    comments: DataResponse<Discussion[]>
    setComments: (comments: DataResponse<Discussion[]>) => void
    groupStatistic: DataResponse<GroupStatistic>
    setGroupStatistic: (groupStatistic: DataResponse<GroupStatistic>) => void
}

export const groupStore = create<GroupStore>()((set) => {
    return {
        isCreating: false,
        setIsCreating: (isCreating: boolean) => set({ isCreating }),
        isFetchingGroup: false,
        setIsFetchingGroup: (isFetchingGroup: boolean) => set({ isFetchingGroup }),
        isFetchingDiscussion: false,
        setIsFetchingDiscussion: (isFetchingDiscussion: boolean) => set({ isFetchingDiscussion }),
        isFetchingComment: false,
        setIsFetchingComment: (isFetchingComment: boolean) => set({ isFetchingComment }),
        isGroupListOpen: false,
        setIsGroupListOpen: (isGroupListOpen: boolean) => set({ isGroupListOpen }),
        isUpdating: false,
        setIsUpdating: (isUpdating: boolean) => set({ isUpdating }),
        isDeleting: false,
        setIsDeleting: (isDeleting: boolean) => set({ isDeleting }),
        isJoining: false,
        setIsJoining: (isJoining: boolean) => set({ isJoining }),
        isLeaving: false,
        setIsLeaving: (isLeaving: boolean) => set({ isLeaving }),
        isDeletingMember: false,
        setIsDeletingMember: (isDeletingMember: boolean) => set({ isDeletingMember }),
        isAddingMember: false,
        setIsAddingMember: (isAddingMember: boolean) => set({ isAddingMember }),
        isConfirmingInvitation: false,
        setIsConfirmingInvitation: (isConfirmingInvitation: boolean) => set({ isConfirmingInvitation }),
        isFilteringStatistics: false,
        setIsFilteringStatistics: (isFilteringStatistics: boolean) => set({ isFilteringStatistics }),
        groups: {} as DataResponse<Group[]>,
        setGroups: (groups: DataResponse<Group[]>) => set({ groups }),
        discussions: {} as DataResponse<Discussion[]>,
        setDiscussions: (discussions: DataResponse<Discussion[]>) => set({ discussions }),
        discussionsById: {} as DataResponse<Discussion[]>,
        setDiscussionsById: (discussionsById: DataResponse<Discussion[]>) => set({ discussionsById }),
        comments: {} as DataResponse<Discussion[]>,
        setComments: (comments: DataResponse<Discussion[]>) => set({ comments }),
        groupStatistic: {} as DataResponse<GroupStatistic>,
        setGroupStatistic: (groupStatistic: DataResponse<GroupStatistic>) => set({ groupStatistic }),
    }
})
