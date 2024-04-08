import { makeRequest } from '../apiModule'

async function findAll() {
    return makeRequest(`/plantations`)
}

async function findOne(id: string) {
    return makeRequest(`/plantations?id=${id}`)
}

async function create(formData: FormData) {
    return makeRequest(`/plantations`, 'POST', {}, formData)
}

async function update(urlSearchParams: URLSearchParams) {
    return makeRequest(`/plantations`, 'PUT', {}, urlSearchParams)
}

async function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id.toString())

    return makeRequest(`/plantations`, 'DELETE', {}, urlSearchParams)
}

export { findAll, findOne, create, update, remove }
