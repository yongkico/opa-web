'use client'

import { ChangeEvent, JSX, useState } from 'react'
import HarvestTable from '@/components/partials/backoffice/Tables/Harvest/HarvestTable'
import AddHarvestModal from '@/components/partials/backoffice/Modals/Harvest/AddHarvestModal'
import { useAsyncList } from '@react-stately/data'
import { Harvest } from '@/@types/Harvest'
import { useHarvest } from '@/hooks/backoffice/useHarvest'
import { Input } from '@nextui-org/react'
import ExportToExcel from '@/components/partials/backoffice/ExportToExcel'
import { filterArrayOfObjects } from '@/utils'
import { userStore } from '@/store/userStore'

const harvestColumnName = ['Nama Kebun', 'Tanggal Panen', 'Total Berat (Kg)', 'Total TBS', 'Total Harga Penjualan (Rp)']

export default function Harvest(): JSX.Element {
    // states
    const [searchText, setSearchText] = useState<string>('')

    // global states
    const { loggedInUser } = userStore()

    // custom hooks
    const { getHarvests } = useHarvest()

    // load data with asynclist react stately
    const asyncListHarvests = useAsyncList({
        async load() {
            const res = await getHarvests()
            return {
                items: res.data as Harvest[],
            }
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    const first = a[sortDescriptor.column as keyof Harvest]
                    const second = b[sortDescriptor.column as keyof Harvest]
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

                    if (sortDescriptor.direction === 'descending') {
                        cmp *= -1
                    }

                    return cmp
                }),
            }
        },
    })

    const harvestData = filterArrayOfObjects(asyncListHarvests.items, [
        'nama_kebun',
        'tanggal',
        'berat',
        'tandan',
        'harga',
    ])

    return (
        <main className='container space-y-4 px-0 py-4 md:space-y-8 md:py-8'>
            {/* filter section */}
            {/* <section className='space-y-4 rounded-lg'>
                    <p className='text-xl font-bold'>Filter Hasil Panen</p>

                    <div className='flex flex-col items-end justify-between gap-4 lg:flex-row'>
                        <div className='w-full space-y-1'>
                            <label htmlFor=''>Tanggal Panen</label>

                            <div className='flex items-center gap-x-2'>
                                <DatePicker />

                                <span className='text-sm'>s/d</span>

                                <DatePicker />
                            </div>
                        </div>

                        <div className='w-full space-y-1'>
                            <label htmlFor=''>Total Harga Penjualan</label>

                            <div className='flex items-center gap-x-2'>
                                <input
                                    className='input-primary w-full'
                                    type='text'
                                    name=''
                                    id=''
                                    placeholder='Mulai dari'
                                />

                                <span className='text-sm'>s/d</span>

                                <input
                                    className='input-primary w-full'
                                    type='text'
                                    name=''
                                    id=''
                                    placeholder='Sampai dengan'
                                />
                            </div>
                        </div>

                        <button className='btn-primary'>
                            <span>Filter</span>
                        </button>
                    </div>
                </section> */}

            <section className='apply-dark rounded-lg bg-white p-4 lg:p-8'>
                <div className='flex flex-col justify-between gap-4 md:flex-row md:items-end'>
                    <div className='flex w-full flex-row justify-between gap-2'>
                        <AddHarvestModal list={asyncListHarvests} />

                        <ExportToExcel
                            data={harvestData}
                            fileName={`hasil_panen_${loggedInUser.data.name.replaceAll(' ', '_').toLocaleLowerCase()}`}
                            customHeader={harvestColumnName}
                        />
                    </div>

                    <div className='min-w-[11rem]'>
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
                    <HarvestTable list={asyncListHarvests} searchText={searchText} />
                </div>
            </section>
        </main>
    )
}
