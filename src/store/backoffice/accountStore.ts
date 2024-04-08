import { DataResponse } from '@/@types'
import { User } from '@/@types/Auth'
import { create } from 'zustand'

type AccountStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isUpdatingProfile: boolean
    setIsUpdatingProfile: (isUpdatingProfile: boolean) => void
    isUpdatingPassword: boolean
    setIsUpdatingPassword: (isUpdatingPassword: boolean) => void
    profile: DataResponse<User>
    setProfile: (profile: DataResponse<User>) => void
}

export const accountStore = create<AccountStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    isUpdatingProfile: false,
    setIsUpdatingProfile: (isUpdatingProfile) => set({ isUpdatingProfile }),
    isUpdatingPassword: false,
    setIsUpdatingPassword: (isUpdatingPassword) => set({ isUpdatingPassword }),
    profile: {} as DataResponse<User>,
    setProfile: (profile) => set({ profile }),
}))
