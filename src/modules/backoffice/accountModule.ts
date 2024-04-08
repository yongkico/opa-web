import { makeRequest } from '../apiModule'

function findOne() {
    return makeRequest(`/account`)
}

function update(formData: FormData) {
    return makeRequest(`/account/update_profile`, 'POST', {}, formData)
}

function updatePassword(urlSearchParams: URLSearchParams) {
    return makeRequest(`/account/reset_password`, 'POST', {}, urlSearchParams)
}

export { findOne, update, updatePassword }
