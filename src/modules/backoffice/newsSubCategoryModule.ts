import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    // req body (name, news_category_id)
    return makeRequest(`/news_subcategories`, 'POST', {}, formData)
}

function findAll() {
    return makeRequest(`/news_subcategories`)
}

function findOne(id: string) {
    return makeRequest(`/news_subcategories?id=${id}`)
}

function update(id: string, name: string, news_category_id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)
    urlSearchParams.append('name', name)
    urlSearchParams.append('news_category_id', news_category_id)

    return makeRequest(`/news_subcategories`, 'POST', {}, urlSearchParams)
}

function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)

    return makeRequest(`/news_subcategories`, 'DELETE', {}, urlSearchParams)
}

export { create, findAll, findOne, update, remove }
