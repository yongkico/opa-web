import { makeRequest } from './apiModule'

async function login(credentials: { email: string; password: string }) {
    const formData = new FormData()

    formData.append('email', credentials.email)
    formData.append('password', credentials.password)

    return await makeRequest(`/authentications/login`, 'POST', {}, formData, false)
}

async function register(credentials: { name: string; email: string; password: string }) {
    const formData = new FormData()

    formData.append('name', credentials.name)
    formData.append('email', credentials.email)
    formData.append('password', credentials.password)

    return await makeRequest(`/authentications/register`, 'POST', {}, formData, false)
}

async function forgotPassword(email: string) {
    const formData = new FormData()

    formData.append('email', email)

    return await makeRequest(`/authentications/forget_password`, 'POST', {}, formData, false)
}

async function resetPassword(formData: FormData) {
    return await makeRequest(`/authentications/reset_password`, 'POST', {}, formData, false)
}

function validateResetPasswordToken(token: string) {
    const formData = new FormData()

    formData.append('token', token)
    return makeRequest('/authentications/validate_token', 'POST', {}, formData, false)
}

function validate() {
    return makeRequest('/authentications/validate', 'POST')
}

function activateAccount(token: string) {
    return makeRequest(`/authentications/activate_account?token=${token}`, 'GET', {}, null, false)
}

export { login, register, forgotPassword, resetPassword, validateResetPasswordToken, validate, activateAccount }
