'use client'

import { ChangeEvent, JSX, useState } from 'react'
import PlantationTable from '@/components/partials/backoffice/Tables/Plantation/PlantationTable'
import { Button, Input } from '@nextui-org/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { getRole } from '@/utils'
import { userStore } from '@/store/userStore'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { useGlobal } from '@/hooks/backoffice/useGlobal'
import { useEffectOnce } from 'usehooks-ts'
import { useAsyncList } from '@react-stately/data'
import { findAll } from '@/modules/backoffice/plantationModule'
import { Plantation } from '@/@types/Plantation'

export default function Plantation(): JSX.Element {
    // states
    const [searchText, setSearchText] = useState<string>('')

    // global states
    const { loggedInUser } = userStore()

    // custom hooks
    const { getPlantations } = usePlantation()
    const { getAllVarieties } = useGlobal()

    useEffectOnce(() => {
        getPlantations()
        getAllVarieties()
    })

    const asyncListPlantations = useAsyncList({
        async load() {
            const res = await findAll()

            return {
                items: res.data as Plantation[],
            }
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    const first = a[sortDescriptor.column as keyof Plantation]
                    const second = b[sortDescriptor.column as keyof Plantation]
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
        <main className='container space-y-4 px-0 py-4 md:space-y-8 md:py-8'>
            {/* filter section */}
            {/* <section className='space-y-4 rounded-lg'>
                <p className='text-xl font-bold'>Filter Kebun</p>

                <div className='flex flex-col items-end justify-between gap-4 md:flex-row'>
                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor=''>Tahun Tanam</label>

                        <select className='input-primary' name='' id=''>
                            <option value='1'>Value 1</option>

                            <option value='2'>Value 2</option>
                        </select>
                    </div>

                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor=''>Lokasi Kebun</label>

                        <select className='input-primary' name='' id=''>
                            <option value='1'>Value 1</option>

                            <option value='2'>Value 2</option>
                        </select>
                    </div>

                    <button className='btn-primary'>
                        <span>Filter</span>
                    </button>
                </div>
            </section> */}

            <section className='apply-dark rounded-lg bg-white p-4 lg:p-8'>
                <div className='flex flex-row justify-between gap-4 md:flex-row md:items-end'>
                    {/* <AddPlantationModal /> */}
                    <Button
                        className='w-max'
                        href={`/${getRole(loggedInUser.data?.role_name)}/plantation/add`}
                        color='primary'
                        as={Link}
                        radius='sm'
                        startContent={<PlusIcon className='h-4 w-4' />}
                    >
                        <span className='hidden sm:inline'>Tambah Kebun</span>
                    </Button>

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
                    <PlantationTable list={asyncListPlantations} searchText={searchText} />
                </div>
            </section>
        </main>
    )
}
