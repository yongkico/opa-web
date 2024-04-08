import { DataResponse } from '@/@types'
import { NewsSubCategory } from '@/@types/News'
import { create } from 'zustand'

type NewsSubCategoryStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    newsSubCategories: DataResponse<NewsSubCategory[]>
    setNewsSubCategories: (newsSubCategories: DataResponse<NewsSubCategory[]>) => void
    newsSubCategory: NewsSubCategory
    setNewsSubCategory: (newsSubCategory: NewsSubCategory) => void
}

export const newsSubCategoryStore = create<NewsSubCategoryStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting) => set({ isDeleting }),
    newsSubCategories: {} as DataResponse<NewsSubCategory[]>,
    setNewsSubCategories: (newsSubCategories: DataResponse<NewsSubCategory[]>) => set({ newsSubCategories }),
    newsSubCategory: {} as NewsSubCategory,
    setNewsSubCategory: (newsSubCategory: NewsSubCategory) => set({ newsSubCategory }),
}))
