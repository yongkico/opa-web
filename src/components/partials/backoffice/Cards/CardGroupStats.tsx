import { JSX } from 'react'
import { cn, formatNumberToLocal } from '@/utils'

export default function CardGroupStats({ type, stat }: { type: string; stat: number }): JSX.Element {
    return (
        <div className={`relative overflow-hidden rounded-lg bg-primary p-4 font-bold text-white`}>
            <div className='relative z-10 space-y-4'>
                <p className='text-lg'>{type}</p>

                {type === 'Produktivitas' && (
                    <p className='text-5xl'>
                        {formatNumberToLocal(stat.toFixed(2).toString()) || 0} <span className='text-base'>ton/ha</span>
                    </p>
                )}

                {type === 'Rerata Jumlah Tandan' && (
                    <p className='text-5xl'>
                        {formatNumberToLocal(stat.toFixed(2).toString()) || 0}{' '}
                        <span className='text-base'>tandan/pohon</span>
                    </p>
                )}

                {type === 'Rerata Berat Tandan' && (
                    <p className='text-5xl'>
                        {formatNumberToLocal(stat.toFixed(2).toString()) || 0} <span className='text-base'>Kg</span>
                    </p>
                )}

                <div className={cn('w-max rounded-full px-4', {})}></div>
            </div>

            {/* blob */}
            <div className={cn('absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-accent', {})}></div>
        </div>
    )
}
