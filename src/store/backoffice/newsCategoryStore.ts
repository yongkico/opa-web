import { DataResponse } from '@/@types'
import { NewsCategory } from '@/@types/News'
import { create } from 'zustand'

type NewsCategoryStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    newsCategories: DataResponse<NewsCategory[]>
    setNewsCategories: (newsCategories: DataResponse<NewsCategory[]>) => void
    newsCategory: NewsCategory
    setNewsCategory: (newsCategory: NewsCategory) => void
}

export const newsCategoryStore = create<NewsCategoryStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting) => set({ isDeleting }),
    newsCategories: {} as DataResponse<NewsCategory[]>,
    setNewsCategories: (newsCategories: DataResponse<NewsCategory[]>) => set({ newsCategories }),
    newsCategory: {} as NewsCategory,
    setNewsCategory: (newsCategory: NewsCategory) => set({ newsCategory }),
}))
