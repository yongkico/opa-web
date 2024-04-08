'use client'

import { ChangeEvent, JSX, useState } from 'react'
import TargetTable from '@/components/partials/backoffice/Tables/Target/TargetTable'
import AddTargetModal from '@/components/partials/backoffice/Modals/Target/AddTargetModal'
import { Target } from '@/@types/Target'
import { useAsyncList } from '@react-stately/data'
import { useEffectOnce } from 'usehooks-ts'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { useTarget } from '@/hooks/backoffice/useTarget'
import { Input } from '@nextui-org/react'
// import { useGlobal } from '@/hooks/backoffice/useGlobal'
// import { plantationStore } from '@/store/backoffice/plantationStore'
// import { globalStore } from '@/store/backoffice/global'
// import { Button, Select, SelectItem } from '@nextui-org/react'
// import { Plantation } from '@/@types/Plantation'

export default function Target(): JSX.Element {
    // states
    const [searchText, setSearchText] = useState<string>('')

    // custom hooks
    const { getPlantations } = usePlantation()
    const { getTargets } = useTarget()
    // const { getAllYears } = useGlobal()

    // global states
    // const { plantations } = plantationStore()
    // const { years } = globalStore()

    useEffectOnce(() => {
        getPlantations()
        // getAllYears('85')
    })

    // load data with asynclist react stately
    const asyncListOfTargets = useAsyncList({
        async load() {
            const res = await getTargets()

            return {
                items: res.data as Target[],
            }
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    const first = a[sortDescriptor.column as keyof Target]
                    const second = b[sortDescriptor.column as keyof Target]
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1
                    }

                    return cmp
                }),
            }
        },
    })

    return (
        <>
            <main className='container space-y-4 px-0 py-4 md:space-y-8 md:py-8'>
                {/* filter section */}
                {/* <section className='space-y-4 rounded-lg'>
                    <p className='text-xl font-bold'>Filter Hasil Target</p>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <div className='flex flex-col items-end justify-between gap-4 md:flex-row'>
                            <Select
                                onChange={(e) => {
                                    getAllYears(e.target.value)
                                }}
                                classNames={{
                                    listbox: 'dark:text-light',
                                }}
                                labelPlacement='outside'
                                label='Pilih Kebun'
                                radius='sm'
                                placeholder='Pilih kebun'
                                name='plantation_id'
                                variant='bordered'
                                aria-label='Pilih Kebun'
                                defaultSelectedKeys={['85']}
                            >
                                {plantations.data?.map((plantation: Plantation) => (
                                    <SelectItem aria-label='Pilih Kebun' key={plantation.id} value={plantation.id}>
                                        {plantation.nama}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                classNames={{
                                    listbox: 'dark:text-light',
                                }}
                                labelPlacement='outside'
                                label='Pilih Tahun'
                                placeholder='Pilih Tahun'
                                radius='sm'
                                name='year'
                                variant='bordered'
                                aria-label='Year'
                                defaultSelectedKeys={['2022']}
                            >
                                {years.data?.map((year) => (
                                    <SelectItem key={year.harvest_year} value={year.harvest_year}>
                                        {year.harvest_year}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Button className='w-full md:w-max' type='submit' color='primary' radius='sm'>
                                Filter
                            </Button>
                        </div>
                    </form>
                </section> */}

                <section className='apply-dark rounded-lg bg-white p-4 lg:p-8'>
                    <div className='flex flex-row justify-between gap-4 md:flex-row md:items-end'>
                        <AddTargetModal list={asyncListOfTargets} />

                        <div className='order-1 flex flex-col gap-y-1 md:order-2'>
                            <Input
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setSearchText(e.currentTarget.value)
                                }}
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                variant='bordered'
                                radius='sm'
                                labelPlacement='outside'
                                type='text'
                                placeholder='Pencarian...'
                            />
                        </div>
                    </div>
                </section>

                <section>
                    <div className='overflow-x-auto'>
                        <TargetTable list={asyncListOfTargets} searchText={searchText} />
                    </div>
                </section>
            </main>
        </>
    )
}
