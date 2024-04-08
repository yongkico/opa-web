export type GroupMember = {
    id: string
    name: string
    email: string
    image_url: string
}

export type Group = {
    id: string
    deskripsi: string
    nama: string
    created_by: string
    created_at: string
    anggota: GroupMember[]
}

export type Discussion = {
    id: string
    konten: string
    created_at: string
    id_grup: string
    nama_grup: string
    deskripsi_grup: string
    created_at_grup: string
    id_user: string
    nama_user: string
    image_user: string
    email_user: string
    is_active_user: string
    created_at_user: string
    id_role: string
    nama_role: string
    created_at_role: string
    created_by: string
}

export type Comment = {
    id: string
    konten: string
    created_at: string
    id_diskusi: string
    konten_diskusi: string
    created_at_diskusi: string
    id_grup: string
    nama_grup: string
    deskripsi_grup: string
    created_at_grup: string
    id_user: string
    nama_user: string
    image_user: string
    email_user: string
    is_active_user: string
    created_at_user: string
    created_by: string
    id_role: string
    nama_role: string
    created_at_role: string
}

export type GroupStatistic = {
    land_area: number
    tree_number: number
    weigth: number
    ffb_quantity: number
    total_price: number
    productivity: number
    average_ffb_quantity: number
    average_ffb_weight: number
}
