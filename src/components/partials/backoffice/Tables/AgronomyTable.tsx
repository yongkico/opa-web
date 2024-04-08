import { cn } from '@/utils'
import Link from 'next/link'
import { JSX } from 'react'

enum Criteria {
    NO_VERIFIED = 'NO_VERIFIED',
    NORMAL = 'NORMAL',
    LIGHT = 'LIGHT',
    MEDIUM = 'MEDIUM',
    WEIGHT = 'WEIGHT',
}

type Agronomy = {
    verification: string
    date: string
    status: string
    info: string
    criteria: {
        type: string
        desc: string
    }
}

const agronomyData: Agronomy[] = [
    {
        verification: 'Jumlah Populasi',
        date: '10 Maret 2040',
        status: 'Sudah Verifikasi',
        info: '115',
        criteria: {
            type: 'NORMAL',
            desc: 'Dibawah Standar',
        },
    },

    {
        verification: 'Jumlah Populasi',
        date: '10 Maret 2040',
        status: 'Belum Verifikasi',
        info: '115',
        criteria: {
            type: 'LIGHT',
            desc: 'Dibawah Standar',
        },
    },
    {
        verification: 'Jumlah Populasi',
        date: '10 Maret 2040',
        status: 'Sudah Verifikasi',
        info: '115',
        criteria: {
            type: 'WEIGHT',
            desc: 'Dibawah Standar',
        },
    },
    {
        verification: 'Jumlah Populasi',
        date: '10 Maret 2040',
        status: 'Belum Verifikasi',
        info: '115',
        criteria: {
            type: 'NO_VERIFIED',
            desc: 'Dibawah Standar',
        },
    },
    {
        verification: 'Jumlah Populasi',
        date: '10 Maret 2040',
        status: 'Sudah Verifikasi',
        info: '115',
        criteria: {
            type: 'MEDIUM',
            desc: 'Dibawah Standar',
        },
    },
]

export default function AgronomyTable(): JSX.Element {
    return (
        <div className='apply-dark space-y-8 rounded-lg bg-white p-4 shadow md:p-8'>
            <div className='flex justify-between font-bold'>
                <p>Verifikasi Agronomi</p>

                <Link href='#'>
                    <span className='text-primary hover:underline'>Lihat Semua</span>
                </Link>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full'>
                    <thead className='border-b text-gray-400'>
                        <tr>
                            <th>Verifikasi</th>

                            <th>Tanggal</th>

                            <th>Status Verifikasi</th>

                            <th>Nilai/Keterangan</th>

                            <th>Kriteria</th>

                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {agronomyData.map((item: Agronomy, index: number) => (
                            <tr key={`item-${index}`} className='apply-dark border-b font-bold'>
                                <td>
                                    <span>Jumlah Populasi</span>
                                </td>

                                <td>
                                    <span className='text-gray-400'>10 Maret 2023</span>
                                </td>

                                <td>
                                    <span
                                        className={`${cn({
                                            'text-green-500': item.status === 'Sudah Verifikasi',
                                            'text-red-600': item.status === 'Belum Verifikasi',
                                        })} whitespace-nowrap`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className='text-center'>
                                    115 <span className='text-xs text-gray-400'>Pohon</span>
                                </td>

                                <td>
                                    <div className='flex items-center gap-x-2'>
                                        <span
                                            className={`${cn({
                                                'bg-gray-500 text-light': item.criteria.type === Criteria.NO_VERIFIED,
                                                'bg-green-500 text-light': item.criteria.type === Criteria.NORMAL,
                                                'bg-yellow-500 text-light': item.criteria.type === Criteria.LIGHT,
                                                'bg-orange-500 text-light': item.criteria.type === Criteria.MEDIUM,
                                                'bg-red-600 text-light': item.criteria.type === Criteria.WEIGHT,
                                            })} aspect-square h-4 w-4 whitespace-nowrap rounded-full text-center`}
                                        ></span>

                                        <span>Di bawah standar</span>
                                    </div>
                                </td>

                                <td>
                                    <Link href='/member/verification-agronomy'>
                                        <span className='text-sm underline'>Lihat Detail</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex flex-wrap items-center justify-center gap-4'>
                <div className='flex items-center gap-x-2'>
                    <div className='w-max rounded-full bg-gray-500 p-3'></div>

                    <span className='text-sm'>Belum Diverifikasi</span>
                </div>

                <div className='flex items-center gap-x-2'>
                    <div className='w-max rounded-full bg-green-500 p-3'></div>

                    <span className='text-sm'>Normal</span>
                </div>

                <div className='flex items-center gap-x-2'>
                    <div className='w-max rounded-full bg-yellow-500 p-3'></div>

                    <span className='text-sm'>Ringan</span>
                </div>

                <div className='flex items-center gap-x-2'>
                    <div className='w-max rounded-full bg-orange-500 p-3'></div>

                    <span className='text-sm'>Sedang</span>
                </div>

                <div className='flex items-center gap-x-2'>
                    <div className='w-max rounded-full bg-red-600 p-3'></div>

                    <span className='text-sm'>Berat</span>
                </div>
            </div>
        </div>
    )
}
