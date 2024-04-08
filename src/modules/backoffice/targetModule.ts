import { makeRequest } from '../apiModule'

async function findAll() {
    return makeRequest(`/harvest_targets`)
}

async function findByQuery(kebun_id: string, tahun: string, users_id: string) {
    return makeRequest(`/harvest_targets/filter?kebun_id=${kebun_id}&tahun=${tahun}&users_id=${users_id}`)
}

async function findOne(id: string) {
    return makeRequest(`/harvest_targets?id=${id}`)
}

async function create(formData: FormData) {
    return makeRequest(`/harvest_targets`, 'POST', {}, formData)
}

async function update(urlSearchParams: URLSearchParams) {
    return makeRequest(`/harvest_targets`, 'PUT', {}, urlSearchParams)
}

async function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id.toString())

    return makeRequest(`/harvest_targets/${id}`, 'DELETE', {}, urlSearchParams)
}

export { findAll, findOne, findByQuery, create, update, remove }
