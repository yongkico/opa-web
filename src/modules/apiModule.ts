const apiUrl = process.env.NEXT_PUBLIC_API_URL
const defaultRequestHeaders: HeadersInit = {
    Accept: 'application/json',
}

export async function makeRequest(
    endpoint: string,
    requestMethod: string = 'GET',
    additionalHeaders?: HeadersInit,
    requestBody?: BodyInit | null,
    needsAuthorize: boolean = true,
) {
    if (needsAuthorize) {
        additionalHeaders = {
            ...additionalHeaders,
            Authorization: `Bearer ${localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN)}`,
        }
    }

    const res = await fetch(`${apiUrl}${endpoint}`, {
        method: requestMethod,
        headers: {
            ...defaultRequestHeaders,
            ...additionalHeaders,
        },
        body: requestBody,
    })

    if (!res.ok) {
        throw await res.json()
    }

    if (res.status === 204) {
        return {}
    }

    return await res.json()
}
