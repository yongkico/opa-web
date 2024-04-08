import { makeRequest } from '../apiModule'

async function findAll(plantation_id: string, year: string) {
    return makeRequest(`/statistics?plantation_id=${plantation_id}&year=${year}`)
}

export { findAll }
