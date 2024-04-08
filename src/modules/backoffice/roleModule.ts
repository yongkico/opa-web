import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    return makeRequest(`/roles`, 'POST', {}, formData)
}

function findAll(page: string = '1', per_page: string = '10') {
    let queries = `?page=${page}&per_page=${per_page}`

    return makeRequest(`/roles${queries}`)
}

function findOne(id: string) {
    return makeRequest(`/roles?id=${id}`)
}

function update(urlSearchParams: URLSearchParams) {
    // req body (id, conclusion_id)

    return makeRequest(`/roles`, 'PUT', {}, urlSearchParams)
}

function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)

    return makeRequest(`/roles`, 'DELETE', {}, urlSearchParams)
}

export { create, findAll, findOne, update, remove }
