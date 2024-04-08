export type Dashboard = {
    luas_kebun: string
    jumlah_pohon: string
    populasi: number
    tahun_tanam: string
    topografi_dominan: string
    jenis_tanah_dominan: string
    varietas_bibit: string
    pendapatan: string
    produktivitas: DashboardStat
    rerata_jumlah_tandan: DashboardStat
    rerata_berat_tandan: DashboardStat
    grafik_target_realisasi: {
        month: string
        target: number
        realisasii: string
    }[]
    grafik_perkembangan_realisasi: number
    target: number
    realisasi: string
    kriteria_produktivitas_kebun: string
}

export type DashboardStat = {
    nilai: number
    persentase_dari_standar: number
    kategori: string
}
