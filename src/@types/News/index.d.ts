export type News = {
    id: string
    title: string
    content: string
    banner_image_url: string
    thumbnail_image_url: string
    created_at: string
    updated_at: string
    created_by: string
    news_category_id: string
    news_category_name: string
    news_subcategory_id: string
    news_subcategory_name: string
}

export type NewsCategory = {
    id: string
    name: string
    created_at: string
    updated_at: string
}

export type NewsSubCategory = {
    id: string
    name: string
    created_at: string
    updated_at: string
    article_category_id: string
    article_category_name: string
    article_category_created_at: string
    article_category_updated_at: string
}
