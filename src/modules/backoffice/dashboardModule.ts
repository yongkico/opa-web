import { makeRequest } from '../apiModule'

function findAll(plantation_id: string, year: string) {
    return makeRequest(`/dashboards?plantation_id=${plantation_id}&year=${year}`)
}

export { findAll }
