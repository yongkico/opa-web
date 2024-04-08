import { Category, DataResponse, SubCategory } from '@/@types'
import { Article } from '@/@types/Article'
import { failToast } from '@/configs/toastConfig'
import { findAll, findArticleCategories, findArticleSubCategories, findOne } from '@/modules/enduser/articleModule'
import { toast } from 'sonner'
import { create } from 'zustand'

type ArticleStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    articles: DataResponse<Article[]>
    initialArticles: DataResponse<Article[]>
    article: Article
    fetchArticle: (id: string) => Promise<void>
    setArticles: (articles: DataResponse<Article[]>) => void
    fetchArticles: (page?: string, per_page?: string, category?: string, subcategory?: string) => Promise<void>
    categories: Category[]
    subCategories: SubCategory[]
    fetchCategories: () => Promise<void>
    fetchSubCategories: () => Promise<void>
}

export const articleStore = create<ArticleStore>()((set, get) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    articles: {} as DataResponse<Article[]>,
    initialArticles: {} as DataResponse<Article[]>,
    setArticles: (articles: DataResponse<Article[]>) => set({ articles }),
    article: {} as Article,
    fetchArticle: async (id: string) => {
        set({ isFetching: true })

        try {
            const res = await findOne(id)

            set({ article: res.data })
        } catch (error) {
            const err = error as DataResponse<string>
            toast(err.message, failToast)
        } finally {
            set({ isFetching: false })
        }
    },
    fetchArticles: async (page?: string, per_page?: string, category?: string, subcategory?: string) => {
        set({ isFetching: true })

        try {
            const res = await findAll(page, per_page, category, subcategory)

            set({ articles: res })

            if (!get().initialArticles.data) {
                set({ initialArticles: res })
            }
        } catch (error) {
            const err = error as DataResponse<string>
            toast(err.message, failToast)
        } finally {
            set({ isFetching: false })
        }
    },
    categories: [],
    subCategories: [],
    fetchCategories: async () => {
        set({ isFetching: true })

        try {
            const res = await findArticleCategories()

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
            const res = await findArticleSubCategories()

            set({ subCategories: res.data })
        } catch (error) {
            const err = error as DataResponse<string>
            toast(err.message, failToast)
        } finally {
            set({ isFetching: false })
        }
    },
}))
