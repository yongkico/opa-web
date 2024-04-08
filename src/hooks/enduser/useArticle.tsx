import { findAll } from '@/modules/enduser/articleModule'

export function useArticle() {
    async function getArticles() {
        try {
            const res = await findAll()

            return res
        } catch (error) {
            console.log(error)

            throw error
        }
    }

    return { getArticles }
}
