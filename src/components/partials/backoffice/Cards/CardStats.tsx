import { DashboardStat } from '@/@types/Dashboard'
import { AssetsDashboard } from '@/assets'
import { cn, formatNumberToLocal } from '@/utils'
import { ArrowDownIcon, ArrowUpIcon, Bars2Icon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'

export default function CardStats({ type, stats }: { type: string; stats: DashboardStat }) {
    const pickedVariant = (variant: string) => {
        switch (variant) {
            case 'Tinggi':
                return 'bg-green-500/90'
            case 'Rendah':
                return 'bg-red-500/90'
            case 'Normal':
                return 'bg-gray-500/90'
            default:
                return 'bg-primary'
        }
    }

    return (
        <div
            className={`${pickedVariant(stats?.kategori)} relative overflow-hidden rounded-lg p-4 font-bold text-white`}
        >
            <div className='relative z-10 space-y-4'>
                <p className='text-xl'>{type}</p>

                <p className='text-5xl'>
                    {formatNumberToLocal(stats?.nilai?.toFixed(2).toString()) || 0}{' '}
                    <span className='text-base'>ton/ha</span>
                </p>

                <p>{formatNumberToLocal(stats?.persentase_dari_standar?.toFixed(2).toString()) || 0}% dari standar</p>

                <div
                    className={cn('w-max rounded-full px-4', {
                        'bg-green-700': stats?.kategori === 'Tinggi',
                        'bg-gray-700': stats?.kategori === 'Normal',
                        'bg-red-700': stats?.kategori === 'Rendah',
                    })}
                >
                    <small>
                        {stats?.kategori === 'Tinggi'
                            ? 'Tinggi'
                            : stats?.kategori === 'Normal'
                              ? 'Normal'
                              : stats?.kategori === 'Rendah'
                                ? 'Rendah'
                                : 'Tidak ada data'}
                    </small>
                </div>
            </div>

            {stats?.kategori === 'Tinggi' && <ArrowUpIcon className='absolute right-4 top-4 h-6 w-6' />}

            {stats?.kategori === 'Normal' && <Bars2Icon className='absolute right-4 top-4 h-6 w-6' />}

            {stats?.kategori === 'Rendah' && <ArrowDownIcon className='absolute right-4 top-4 h-6 w-6' />}

            {/* blob */}
            <div
                className={cn('absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-accent', {
                    'bg-green-600': stats?.kategori === 'Tinggi',
                    'bg-gray-600': stats?.kategori === 'Normal',
                    'bg-red-600': stats?.kategori === 'Rendah',
                })}
            ></div>

            {/* image blob*/}
            {stats?.kategori === 'Tinggi' && (
                <Image
                    className='absolute bottom-0 right-0 w-20'
                    src={AssetsDashboard.asset_productivity}
                    alt='Asset Produktivitas'
                />
            )}

            {stats?.kategori === 'Normal' && (
                <Image
                    className='absolute bottom-0 right-0 w-20'
                    src={AssetsDashboard.asset_summary}
                    alt='Asset Produktivitas'
                />
            )}

            {stats?.kategori === 'Rendah' && (
                <Image
                    className='absolute bottom-0 right-0 w-20'
                    src={AssetsDashboard.asset_weight}
                    alt='Asset Produktivitas'
                />
            )}
        </div>
    )
}
