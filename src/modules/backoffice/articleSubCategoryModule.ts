import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    // req body (name, article_category_id)
    return makeRequest(`/article_subcategories`, 'POST', {}, formData)
}

function findAll() {
    return makeRequest(`/article_subcategories`)
}

function findOne(id: string) {
    return makeRequest(`/article_subcategories?id=${id}`)
}

function update(id: string, name: string, article_category_id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)
    urlSearchParams.append('name', name)
    urlSearchParams.append('article_category_id', article_category_id)

    return makeRequest(`/article_subcategories`, 'POST', {}, urlSearchParams)
}

function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)

    return makeRequest(`/article_subcategories`, 'DELETE', {}, urlSearchParams)
}

export { create, findAll, findOne, update, remove }
