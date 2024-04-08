import { DataResponse } from '@/@types'
import { Conclusion } from '@/@types/Conclusion'
import { create } from 'zustand'

type ConclusionStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    conclusions: DataResponse<Conclusion[]>
    setConclusions: (conclusions: DataResponse<Conclusion[]>) => void
    conclusion: DataResponse<Conclusion>
    setConclusion: (conclusion: DataResponse<Conclusion>) => void
    initialPage: number
    setInitialPage: (initialPage: number) => void
}

export const conclusionStore = create<ConclusionStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting) => set({ isDeleting }),
    conclusions: {} as DataResponse<Conclusion[]>,
    setConclusions: (conclusions: DataResponse<Conclusion[]>) => set({ conclusions }),
    conclusion: {} as DataResponse<Conclusion>,
    setConclusion: (conclusion: DataResponse<Conclusion>) => set({ conclusion }),
    initialPage: 1,
    setInitialPage: (initialPage) => set({ initialPage }),
}))
