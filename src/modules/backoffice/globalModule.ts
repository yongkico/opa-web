import { makeRequest } from '../apiModule'

async function findAllVarieties() {
    return makeRequest(`/seed_varieties`)
}

async function findAllYears(plantation_id: string) {
    return makeRequest(`/harvests/year?plantation_id=${plantation_id}`)
}

export { findAllVarieties, findAllYears }
