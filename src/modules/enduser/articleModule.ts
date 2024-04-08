import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    return makeRequest(`/blog/back-office/posts`, 'POST', {}, formData)
}

function findAll(page: string = '1', per_page: string = '8', category: string = '', subcategory: string = '') {
    let queries = `?page=${page}&per_page=${per_page}`

    if (category) queries += `&category_id=${category}`

    if (subcategory) queries += `&subcategory_id=${subcategory}`

    return makeRequest(`/articles${queries}`, 'GET', {}, null, false)
}

function findOne(id: string) {
    return makeRequest(`/articles?id=${id}`)
}

function findArticleCategories() {
    return makeRequest(`/article_categories`)
}

function findArticleSubCategories() {
    return makeRequest(`/article_subcategories`)
}

function update(id: string, formData: FormData) {
    return makeRequest(`/articles/${id}?_method=PUT`, 'POST', {}, formData)
}

function remove(id: string) {
    return makeRequest(`/articles/${id}`, 'DELETE')
}

export { create, findAll, findOne, findArticleCategories, findArticleSubCategories, update, remove }
