import { makeRequest } from '../apiModule'

function create(formData: FormData) {
    return makeRequest(`/news`, 'POST', {}, formData)
}

function findAll(page: string = '1', per_page: string = '10', category: string = '', subcategory: string = '') {
    let queries = `?page=${page}&per_page=${per_page}`

    if (category) queries = `/category=${category}`

    if (subcategory) queries = `/subcategory=${subcategory}`

    return makeRequest(`/news${queries}`, 'GET', {}, null, false)
}

function findOne(id: string) {
    return makeRequest(`/news?id=${id}`)
}

function findNewsCategories() {
    return makeRequest(`/news_categories`)
}

function findNewsSubCategories() {
    return makeRequest(`/news_subcategories`)
}

function update(urlSearchParams: URLSearchParams) {
    // req body (id, title, content, news_category_id, news_subcategory_id, updated_by_id)

    return makeRequest(`/news`, 'PUT', {}, urlSearchParams)
}

function updateBannerImage(formData: FormData) {
    return makeRequest(`/news/change_banner_image`, 'POST', {}, formData)
}

function updateThumbnailImage(formData: FormData) {
    return makeRequest(`/news/change_thumbnail_image`, 'POST', {}, formData)
}

function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id)

    return makeRequest(`/news`, 'DELETE', {}, urlSearchParams)
}

export {
    create,
    findAll,
    findOne,
    update,
    remove,
    findNewsCategories,
    findNewsSubCategories,
    updateBannerImage,
    updateThumbnailImage,
}
