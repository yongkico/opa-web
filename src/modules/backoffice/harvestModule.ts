import { makeRequest } from '../apiModule'

async function findAll() {
    return makeRequest(`/harvests`)
}

async function findByQuery(kebun_id: string, tahun: string, users_id: string) {
    return makeRequest(`/harvests/filter?kebun_id=${kebun_id}&tahun=${tahun}&users_id=${users_id}`)
}

async function findOne(id: string) {
    return makeRequest(`/harvests?id=${id}`)
}

async function create(formData: FormData) {
    return makeRequest(`/harvests`, 'POST', {}, formData)
}

async function update(urlSearchParams: URLSearchParams) {
    return makeRequest(
        `/harvests/`,
        'PUT',
        {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        urlSearchParams.toString(),
    )
}

async function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id.toString())

    return makeRequest(`/harvests/`, 'DELETE', {}, urlSearchParams)
}

export { findAll, findOne, findByQuery, create, update, remove }
