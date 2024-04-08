import { DataResponse } from '@/@types'
import { Target } from '@/@types/Target'
import { create } from 'zustand'

type TargetStore = {
    targets: DataResponse<Target[]>
    setTargets: (targets: DataResponse<Target[]>) => void
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    target: DataResponse<Target>
    setTarget: (target: DataResponse<Target>) => void
}

export const targetStore = create<TargetStore>()((set) => ({
    targets: {} as DataResponse<Target[]>,
    setTargets: (targets: DataResponse<Target[]>) => set({ targets }),
    isFetching: false,
    setIsFetching: (isFetching: boolean) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating: boolean) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating: boolean) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting: boolean) => set({ isDeleting }),
    target: {} as DataResponse<Target>,
    setTarget: (target: DataResponse<Target>) => set({ target }),
}))
