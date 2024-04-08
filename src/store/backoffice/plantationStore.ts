import { DataResponse } from '@/@types'
import { Plantation } from '@/@types/Plantation'
import { create } from 'zustand'

type PlantationStore = {
    plantations: DataResponse<Plantation[]>
    setPlantations: (plantations: DataResponse<Plantation[]>) => void
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    plantation: DataResponse<Plantation>
    setPlantation: (plantation: DataResponse<Plantation>) => void
}

export const plantationStore = create<PlantationStore>()((set) => ({
    plantations: {} as DataResponse<Plantation[]>,
    setPlantations: (plantations: DataResponse<Plantation[]>) => set({ plantations }),
    isFetching: false,
    setIsFetching: (isFetching: boolean) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating: boolean) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating: boolean) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting: boolean) => set({ isDeleting }),
    plantation: {} as DataResponse<Plantation>,
    setPlantation: (plantation: DataResponse<Plantation>) => set({ plantation }),
}))
