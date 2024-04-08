export type DataResponse<T> = {
    status: boolean
    message: string
    data: T
    access_token?: string
    pagination?: PaginationType
}

export type ErrorResponse<T> = {
    status: boolean
    message: T
    data: any
}

export type PaginationType = {
    total: number
    current_page: number
    per_page: number
    first_page: number
    first_page_url: string
    last_page: number
    last_page_url: string
    next_page_url: string
    prev_page_url: string
    from: number
    to: number
}

export type FeatureCard = {
    title: string
    bg_color: string
    asset: string
}

export type Category = {
    id: number
    name: string
}

export type Category = {
    id: number
    name: string
}

export type SubCategory = {
    id: number
    name: string
    article_category_id: number
    article_category_name: string
}

export type descriptionTnc = {
    id: number
    name: string
}

export type Tnc = {
    id: number
    title: string
    description: descriptionTnc[]
}

export type NavLink = {
    name: string
    url: string
    asset: string
    query?: string
}

export type Year = {
    harvest_year: string
}
