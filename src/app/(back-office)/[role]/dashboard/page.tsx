'use client'

import { AssetsDashboard } from '@/assets'
import CardStats from '@/components/partials/backoffice/Cards/CardStats'
import { cn, formatNumberToLocal, getPeriod, getRole, setPeriodAsset, setPeriodMascotAsset } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Legend } from 'chart.js'
import { userStore } from '@/store/userStore'
import { useDashboard } from '@/hooks/backoffice/useDashboard'
import { useEffectOnce } from 'usehooks-ts'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { Plantation } from '@/@types/Plantation'
import { useGlobal } from '@/hooks/backoffice/useGlobal'
import { globalStore } from '@/store/backoffice/global'
import { dashboardStore } from '@/store/backoffice/dashboardStore'
import RealizationTargetLineChart from '@/components/partials/backoffice/Charts/Dashboard/Line/RealizationTargetLineChart'
import Loading from '@/components/partials/Loading'
import { useEffect, useState } from 'react'
import CircularProgressRealizationGrowth from '@/components/partials/backoffice/CircularProgress/Dashboard/CircularProgressRealizationGrowth'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Legend)

export default function Dashboard() {
    // states
    const [selectedValue, setSelectedValue] = useState<{ id: string; year: string }>({} as { id: string; year: string })
    const [isRunned, setIsRunned] = useState<boolean>(false)

    // global states
    const { loggedInUser } = userStore()
    const { plantations, isFetching } = plantationStore()
    const { years } = globalStore()
    const { dashboard, isFetching: isFetchingDashboard } = dashboardStore()

    // custom hooks
    const { getPlantations } = usePlantation()
    const { getDashboard } = useDashboard()
    const { getAllYears } = useGlobal()

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
                getDashboard(plantations.data[0].id, years.data[0].harvest_year)
                setSelectedValue((prev) => ({ ...prev, year: years.data[0].harvest_year }))
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plantations.status, years.status, isRunned])

    return (
        <main className='container px-0 py-4 md:py-8'>
            {isFetchingDashboard && <Loading isFullScreen />}

            <section
                className={`${cn(
                    'relative flex items-center gap-x-4 overflow-hidden rounded-lg px-4 py-8 dark:bg-primary',
                    {
                        'bg-[#f3e8fe]': getPeriod() === 'Selamat Pagi',
                        'bg-[#FFF1BD] dark:bg-[#eccf64]': getPeriod() === 'Selamat Siang',
                        'bg-[#FFC296] dark:bg-[#e49963]': getPeriod() === 'Selamat Sore',
                        'bg-[#271A2C] text-white dark:bg-[#271A2C]': getPeriod() === 'Selamat Malam',
                    },
                )}`}
            >
                {/* background image */}
                <Image
                    className='absolute bottom-0 right-0 w-28 -scale-x-100 transform md:left-0 md:w-32 md:scale-x-100'
                    src={setPeriodAsset()}
                    alt='Asset'
                />

                {/* TODO based on time */}
                <header className='relative md:pl-40'>
                    <h1 className='text-base font-medium md:text-xl'>{getPeriod()}</h1>

                    <p className='text-2xl font-bold md:text-3xl'>{loggedInUser.data?.name}!</p>
                </header>

                <Image
                    className='bottom-0 right-0 hidden w-24 md:absolute md:block md:w-48'
                    src={setPeriodMascotAsset()}
                    alt='Asset Congratulations'
                />
            </section>

            {/* filter section */}
            <section className='apply-dark mt-4 space-y-4 rounded-lg bg-white p-4 lg:mt-8 lg:p-8'>
                <header>
                    <h2 className='text-2xl'>Filter Kebun</h2>
                </header>

                {/* form field filter */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()

                        getDashboard(e.currentTarget.plantation_id.value, e.currentTarget.year.value)
                    }}
                >
                    <div className='grid grid-cols-1 items-end gap-4 md:grid-cols-3'>
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
                            isLoading={isFetchingDashboard}
                        >
                            Filter
                        </Button>
                    </div>
                </form>

                <hr className='apply-dark' />

                {/* filter result */}
                <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
                    <div className='relative h-full w-full overflow-hidden rounded-lg bg-primary px-8 py-12 md:py-16 lg:w-1/3'>
                        {/* image */}
                        <Image
                            className='absolute right-0 top-0 z-10 w-16'
                            src={AssetsDashboard.asset_cash}
                            alt='Asset Cash'
                        />

                        {/* blob */}
                        <div className='absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent'></div>

                        <p className='absolute left-4 top-2 text-xl font-semibold text-light'>Pendapatan</p>

                        <p className='relative z-20 text-center text-2xl font-bold text-light sm:text-3xl lg:text-4xl'>
                            {Number(dashboard.data?.pendapatan || 0).toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0,
                            })}
                        </p>
                    </div>

                    <div className='grid w-full grid-cols-2 gap-4 p-2 lg:w-2/3'>
                        <div>
                            <p className='text-sm text-slate-400'>Luas Kebun</p>

                            <p className='whitespace-nowrap font-bold md:text-xl'>
                                {formatNumberToLocal(dashboard.data?.luas_kebun) || '-'}{' '}
                                {formatNumberToLocal(dashboard.data?.luas_kebun) && 'Ha'}
                            </p>
                        </div>

                        <div>
                            <p className='text-sm text-slate-400'>Jumlah Pohon</p>

                            <p className='whitespace-nowrap font-bold md:text-xl'>
                                {formatNumberToLocal(dashboard.data?.jumlah_pohon) || '-'}
                            </p>
                        </div>

                        <div>
                            <p className='text-sm text-slate-400'>Populasi</p>

                            <p className='whitespace-nowrap font-bold md:text-xl'>
                                {formatNumberToLocal(dashboard.data?.populasi?.toFixed(2).toString()) || '-'}
                            </p>
                        </div>

                        <div>
                            <p className='text-sm text-slate-400'>Tahun Tanam</p>

                            <p className='whitespace-nowrap font-bold md:text-xl'>
                                {dashboard.data?.tahun_tanam || '-'}
                            </p>
                        </div>

                        <div>
                            <p className='text-sm text-slate-400'>Topografi</p>

                            <p className='whitespace-nowrap font-bold md:text-xl'>
                                {formatNumberToLocal(dashboard.data?.topografi_dominan) || '-'}
                            </p>
                        </div>

                        <div>
                            <p className='text-sm text-slate-400'>Jenis Tanah</p>

                            <p className='whitespace-nowrap font-bold md:text-xl'>
                                {formatNumberToLocal(dashboard.data?.jenis_tanah_dominan) || '-'}
                            </p>
                        </div>

                        <div>
                            <p className='text-sm text-slate-400'>Varietas</p>

                            <p className='whitespace-nowrap font-bold md:text-xl'>
                                {formatNumberToLocal(dashboard.data?.varietas_bibit) || '-'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* stats section */}
            <section className='mt-4 lg:mt-8'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
                    <CardStats type='Produktivitas' stats={dashboard.data?.produktivitas} />

                    <CardStats type='Rerata Berat Tandan' stats={dashboard.data?.rerata_berat_tandan} />

                    <CardStats type='Rerata Jumlah Tandan' stats={dashboard.data?.rerata_jumlah_tandan} />
                </div>
            </section>

            {/* charts section */}
            <section className='mt-4 lg:mt-8'>
                <div className='apply-dark space-y-8 rounded-lg bg-white p-4 lg:p-8'>
                    <Link className='block text-right' href={`/${getRole(loggedInUser.data.role_name)}/statistic`}>
                        <span className='font-bold text-primary hover:underline'>Lihat Semua</span>
                    </Link>

                    <div className='flex flex-col gap-8 md:flex-row'>
                        {/* target */}
                        <div className='apply-dark w-full rounded-lg bg-white md:w-2/3 md:p-4 lg:p-8'>
                            <p className='mb-4 text-center text-xl font-bold lg:mb-8'>Target Realisasi</p>

                            <RealizationTargetLineChart />
                        </div>

                        <hr className='apply-dark md:hidden' />

                        {/* growth */}
                        <div className='apply-dark w-full rounded-lg bg-white md:w-1/3 md:p-4 lg:p-8'>
                            <p className='mb-4 text-center text-xl font-bold lg:mb-8'>Perkembangan Realisasi</p>

                            <div className='p-4 lg:p-0'>
                                <CircularProgressRealizationGrowth />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* model prediction section coming soon */}
            <section className='mt-4 space-y-4 lg:mt-8 lg:space-y-8'>
                <div className='apply-dark flex items-center gap-x-4 rounded-lg bg-white p-4'>
                    <Image
                        className='h-16 w-16 object-contain'
                        src={AssetsDashboard.asset_dashboard_star}
                        alt='Asset Prediction'
                    />

                    <p className='font-bold md:text-xl'>{dashboard.data?.kriteria_produktivitas_kebun}</p>
                </div>

                <div className='h-80'>
                    {/* <AgronomyTable /> */}
                    <div className='apply-dark flex h-full flex-col items-center justify-center rounded-lg bg-white p-4 text-primary lg:p-8'>
                        <p className=''>Verifikasi Agronomi</p>

                        <p className='text-2xl font-bold md:text-3xl'>Coming Soon</p>
                    </div>
                </div>

                <div className='h-80'>
                    <div className='apply-dark flex h-full flex-col items-center justify-center rounded-lg bg-white p-4 text-primary lg:p-8'>
                        <p className=''>Rekomendasi Pupuk</p>

                        <p className='text-2xl font-bold md:text-3xl'>Coming Soon</p>
                    </div>
                </div>

                <div className='h-80'>
                    <div className='apply-dark flex h-full flex-col items-center justify-center rounded-lg bg-white p-4 text-primary lg:p-8'>
                        <p className=''>Rekomendasi Artikel</p>

                        <p className='text-2xl font-bold md:text-3xl'>Coming Soon</p>
                    </div>
                </div>
            </section>
            {/* end of model prediction section coming soon */}
        </main>
    )
}
