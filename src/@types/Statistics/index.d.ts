export type Statistics = {
    persentase_perkembangan_realisasi: number
    realisasi: number
    target: number
    harga_tbs_per_kg: {
        bulan: string
        harga_tandan_per_kg: string
        id_kebun: string
        tahun: string
    }[]
    jumlah_tandan: {
        bulan: string
        id_kebun: string
        tahun: string
        total_tandan: string
    }[]
    jumlah_tandan_per_pohon: {
        bulan: string
        jumlah_tandan_per_pohon: number
        max: number
        min: number
    }[]
    pendapatan: {
        bulan: string
        id_kebun: string
        pendapatan: string
        tahun: string
    }[]
    produktivitas: {
        bulan: string
        max: number
        min: number
        produktivitas: number
    }[]
    rerata_berat_tandan: {
        bulan: string
        jumlah_tandan_per_pohon: number
        max: number
        min: number
    }[]
    target_realisasi: {
        bulan: string
        id_kebun: string
        realisasi: string
        tahun: string
        target: number
    }[]
    total_pendapatan: {
        id_kebun: string
        tahun: string
        total_tandan: string
    }[]
}
