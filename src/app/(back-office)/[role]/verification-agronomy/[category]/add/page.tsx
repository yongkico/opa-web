'use client'

import { JSX, useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function Create(): JSX.Element {
    // states
    const [isContinued, setIsContinued] = useState<boolean>(false)

    return (
        <div className='container min-h-screen space-y-4 p-4 lg:space-y-8 lg:p-8'>
            {/* select options section */}
            <section>
                <div
                    className={`${
                        !isContinued ? 'opacity-100' : 'pointer-events-none bg-slate-200 opacity-40'
                    } apply-dark space-y-4 rounded-lg border p-4 lg:space-y-8 lg:p-8`}
                >
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8'>
                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>Kebun</label>

                            <select className='input-primary' name='' id=''>
                                <option value=''>Pilih Kebun</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>Semester</label>

                            <select className='input-primary' name='' id=''>
                                <option value=''>Pilih Semester</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>Tahun Produksi</label>

                            <select className='input-primary' name='' id=''>
                                <option value=''>Pilih Produksi</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>Tanggal Pengamatan</label>

                            <select className='input-primary' name='' id=''>
                                <option value=''>Pilih Kebun</option>
                            </select>
                        </div>
                    </div>

                    <div
                        className={`${
                            !isContinued ? 'p-2 opacity-100' : 'h-0 p-0 opacity-0'
                        } rounded-lg bg-primary/20 text-primary`}
                    >
                        <div className='flex items-center gap-x-2 border-b border-primary/50 p-2'>
                            <ExclamationCircleIcon className='h-5 w-5' />

                            <span className='font-bold'>Informasi</span>
                        </div>

                        <ul className='list-disc p-2 pl-8 font-semibold'>
                            <li>
                                Pengamatan/verifikasi sebaiknya dilakukan pada Bulan Desember untuk Semester I dan Bulan
                                Juni untuk Semester II.
                            </li>

                            <li>
                                Untuk petunjuk penentuan pohon contoh dapat membaca artikel ini: cara menentukan pohon
                                contoh untuk quality control agronomi
                            </li>
                        </ul>
                    </div>

                    <div className='py-4'>
                        <button onClick={() => setIsContinued(true)} className='btn-primary mx-auto block'>
                            Simpan dan Lanjut
                        </button>
                    </div>
                </div>
            </section>
            {/* end of select options section */}

            {/* trees section */}
            <section>
                <div
                    className={`${
                        isContinued ? 'opacity-100' : 'pointer-events-none bg-slate-200 opacity-40'
                    } apply-dark space-y-4 rounded-lg border p-4 lg:space-y-8 lg:p-8`}
                >
                    <div
                        className={`${
                            isContinued ? 'p-2 opacity-100' : 'h-0 p-0 opacity-0'
                        } rounded-lg bg-primary/20 text-primary`}
                    >
                        <div className='flex items-center gap-x-2 border-b border-primary/50 p-2'>
                            <ExclamationCircleIcon className='h-5 w-5' />

                            <span className='font-bold'>Informasi</span>
                        </div>

                        <ul className='list-disc p-2 pl-8 font-semibold'>
                            <li>
                                Luas Kebun F adalah 1,42 ha, jumlah pohon sampel yang harus diambil adalah 10 sampel.
                            </li>

                            <li>
                                Untuk petunjuk penentuan pohon contoh dapat membaca artikel ini: cara menentukan pohon
                                contoh untuk verifikasi agronomi.
                            </li>
                        </ul>
                    </div>

                    <div className='space-y-4 lg:space-y-8'>
                        {Array.from({ length: 10 }).map((_, index: number) => (
                            <div
                                key={`tree-${index}`}
                                className='flex items-center justify-between gap-4 rounded-lg p-4 even:bg-primary/10 md:p-2 lg:gap-x-16'
                            >
                                <label className='md:whitespace-nowrap' htmlFor=''>
                                    Kebun F Pohon {index + 1}
                                </label>

                                <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:gap-16'>
                                    <input className='input-primary' type='text' placeholder='Jumlah Pelepah' />

                                    <input className='input-primary' type='text' placeholder='Jumlah Bunga' />

                                    <input className='input-primary' type='text' placeholder='Jumlah Buah' />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-center gap-4 p-4'>
                        <button className='btn-primary'>Simpan</button>

                        <button className='btn-secondary'>Selesai</button>
                    </div>
                </div>
            </section>
            {/* end of trees section */}
        </div>
    )
}
