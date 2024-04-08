import { DataResponse } from '@/@types'
import { News } from '@/@types/News'
import { create } from 'zustand'

type NewsStore = {
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
    news: DataResponse<News[]>
    setNews: (news: DataResponse<News[]>) => void
    singleNews: DataResponse<News>
    setSingleNews: (singleNews: DataResponse<News>) => void
}

export const newsStore = create<NewsStore>()((set) => ({
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
    news: {} as DataResponse<News[]>,
    setNews: (news: DataResponse<News[]>) => set({ news }),
    singleNews: {} as DataResponse<News>,
    setSingleNews: (singleNews: DataResponse<News>) => set({ singleNews }),
}))
