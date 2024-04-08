import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    return makeRequest(`/conclusions`, 'POST', {}, formData)
}

function findAll(page: string = '1', per_page: string = '10') {
    let queries = `?page=${page}&per_page=${per_page}`

    return makeRequest(`/conclusions${queries}`)
}

function findOne(id: string) {
    return makeRequest(`/conclusions?id=${id}`)
}

function update(urlSearchParams: URLSearchParams) {
    // req body (id, conclusion_id)

    return makeRequest(`/conclusions`, 'PUT', {}, urlSearchParams)
}

function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)

    return makeRequest(`/conclusions`, 'DELETE', {}, urlSearchParams)
}

export { create, findAll, findOne, update, remove }
