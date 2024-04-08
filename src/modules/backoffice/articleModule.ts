import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    return makeRequest(`/articles`, 'POST', {}, formData)
}

function findAll(page: string = '1', per_page: string = '10', category: string = '', subcategory: string = '') {
    let queries = `?page=${page}&per_page=${per_page}`

    if (category) queries = `/category=${category}`

    if (subcategory) queries = `/subcategory=${subcategory}`

    return makeRequest(`/articles${queries}`, 'GET', {}, null, false)
}

function findOne(id: string) {
    return makeRequest(`/articles?id=${id}`)
}

function update(urlSearchParams: URLSearchParams) {
    // req body (id, title, content, article_category_id, article_subcategory_id, updated_by_id)

    return makeRequest(`/articles`, 'PUT', {}, urlSearchParams)
}

function updateBannerImage(formData: FormData) {
    return makeRequest(`/articles/change_banner_image`, 'POST', {}, formData)
}

function updateThumbnailImage(formData: FormData) {
    return makeRequest(`/articles/change_thumbnail_image`, 'POST', {}, formData)
}

function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)

    return makeRequest(`/articles`, 'DELETE', {}, urlSearchParams)
}

export { create, findAll, findOne, update, remove, updateBannerImage, updateThumbnailImage }
