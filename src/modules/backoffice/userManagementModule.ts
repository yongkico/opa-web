import { makeRequest } from '../apiModule'

async function findAll() {
    return makeRequest(`/users`)
}

async function findOne(id: string) {
    return makeRequest(`/users?id=${id}`)
}

async function create(formData: FormData) {
    return makeRequest(`/users`, 'POST', {}, formData)
}

async function update(urlSearchParams: URLSearchParams) {
    return makeRequest(`/users`, 'PUT', {}, urlSearchParams)
}

async function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id.toString())

    return makeRequest(`/users/${id}`, 'DELETE', {}, urlSearchParams)
}

export { findAll, findOne, create, update, remove }
