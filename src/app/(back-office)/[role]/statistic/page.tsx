'use client'

import { JSX, useEffect, useState } from 'react'
import { AssetsDashboard } from '@/assets/index'
import Image from 'next/image'
import AssetStatisticPage1 from '@/assets/webp/asset-statistic-page-1.webp'
import { useStatistics } from '@/hooks/backoffice/useStatistics'
import { statisticsStore } from '@/store/backoffice/statisticsStore'
import { useEffectOnce } from 'usehooks-ts'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { Plantation } from '@/@types/Plantation'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import Loading from '@/components/partials/Loading'
import RealizationTargetLineChart from '@/components/partials/backoffice/Charts/Statistics/Line/RealizationTargetLineChart'
import RevenueLineChart from '@/components/partials/backoffice/Charts/Statistics/Line/RevenueLineChart'
import ProductivityLineChart from '@/components/partials/backoffice/Charts/Statistics/Line/ProductivityLineChart'
import NumberOfStemsLineChart from '@/components/partials/backoffice/Charts/Statistics/Line/NumberOfStemsLineChart'
import TBSLineChart from '@/components/partials/backoffice/Charts/Statistics/Line/TBSLineChart'
import NumberOfStemsMaxMinLineChart from '@/components/partials/backoffice/Charts/Statistics/Line/NumberOfStemsMaxMinLineChart'
import RBTMaxMinLineChart from '@/components/partials/backoffice/Charts/Statistics/Line/RBTMaxMinLineChart'
import { useGlobal } from '@/hooks/backoffice/useGlobal'
import { globalStore } from '@/store/backoffice/global'
import CircularProgressRealizationGrowth from '@/components/partials/backoffice/CircularProgress/Statistics/CircularProgressRealizationGrowth'

