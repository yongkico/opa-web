import { DataResponse } from '@/@types'
import { News } from '@/@types/News'
import { failToast } from '@/configs/toastConfig'
import { findAll, findNewsCategories, findNewsSubCategories, findOne } from '@/modules/enduser/newsModule'
import { toast } from 'sonner'
import { create } from 'zustand'

type NewsStore = {
    isFetching: boolean
    news: DataResponse<News[]>
    initialNews: DataResponse<News[]>
    singleNews: News
    categories: []
    subCategories: []
    setIsFetching: (isFetching: boolean) => void
    fetchNews: (page?: string, per_page?: string, category?: string, subcategory?: string) => Promise<void>
    fetchSingleNews: (id: string) => Promise<void>
    fetchCategories: () => Promise<void>
    fetchSubCategories: () => Promise<void>
}

export const newsStore = create<NewsStore>()((set, get) => ({
    isFetching: false,
    news: {} as DataResponse<News[]>,
    initialNews: {} as DataResponse<News[]>,
    singleNews: {} as News,
    categories: [],
    subCategories: [],
    setIsFetching: (isFetching) => set({ isFetching }),
    fetchNews: async (page?: string, per_page?: string, category?: string, subcategory?: string) => {
        set({ isFetching: true })

        try {
            const res = await findAll(page, per_page, category, subcategory)

            set({ news: res })

            if (!get().initialNews.data) {
                set({ initialNews: res })
            }
        } catch (error) {
            const err = error as DataResponse<string>
            toast(err.message, failToast)
        } finally {
            set({ isFetching: false })
        }
    },
    fetchSingleNews: async (id: string) => {
        set({ isFetching: true })

        try {
            const res = await findOne(id)

            set({ singleNews: res.data })
        } catch (error) {
            const err = error as DataResponse<string>
            toast(err.message, failToast)
        } finally {
            set({ isFetching: false })
        }
    },
    fetchCategories: async () => {
        set({ isFetching: true })

        try {
            const res = await findNewsCategories()

            set({ categories: res.data })
        } catch (error) {
            const err = error as DataResponse<string>
            toast(err.message, failToast)
        } finally {
            set({ isFetching: false })
        }
    },
    fetchSubCategories: async () => {
        set({ isFetching: true })

        try {
            const res = await findNewsSubCategories()

            set({ subCategories: res.data })
        } catch (error) {
            const err = error as DataResponse<string>
            toast(err.message, failToast)
        } finally {
            set({ isFetching: false })
        }
    },
}))
