import { DataResponse } from '@/@types'
import { Variety } from '@/@types/Variety'
import { create } from 'zustand'

type VarietyStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    varieties: DataResponse<Variety[]>
    setVarieties: (varieties: DataResponse<Variety[]>) => void
    variety: DataResponse<Variety>
    setVariety: (variety: DataResponse<Variety>) => void
}

export const varietyStore = create<VarietyStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting) => set({ isDeleting }),
    varieties: {} as DataResponse<Variety[]>,
    setVarieties: (varieties: DataResponse<Variety[]>) => set({ varieties }),
    variety: {} as DataResponse<Variety>,
    setVariety: (variety: DataResponse<Variety>) => set({ variety }),
}))
