import { DataResponse } from '@/@types'
import { ArticleSubCategory } from '@/@types/Article'
import { create } from 'zustand'

type ArticleSubCategoryStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    articleSubCategories: DataResponse<ArticleSubCategory[]>
    setArticleSubCategories: (articleSubCategories: DataResponse<ArticleSubCategory[]>) => void
    articleSubCategory: ArticleSubCategory
    setArticleSubCategory: (articleSubCategory: ArticleSubCategory) => void
}

export const articleSubCategoryStore = create<ArticleSubCategoryStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting) => set({ isDeleting }),
    articleSubCategories: {} as DataResponse<ArticleSubCategory[]>,
    setArticleSubCategories: (articleSubCategories: DataResponse<ArticleSubCategory[]>) =>
        set({ articleSubCategories }),
    articleSubCategory: {} as ArticleSubCategory,
    setArticleSubCategory: (articleSubCategory: ArticleSubCategory) => set({ articleSubCategory }),
}))
