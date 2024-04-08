import { statisticsStore } from '@/store/backoffice/statisticsStore'
import { Card, CardBody, CardFooter, Chip, CircularProgress } from '@nextui-org/react'
import { JSX } from 'react'

export default function CircularProgressRealizationGrowth(): JSX.Element {
    // global states
    const { statistics } = statisticsStore()

    return (
        <Card className='h-full w-full overflow-hidden border-none bg-transparent shadow-none'>
            <CardBody className='items-center justify-center overflow-hidden pb-0'>
                <CircularProgress
                    classNames={{
                        svg: 'w-full h-full drop-shadow-md',
                        indicator: 'stroke-secondary',
                        track: 'stroke-white/10',
                        value: 'text-3xl font-semibold after:content-["%"]',
                    }}
                    value={statistics.data?.persentase_perkembangan_realisasi || 0}
                    strokeWidth={4}
                    showValueLabel={true}
                    formatOptions={{
                        style: 'percent',
                    }}
                    valueLabel={Number(statistics.data?.persentase_perkembangan_realisasi || 0).toLocaleString(
                        'id-ID',
                        {
                            maximumFractionDigits: 2,
                        },
                    )}
                />
            </CardBody>
            <CardFooter className='items-center justify-center gap-x-4'>
                <div className='flex flex-col items-center gap-1'>
                    <p>Target</p>

                    <Chip radius='sm' variant='bordered' color='secondary'>
                        {Number(statistics.data?.target).toLocaleString('id-ID')} Kg
                    </Chip>
                </div>

                <div className='flex flex-col items-center gap-1'>
                    <p>Realisasi</p>

                    <Chip radius='sm' variant='bordered' color='primary'>
                        {Number(statistics.data?.realisasi).toLocaleString('id-ID')} Kg
                    </Chip>
                </div>
            </CardFooter>
        </Card>
    )
}
