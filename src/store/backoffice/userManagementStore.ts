import { DataResponse } from '@/@types'
import { User } from '@/@types/Auth'
import { create } from 'zustand'

type UserManagementStore = {
    users: DataResponse<User[]>
    setUsers: (users: DataResponse<User[]>) => void
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    user: DataResponse<User>
    setUser: (user: DataResponse<User>) => void
}

export const userManagementStore = create<UserManagementStore>()((set) => ({
    users: {} as DataResponse<User[]>,
    setUsers: (users: DataResponse<User[]>) => set({ users }),
    isFetching: false,
    setIsFetching: (isFetching: boolean) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating: boolean) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating: boolean) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting: boolean) => set({ isDeleting }),
    user: {} as DataResponse<User>,
    setUser: (user: DataResponse<User>) => set({ user }),
}))
