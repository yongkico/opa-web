export type Plantation = {
    alamat: string
    created_at_role: string
    created_at_user: string
    created_at_varietas: string
    date_created: string
    email_user: string
    id: string
    id_role: string
    id_user: string
    id_varietas: string
    image_user: string
    is_active_user: string
    jenis_tanah_dominan: string
    jenis_topografi_dominan: string
    jumlah_pohon: string
    latitude: string
    longitude: string
    luas: string
    nama: string
    nama_role: string
    nama_user: string
    nama_varietas: string
    rotasi_panen: string
    tahun_tanam: string
}

export type DetailPlantation = {
    id: string
    name: string
    land_area: string
    number_tree: string
    planting_year: string
    harvest_rotation: string
    topography: string
    soil: string
    address: string
    latitude: string
    longitude: string
    created_at: string
    updated_at: string
    variety_id: string
    variety_name: string
    variety_created_at: string
    variety_updated_at: string
    user_id: string
    user_name: string
    user_image: string
    user_email: string
    user_is_active: string
    user_created_at: string
    user_updated_at: string
    role_id: string
    role_name: string
    role_created_at: string
    role_updated_at: string
}
