export type Article = {
    id: string
    title: string
    content: string
    banner_image_url: string
    thumbnail_image_url: string
    created_at: string
    updated_at: string
    created_by: string
    article_category_id: string
    article_category_name: string
    article_subcategory_id: string
    article_subcategory_name: string
}

export type ArticleCategory = {
    id: string
    name: string
    created_at: string
    updated_at: string
}

export type ArticleSubCategory = {
    id: string
    name: string
    created_at: string
    updated_at: string
    article_category_id: string
    article_category_name: string
    article_category_created_at: string
    article_category_updated_at: string
}
