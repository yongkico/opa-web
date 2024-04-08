import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    return makeRequest(`/seed_varieties`, 'POST', {}, formData)
}

function findAll() {
    return makeRequest(`/seed_varieties`)
}

function findOne(id: string) {
    return makeRequest(`/seed_varieties?id=${id}`)
}

function update(urlSearchParams: URLSearchParams) {
    return makeRequest(`/seed_varieties`, 'PUT', {}, urlSearchParams)
}

function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)

    return makeRequest(`/seed_varieties`, 'DELETE', {}, urlSearchParams)
}

export { create, findAll, findOne, update, remove }
