'use client'

import { JSX } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem,
} from '@nextui-org/react'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { PlusIcon } from '@heroicons/react/24/outline'
import { harvestRotations, soils, topographies } from '@/constants'
import { globalStore } from '@/store/backoffice/global'
import AutoCompleteMap from '../../Map/AutoCompleteMap'

export default function AddPlantationModal(): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isCreating } = plantationStore()
    const { varieties } = globalStore()

    // custom hooks
    const { createPlantation } = usePlantation()

    return (
        <>
            <Button
                onPress={onOpen}
                className='w-max'
                color='primary'
                radius='sm'
                startContent={<PlusIcon className='h-4 w-4' />}
            >
                <span className='hidden sm:inline'>Tambah Kebun</span>
            </Button>

            <Modal
                scrollBehavior='inside'
                size='4xl'
                className='dark:text-light'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Tambah Kebun</ModalHeader>

                            <ModalBody className='relative'>
                                <form
                                    id='edit-plantation-form'
                                    onSubmit={async (e) => {
                                        await createPlantation(e)

                                        onOpenChange()
                                    }}
                                >
                                    <div className='grid grid-cols-1 gap-8 p-4 md:grid-cols-2'>
                                        <div className='space-y-4'>
                                            <div className='flex w-full flex-col gap-y-1'>
                                                <label htmlFor=''>Nama Kebun</label>

                                                <Input
                                                    name='name'
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Masukkan nama kebun'
                                                />
                                            </div>

                                            <div className='flex w-full flex-col gap-y-1'>
                                                <label htmlFor=''>Luas Lahan</label>

                                                <Input
                                                    onInput={(e) =>
                                                        (e.currentTarget.value = e.currentTarget.value.replace(
                                                            /[^0-9.]/g,
                                                            '',
                                                        ))
                                                    }
                                                    name='land_area'
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Masukkan luas lahan'
                                                />

                                                <span className='text-xs'>
                                                    Gunakan tanda titik ( . ) untuk bilangan desimal.
                                                </span>
                                            </div>

                                            <div className='flex w-full flex-col gap-y-1'>
                                                <label htmlFor=''>Jumlah Pohon</label>

                                                <Input
                                                    onInput={(e) =>
                                                        (e.currentTarget.value = e.currentTarget.value.replace(
                                                            /[^0-9.]/g,
                                                            '',
                                                        ))
                                                    }
                                                    name='number_tree'
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Masukkan jumlah pohon'
                                                />
                                            </div>

                                            <div className='flex w-full flex-col gap-y-1'>
                                                <label htmlFor=''>Tahun Tanam</label>

                                                <Input
                                                    onInput={(e) =>
                                                        (e.currentTarget.value = e.currentTarget.value.replace(
                                                            /[^0-9.]/g,
                                                            '',
                                                        ))
                                                    }
                                                    name='planting_year'
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Masukkan tahun tanam'
                                                />
                                            </div>

                                            <div className='flex w-full flex-col gap-y-1'>
                                                <label htmlFor=''>Rotasi Panen (Hari)</label>

                                                <Select
                                                    classNames={{
                                                        listbox: 'dark:text-light',
                                                    }}
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Pilih rotasi'
                                                    name='harvest_rotation'
                                                >
                                                    {harvestRotations.map((harvestRotation) => (
                                                        <SelectItem
                                                            key={harvestRotation.value}
                                                            value={harvestRotation.value}
                                                        >
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
                                                    classNames={{
                                                        listbox: 'dark:text-light',
                                                    }}
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Pilih jenis topografi dominan'
                                                    name='topography_type'
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
                                                    classNames={{
                                                        listbox: 'dark:text-light',
                                                    }}
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Pilih jenis tanah dominan'
                                                    name='soil_type'
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
                                                    classNames={{
                                                        listbox: 'dark:text-light',
                                                    }}
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Pilih varietas tanaman'
                                                    name='seed_variety_id'
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

                                                {/* <Input
                                                    name='address'
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    placeholder='Masukkan alamat kebun'
                                                /> */}

                                                <AutoCompleteMap />
                                            </div>

                                            <div className='space-y-1'>
                                                <label>Koordinat</label>

                                                <div className='flex justify-between gap-x-4'>
                                                    <div className='flex w-full flex-col gap-y-1'>
                                                        <Input
                                                            name='latitude'
                                                            labelPlacement='outside'
                                                            radius='sm'
                                                            placeholder='Latitude'
                                                        />

                                                        <span className='text-xs'>
                                                            Kordinat Latitude terisi secara otomatis.
                                                        </span>
                                                    </div>

                                                    <div className='flex w-full flex-col gap-y-1'>
                                                        <Input
                                                            name='longitude'
                                                            labelPlacement='outside'
                                                            radius='sm'
                                                            placeholder='longitude'
                                                        />

                                                        <span className='text-xs'>
                                                            Kordinat Longitude terisi secara otomatis.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='secondary' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    isLoading={isCreating}
                                    type='submit'
                                    form='edit-plantation-form'
                                    color='primary'
                                    radius='sm'
                                >
                                    Tambah
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
