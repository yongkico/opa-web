import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { JSX } from 'react'
export default function ManualStep1(): JSX.Element {
    return (
        <div>
            {/* filter section */}
            <section className='apply-dark mb-8 rounded-lg border p-4 lg:p-8'>
                <div className='flex flex-col items-start justify-between gap-4 lg:flex-row'>
                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor='farm'>Kebun</label>

                        <select className='input-primary' name='farm' id='farm'>
                            <option value=''>Kebun A</option>

                            <option value=''>Kebun B</option>
                        </select>
                    </div>

                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor='year'>Tahun Rekomendasi Pupuk</label>

                        <select className='input-primary' name='year' id='year'>
                            <option value=''>2022</option>

                            <option value=''>2023</option>
                        </select>

                        <small className='text-primary'>Rekomendasi pupuk berdasarkan target panen Anda </small>
                    </div>

                    <div className='self-center'>
                        <button className='btn-icon'>
                            <MagnifyingGlassIcon className='h-6 w-6' />

                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </section>
            {/* end of filter section */}

            <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8'>
                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Luas Kebun</label>

                    <input className='input-primary' type='text' placeholder='Masukkan luas kebun' />
                </div>

                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Tahun Tanam</label>

                    <select className='input-primary'>
                        <option>Pilih tahun</option>
                    </select>
                </div>

                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Jumlah Pohon</label>

                    <select className='input-primary'>
                        <option>Masukkan jumlah pohon</option>
                    </select>
                </div>

                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Umur Tanaman</label>

                    <select className='input-primary'>
                        <option>Pilih umur tanaman</option>
                    </select>
                </div>

                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Populasi</label>

                    <select className='input-primary'>
                        <option>322</option>
                    </select>
                </div>

                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Rotasi Panen</label>

                    <select className='input-primary'>
                        <option>9</option>
                    </select>
                </div>

                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Jenis Tanah</label>

                    <select className='input-primary'>
                        <option>Liat</option>
                    </select>
                </div>

                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Jenis Topografi</label>

                    <select className='input-primary'>
                        <option>Datar</option>
                    </select>
                </div>

                <div className='flex w-full flex-col'>
                    <label htmlFor=''>Varietas</label>

                    <select className='input-primary'>
                        <option>Pusat Penelitian Kelapa Sawit (PPKS)</option>
                    </select>
                </div>

                <div className='flex w-full flex-col justify-end'>
                    <label htmlFor=''>Lokasi Kebun</label>

                    <input type='text' placeholder='Masukkan lokasi kebun' className='input-primary' />
                </div>

                <div className='flex w-full flex-col justify-end'>
                    <label htmlFor=''>Target Panen</label>

                    <input type='text' placeholder='Target panen' className='input-primary' />
                </div>
            </div>

            <div className='apply-dark grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2 lg:gap-8'>
                <div className='flex flex-col justify-between'>
                    <label htmlFor=''>Estimasi Produksi</label>

                    <span>*(Ton / Ha / 2 bulan - atau - Ton / Ha / 6 bulan)</span>

                    <div className='flex flex-col gap-y-4'>
                        <select className='input-primary mt-2'>
                            <option selected>6 Bulan</option>
                        </select>

                        <input
                            className='input-primary'
                            type='text'
                            placeholder='Estimasi Produksi dalam Periode 6 Bulan'
                        />
                    </div>
                </div>

                <div className='flex w-full flex-col'>
                    <label className='mb-2'>Jumlah Bunga dan Buah (trossen telling) jika ada</label>

                    <small className='mb-2 text-primary'>
                        *Baca <strong>petunjuk trossen telling</strong> untuk info lebih lanjut
                    </small>

                    <div className='flex flex-col gap-4 md:flex-row'>
                        <input type='text' placeholder='Masukkan jumlah bunga' className='input-primary w-full' />

                        <input type='text' placeholder='Masukkan jumlah buah' className='input-primary w-full' />
                    </div>
                </div>
            </div>

            <section className='p-4 lg:p-8'>
                <Link href={'/member/fertilizer/manual?step=2'} className='btn-primary mx-auto block w-max'>
                    Lanjut
                </Link>
            </section>
        </div>
    )
}
