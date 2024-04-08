'use client'

import { JSX } from 'react'
import AutoCompleteMap from '@/components/partials/backoffice/Map/AutoCompleteMap'
import { harvestRotations, soils, topographies } from '@/constants'
import { useGlobal } from '@/hooks/backoffice/useGlobal'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { globalStore } from '@/store/backoffice/global'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useEffectOnce } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import { formatInput } from '@/utils'

export default function AddPlantation(): JSX.Element {
    // global states
    const { isCreating } = plantationStore()
    const { varieties, coordinate } = globalStore()

    // custom hooks
    const { createPlantation } = usePlantation()
    const { getAllVarieties } = useGlobal()

    // router
    const router = useRouter()

    useEffectOnce(() => {
        getAllVarieties()
    })

    return (
        <main className='apply-dark container mt-4 min-h-[80vh] space-y-8 rounded-lg bg-white p-4 lg:mt-8 lg:p-8'>
            <header>
                <h1 className='p-4 text-xl'>Tambah Kebun</h1>
            </header>

            <form onSubmit={createPlantation} id='edit-plantation-form'>
                <div className='grid grid-cols-1 gap-8 px-4 md:grid-cols-2'>
                    <div className='space-y-4'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Nama Kebun</label>

                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                isDisabled={isCreating}
                                name='name'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan nama kebun'
                            />
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Luas Lahan</label>

                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                isDisabled={isCreating}
                                onInput={(e) => formatInput(e)}
                                name='land_area'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan luas lahan'
                            />

                            <span className='text-xs'>Gunakan tanda koma ( , ) untuk bilangan desimal.</span>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Jumlah Pohon</label>

                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                isDisabled={isCreating}
                                onInput={(e) => formatInput(e)}
                                name='number_tree'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan jumlah pohon'
                            />
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Tahun Tanam</label>

                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                isDisabled={isCreating}
                                onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, ''))}
                                name='planting_year'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan tahun tanam'
                            />
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Rotasi Panen (Hari)</label>

                            <Select
                                isDisabled={isCreating}
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Pilih rotasi'
                                name='harvest_rotation'
                                aria-label='Rotasi Panen'
                            >
                                {harvestRotations.map((harvestRotation) => (
                                    <SelectItem key={harvestRotation.value} value={harvestRotation.value}>
                                        {harvestRotation.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Jenis Topografi Dominan</label>

                            <Select
                                isDisabled={isCreating}
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Pilih jenis topografi dominan'
                                name='topography_type'
                                aria-label='Jenis Topografi Dominan'
                            >
                                {topographies.map((topography) => (
                                    <SelectItem key={topography.value} value={topography.value}>
                                        {topography.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Jenis Tanah Dominan</label>

                            <Select
                                isDisabled={isCreating}
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Pilih jenis tanah dominan'
                                name='soil_type'
                                aria-label='Jenis Tanah Dominan'
                            >
                                {soils.map((soil) => (
                                    <SelectItem key={soil.value} value={soil.value}>
                                        {soil.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Varietas Tanaman</label>

                            <Select
                                isDisabled={isCreating}
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Pilih varietas tanaman'
                                name='seed_variety_id'
                                aria-label='Varietas Tanaman'
                            >
                                {varieties.data?.map((variety) => (
                                    <SelectItem key={variety.id} value={variety.id}>
                                        {variety.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Alamat Kebun</label>

                            <AutoCompleteMap />
                        </div>

                        <div className='space-y-1'>
                            <label>Koordinat</label>

                            <div className='flex justify-between gap-x-4'>
                                <div className='flex w-full flex-col gap-y-1'>
                                    <Input
                                        classNames={{
                                            inputWrapper: 'border apply-dark',
                                        }}
                                        name='latitude'
                                        labelPlacement='outside'
                                        radius='sm'
                                        variant='bordered'
                                        placeholder='Latitude'
                                        value={coordinate.lat?.toString()}
                                        isDisabled
                                    />

                                    <span className='text-xs'>Kordinat Latitude terisi secara otomatis.</span>
                                </div>

                                <div className='flex w-full flex-col gap-y-1'>
                                    <Input
                                        classNames={{
                                            inputWrapper: 'border apply-dark',
                                        }}
                                        name='longitude'
                                        labelPlacement='outside'
                                        radius='sm'
                                        variant='bordered'
                                        placeholder='longitude'
                                        value={coordinate.lng?.toString()}
                                        isDisabled
                                    />

                                    <span className='text-xs'>Kordinat Longitude terisi secara otomatis.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <Button
                            onPress={() => router.back()}
                            className='w-full md:w-max'
                            type='button'
                            color='secondary'
                            radius='sm'
                        >
                            Batal
                        </Button>

                        <Button
                            className='w-full md:w-max'
                            isLoading={isCreating}
                            type='submit'
                            form='edit-plantation-form'
                            color='primary'
                            radius='sm'
                        >
                            Tambah
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    )
}
