export type User = {
    id: string
    name: string
    image_url: string
    email: string
    is_active: string
    created_at: string
    updated_at: string
    role_id: string
    role_name: string
    role_created_at: string
    role_updated_at: string
}

export type LoginFailed = {
    status: boolean
    message: string
}
