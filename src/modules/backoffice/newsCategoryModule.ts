import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    // req body (name)
    return makeRequest(`/news_categories`, 'POST', {}, formData)
}

function findAll() {
    return makeRequest(`/news_categories`)
}

function findOne(id: string) {
    return makeRequest(`/news_categories?id=${id}`)
}

function update(id: string, name: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)
    urlSearchParams.append('name', name)

    return makeRequest(`/news_categories`, 'POST', {}, urlSearchParams)
}

function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)

    return makeRequest(`/news_categories`, 'DELETE', {}, urlSearchParams)
}

export { create, findAll, findOne, update, remove }
