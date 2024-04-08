'use client'

import { Plantation } from '@/@types/Plantation'
import RainfallBarChart from '@/components/partials/backoffice/Charts/Rainfall/Bar/RainfallBarChart'
import RainFallTabel from '@/components/partials/backoffice/Tables/Rainfall/RainFallTabel'
import { useGlobal } from '@/hooks/backoffice/useGlobal'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { useRainfall } from '@/hooks/backoffice/useRainfall'
import { globalStore } from '@/store/backoffice/global'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { rainfallStore } from '@/store/backoffice/rainfallStore'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { JSX, useEffect, useRef, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

export default function Rainfall(): JSX.Element {
    // states
    const [selectedValue, setSelectedValue] = useState<{ id: string; year: string }>({} as { id: string; year: string })
    const [isRunned, setIsRunned] = useState<boolean>(false)

    // custom hooks
    const { getRainfalls, getAnnualRainfalls } = useRainfall()
    const { getPlantations } = usePlantation()
    const { getAllYears } = useGlobal()

    // global states
    const { plantations } = plantationStore()
    const { isFetching } = rainfallStore()
    const { years } = globalStore()

    useEffectOnce(() => {
        getPlantations()
    })

    useEffect(() => {
        if (!isRunned) {
            if (plantations.status) {
                getAllYears(plantations.data[0].id)
                getAnnualRainfalls(plantations.data[0].id)
                setSelectedValue((prev) => ({ ...prev, id: plantations.data[0].id }))
            }

            if (years.status) {
                getRainfalls(plantations.data[0].id, years.data[0].harvest_year)
                setSelectedValue((prev) => ({ ...prev, year: years.data[0].harvest_year }))
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plantations.status, years.status, isRunned])

    // refs
    const addressRef = useRef<HTMLParagraphElement | null>(null)

    useEffectOnce(() => {
        getPlantations()
    })

    return (
        <main className='container space-y-4 px-0 py-4 md:py-8 lg:space-y-8'>
            <section className='apply-dark rounded-lg bg-white p-4 md:p-8'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()

                        getRainfalls(e.currentTarget.plantation_id.value, e.currentTarget.year.value)

                        getAnnualRainfalls(e.currentTarget.plantation_id.value)

                        // get address
                        addressRef.current!.textContent = plantations.data.filter(
                            (p: Plantation) => p.id === e.currentTarget.plantation_id.value,
                        )[0]?.alamat
                    }}
                    className='flex flex-col items-center gap-x-10 gap-y-4 md:flex-row'
                >
                    <p className='w-max whitespace-nowrap text-base md:text-lg'>Filter Grafik Curah Hujan</p>

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
                </form>
            </section>

            {/* chart's title  */}
            <section className='apply-dark mb-8 flex flex-col items-center justify-between space-y-4 rounded-lg bg-white p-4 md:items-start md:space-y-8 md:p-8'>
                <header>
                    <h1 className='text-center text-lg md:text-left md:text-2xl'>
                        Grafik Curah Hujan 5 Tahun Terakhir
                    </h1>

                    <p ref={addressRef} className='text-center text-sm text-grey md:text-left'>
                        {addressRef.current?.textContent}
                    </p>
                </header>

                <RainfallBarChart />
            </section>

            <section className='mt-16'>
                <RainFallTabel />
            </section>
        </main>
    )
}
