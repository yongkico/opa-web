import { makeRequest } from '../apiModule'

async function findAll() {
    return makeRequest(`/groups`)
}

async function create(formData: FormData) {
    // req body (name, description, user_id)

    return makeRequest(`/groups`, 'POST', {}, formData)
}

async function update(urlSearchParams: URLSearchParams) {
    // req body (name, description, id)
    return makeRequest(`/groups`, 'PUT', {}, urlSearchParams)
}

async function remove(id: string) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id.toString())

    return makeRequest(`/groups`, 'DELETE', {}, urlSearchParams)
}

async function join(urlSearchParams: URLSearchParams) {
    // req body (user_id, group_id)

    return makeRequest(`/groups/join`, 'POST', {}, urlSearchParams)
}

async function left(urlSearchParams: URLSearchParams) {
    // req body (user_id, group_id)

    return makeRequest(`/groups/left`, 'POST', {}, urlSearchParams)
}

async function findAllDiscussions() {
    return makeRequest(`/groups/discussion`)
}

async function findAllDiscussionsByGroupId(group_id: string) {
    // req body (group_id)

    return makeRequest(`/groups/discussion?group_id=${group_id}`)
}

async function createDiscussion(formData: FormData) {
    // req body (content, group_id)

    return makeRequest(`/groups/discussion`, 'POST', {}, formData)
}

async function findOneDiscussion(id: string) {
    return makeRequest(`/groups/discussion?id=${id}`)
}

async function updateDiscussion(urlSearchParams: URLSearchParams) {
    // req body (content, group_id, id)

    return makeRequest(`/groups/discussion`, 'PUT', {}, urlSearchParams)
}

async function removeDiscussion(id: string) {
    // req body (id)
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('id', id.toString())

    return makeRequest(`/groups/discussion`, 'DELETE', {}, urlSearchParams)
}

async function findAllCommentsByDiscussionId(limit: string, discussion_id: string) {
    return makeRequest(`/groups/comment?limit=${limit}&discussion_id=${discussion_id}`)
}

async function createComment(formData: FormData) {
    // req body (content, discussion_id)

    return makeRequest(`/groups/comment`, 'POST', {}, formData)
}

async function findOneComment(id: string) {
    return makeRequest(`/groups/comment?id=${id}`)
}

async function updateComment(urlSearchParams: URLSearchParams) {
    // req body (content, discussion_id, id)

    return makeRequest(`/groups/comment`, 'PUT', {}, urlSearchParams)
}

async function removeComment(urlSearchParams: URLSearchParams) {
    return makeRequest(`/groups/comment`, 'DELETE', {}, urlSearchParams)
}

async function findGroupStatistic(group_id: string, start_date: string, end_date: string) {
    let queries = `?group_id=${group_id}`

    if (start_date && end_date) {
        queries += `&start_date=${start_date}&end_date=${end_date}`
    }

    return makeRequest(`/groups/statistic${queries}`)
}

async function addMember(urlSearchParams: URLSearchParams) {
    return makeRequest(`/groups/invite_member`, 'POST', {}, urlSearchParams)
}

async function removeMember(urlSearchParams: URLSearchParams) {
    return makeRequest(`/groups/remove_member`, 'POST', {}, urlSearchParams)
}

async function confirmInvitation(urlSearchParams: URLSearchParams) {
    return makeRequest(`/groups/confirm_invitation`, 'POST', {}, urlSearchParams)
}

export {
    findAll,
    create,
    update,
    remove,
    join,
    left,
    findAllDiscussions,
    findAllDiscussionsByGroupId,
    createDiscussion,
    findOneDiscussion,
    updateDiscussion,
    removeDiscussion,
    findAllCommentsByDiscussionId,
    createComment,
    findOneComment,
    updateComment,
    removeComment,
    findGroupStatistic,
    addMember,
    removeMember,
    confirmInvitation,
}
