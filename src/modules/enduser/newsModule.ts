import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    return makeRequest(`/blog/back-office/posts`, 'POST', {}, formData)
}

function findAll(page: string = '1', per_page: string = '10', category: string = '', subcategory: string = '') {
    let queries = `?page=${page}&per_page=${per_page}`

    if (category) queries += `&category_id=${category}`

    if (subcategory) queries += `&subcategory_id=${subcategory}`

    return makeRequest(`/news${queries}`, 'GET', {}, null, false)
}

function findOne(id: string) {
    return makeRequest(`/news?id=${id}`)
}

function findNewsCategories() {
    return makeRequest(`/news_categories`)
}

function findNewsSubCategories() {
    return makeRequest(`/news_subcategories`)
}

function update(id: string, formData: FormData) {
    return makeRequest(`/news/${id}?_method=PUT`, 'POST', {}, formData)
}

function remove(id: string) {
    return makeRequest(`/news/${id}`, 'DELETE')
}

export { create, findAll, findOne, update, remove, findNewsCategories, findNewsSubCategories }
