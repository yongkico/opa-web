import { DataResponse } from '@/@types'
import { Harvest } from '@/@types/Harvest'
import { create } from 'zustand'

type HarvestStore = {
    harvests: DataResponse<Harvest[]>
    setHarvests: (harvests: DataResponse<Harvest[]>) => void
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    harvest: DataResponse<Harvest>
    setHarvest: (harvest: DataResponse<Harvest>) => void
}

export const harvestStore = create<HarvestStore>()((set) => ({
    harvests: {} as DataResponse<Harvest[]>,
    setHarvests: (harvests: DataResponse<Harvest[]>) => set({ harvests }),
    isFetching: false,
    setIsFetching: (isFetching: boolean) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating: boolean) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating: boolean) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting: boolean) => set({ isDeleting }),
    harvest: {} as DataResponse<Harvest>,
    setHarvest: (harvest: DataResponse<Harvest>) => set({ harvest }),
}))