export default function Statistic(): JSX.Element {
    // states
    const [selectedValue, setSelectedValue] = useState<{ id: string; year: string }>({} as { id: string; year: string })
    const [isRunned, setIsRunned] = useState<boolean>(false)

    // custom hooks
    const { getStatistics } = useStatistics()
    const { getPlantations } = usePlantation()
    const { getAllYears } = useGlobal()

    // global states
    const { statistics, isFetching } = statisticsStore()
    const { plantations } = plantationStore()
    const { years } = globalStore()

    useEffectOnce(() => {
        getPlantations()
    })

    useEffect(() => {
        if (!isRunned) {
            if (plantations.status) {
                getAllYears(plantations.data[0].id)
                setSelectedValue((prev) => ({ ...prev, id: plantations.data[0].id }))
            }

            if (years.status) {
                getStatistics(plantations.data[0].id, years.data[0].harvest_year)
                setSelectedValue((prev) => ({ ...prev, year: years.data[0].harvest_year }))
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plantations.status, years.status, isRunned])

    return (
        <main className='container space-y-4 px-0 py-4 md:py-8 lg:space-y-8'>
            {/* filter section */}
            <section className='apply-dark space-y-4 rounded-lg bg-white p-4 lg:p-8'>
                <p className='text-xl font-bold'>Filter Kebun</p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()

                        getStatistics(e.currentTarget.plantation_id.value, e.currentTarget.year.value)
                    }}
                >
                    <div className='flex flex-col items-end justify-between gap-4 md:flex-row'>
                        <Select
                            onChange={(e) => {
                                setIsRunned(true)
                                getAllYears(e.target.value)
                                setSelectedValue((prev) => ({ ...prev, id: e.target.value }))
                            }}
                            classNames={{
                                listbox: 'dark:text-light',
                                trigger: 'border apply-dark',
                            }}
                            labelPlacement='outside'
                            radius='sm'
                            placeholder='Pilih kebun'
                            name='plantation_id'
                            variant='bordered'
                            aria-label='Pilih Kebun'
                            isDisabled={isFetching}
                            selectedKeys={[selectedValue.id]}
                        >
                            {plantations.data?.map((plantation: Plantation) => (
                                <SelectItem aria-label='Pilih Kebun' key={plantation.id} value={plantation.id}>
                                    {plantation.nama}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            onChange={(e) => {
                                setSelectedValue((prev) => ({ ...prev, year: e.target.value }))
                            }}
                            classNames={{
                                listbox: 'dark:text-light',
                                trigger: 'border apply-dark',
                            }}
                            labelPlacement='outside'
                            placeholder='Pilih Tahun'
                            radius='sm'
                            name='year'
                            variant='bordered'
                            aria-label='Year'
                            isDisabled={isFetching}
                            selectedKeys={[selectedValue.year]}
                        >
                            {years.data?.map((year) => (
                                <SelectItem key={year.harvest_year} value={year.harvest_year}>
                                    {year.harvest_year}
                                </SelectItem>
                            ))}
                        </Select>

                        <Button
                            className='w-full md:w-max'
                            type='submit'
                            color='primary'
                            radius='sm'
                            isLoading={isFetching}
                        >
                            Filter
                        </Button>
                    </div>
                </form>
            </section>

            {/* pendapatan section */}
            <section className='relative'>
                {/* loading */}
                {isFetching && (
                    <div className='absolute inset-0 z-20 flex h-screen items-center justify-center rounded-lg backdrop-blur-sm'>
                        <Loading />
                    </div>
                )}

                <div className='relative overflow-hidden rounded-t-lg bg-primary p-4 text-white lg:p-8'>
                    {/* blob */}
                    <div className='absolute -left-20 -top-6 h-48 w-48 rounded-full bg-accent'></div>

                    <Image
                        className='absolute -left-4 top-8 w-20 lg:-left-6 lg:w-28'
                        src={AssetsDashboard.asset_cash}
                        alt='Cash'
                    />

                    <div className='relative flex flex-col gap-y-4 md:ml-24'>
                        <div className='flex justify-end gap-x-8 lg:justify-start'>
                            <p className='font-medium lg:text-2xl'>Pendapatan</p>
                        </div>

                        <div className='flex flex-col items-end gap-x-8 gap-y-4 lg:flex-row'>
                            <p className='text-3xl font-bold md:text-4xl'>
                                {Number(statistics.data?.total_pendapatan[0].total_tandan || 0).toLocaleString(
                                    'id-ID',
                                    {
                                        style: 'currency',
                                        currency: 'IDR',
                                        maximumFractionDigits: 0,
                                    },
                                )}
                            </p>

                            {/* <p className='font-medium'>+1,49% dari tahun lalu</p> */}
                        </div>
                    </div>
                </div>

                {/* charts */}
                <div className='apply-dark flex flex-col gap-x-8 rounded-b-xl bg-white p-4 lg:flex-row'>
                    <div className='lg:w-3/4'>
                        <RevenueLineChart />
                    </div>

                    <Image
                        className='-mb-4 hidden object-contain object-bottom lg:block lg:w-1/4'
                        src={AssetStatisticPage1}
                        alt='Chart'
                    />
                </div>
            </section>

            {/* realitation section */}
            <section className='relative space-y-4 lg:space-y-8'>
                <div className='flex flex-col gap-4 md:flex-row lg:gap-8'>
                    {/* target */}
                    <div className='apply-dark w-full rounded-lg bg-white p-4 md:w-2/3'>
                        <p className='mb-4 text-center text-xl font-bold lg:mb-8'>Target & Realisasi</p>

                        <RealizationTargetLineChart />
                    </div>

                    {/* growth */}
                    <div className='apply-dark w-full rounded-lg bg-white p-4 md:w-1/3'>
                        <p className='mb-2 text-center text-xl font-bold '>Perkembangan Realisasi</p>

                        <div className='p-4'>
                            {/* <RealizationGrowthDoughnutChart /> */}
                            <CircularProgressRealizationGrowth />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8'>
                    {/* price tbs/kg */}
                    <div className='apply-dark w-full rounded-lg bg-white p-4'>
                        <p className='mb-4 text-center text-xl font-bold lg:mb-8'>Harga TBS</p>

                        <TBSLineChart />
                    </div>

                    {/* sum of stems */}
                    <div className='apply-dark w-full rounded-lg bg-white p-4'>
                        <p className='mb-4 text-center text-xl font-bold lg:mb-8'>Jumlah Tandan</p>

                        <NumberOfStemsLineChart />
                    </div>
                </div>
            </section>
            {/* end of realitation section */}

            {/* produktivitas vs standar section */}
            <section className='apply-dark space-y-4 rounded-lg bg-white p-4 lg:space-y-8 lg:p-8'>
                <div className='flex flex-col justify-between gap-4 sm:flex-row'>
                    <p className='text-xl font-bold'>Produktivitas vs Standar</p>

                    <p>ton TBS /ha /tahun</p>
                </div>

                <div>
                    <ProductivityLineChart />
                </div>
            </section>
            {/* end of produktivitas vs standar section */}

            {/* sum of stems and rbt section */}
            <section>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8'>
                    {/* price tbs/kg */}
                    <div className='apply-dark w-full rounded-lg bg-white p-4 lg:p-8'>
                        <p className='mb-4 text-center text-xl font-bold lg:mb-8'>Jumlah Tandan vs Standar</p>

                        <NumberOfStemsMaxMinLineChart />
                    </div>

                    {/* sum of stems */}
                    <div className='apply-dark w-full rounded-lg bg-white p-4 lg:p-8'>
                        <p className='mb-4 text-center text-xl font-bold lg:mb-8'>RBT vs Standar</p>

                        <RBTMaxMinLineChart />
                    </div>
                </div>
            </section>
            {/* end of sum of stems and rbt section */}
        </main>
    )
}
