import { makeRequest } from '../apiModule'

async function findAll(plantation_id: string, year: string) {
    let queries = ''

    if (plantation_id && year) {
        queries = `?plantation_id=${plantation_id}&year=${year}`
    }

    return makeRequest(`/rainfall${queries}`)
}

async function findAllAnnual(plantation_id: string) {
    let queries = ''

    if (plantation_id) {
        queries = `?plantation_id=${plantation_id}`
    }

    return makeRequest(`/rainfall/annual${queries}`)
}

export { findAll, findAllAnnual }
