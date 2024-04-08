import { DataResponse } from '@/@types'
import { Article } from '@/@types/Article'
import { create } from 'zustand'

type ArticleStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    isUpdatingBanner: boolean
    setIsUpdatingBanner: (isUpdatingBanner: boolean) => void
    isUpdatingThumbnail: boolean
    setIsUpdatingThumbnail: (isUpdatingThumbnail: boolean) => void
    articles: DataResponse<Article[]>
    setArticles: (articles: DataResponse<Article[]>) => void
    article: DataResponse<Article>
    setArticle: (article: DataResponse<Article>) => void
}

export const articleStore = create<ArticleStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting) => set({ isDeleting }),
    isUpdatingBanner: false,
    setIsUpdatingBanner: (isUpdatingBanner) => set({ isUpdatingBanner }),
    isUpdatingThumbnail: false,
    setIsUpdatingThumbnail: (isUpdatingThumbnail) => set({ isUpdatingThumbnail }),
    articles: {} as DataResponse<Article[]>,
    setArticles: (articles: DataResponse<Article[]>) => set({ articles }),
    article: {} as DataResponse<Article>,
    setArticle: (article: DataResponse<Article>) => set({ article }),
}))
