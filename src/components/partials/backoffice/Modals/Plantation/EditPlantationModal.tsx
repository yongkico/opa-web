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
import { Plantation } from '@/@types/Plantation'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import Loading from '../../../Loading'
import { harvestRotations, soils, topographies } from '@/constants'
import { globalStore } from '@/store/backoffice/global'
import AutoCompleteMap from '../../Map/AutoCompleteMap'

type Props = {
    plantation: Plantation
}

export default function EditPlantationModal({ plantation }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isUpdating } = plantationStore()
    const { varieties } = globalStore()

    // custom hooks
    const { updatePlantation } = usePlantation()

    return (
        <>
            <Button onPress={onOpen} className='w-max' color='primary' size='sm' radius='sm'>
                Edit
            </Button>

            <Modal
                scrollBehavior='inside'
                size='3xl'
                className='dark:text-light'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Edit Kebun</ModalHeader>

                            <ModalBody className='relative'>
                                {isUpdating && (
                                    <div className='absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
                                        <Loading />
                                    </div>
                                )}

                                <form
                                    id='edit-plantation-form'
                                    onSubmit={async (e) => {
                                        await updatePlantation(plantation.id as string, e)

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
                                                    variant='bordered'
                                                    placeholder='Masukkan nama kebun'
                                                    defaultValue={plantation.nama}
                                                    aria-label='Masukkan nama kebun'
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
                                                    variant='bordered'
                                                    placeholder='Masukkan luas lahan'
                                                    defaultValue={plantation.luas}
                                                    aria-label='Masukkan luas lahan'
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
                                                    variant='bordered'
                                                    placeholder='Masukkan jumlah pohon'
                                                    defaultValue={plantation.jumlah_pohon}
                                                    aria-label='Masukkan jumlah pohon'
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
                                                    onChange={(e) => (e.target.value = e.target.value.slice(0, 4))}
                                                    name='planting_year'
                                                    labelPlacement='outside'
                                                    radius='sm'
                                                    variant='bordered'
                                                    placeholder='Masukkan tahun tanam'
                                                    defaultValue={plantation.tahun_tanam}
                                                    aria-label='Masukkan tahun tanam'
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
                                                    variant='bordered'
                                                    placeholder='Pilih rotasi'
                                                    name='harvest_rotation'
                                                    defaultSelectedKeys={[plantation.rotasi_panen]}
                                                    aria-label='Pilih rotasi'
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
                                                    variant='bordered'
                                                    placeholder='Pilih jenis topografi dominan'
                                                    name='topography_type'
                                                    defaultSelectedKeys={[plantation.jenis_topografi_dominan]}
                                                    aria-label='Pilih jenis topografi dominan'
                                                >
                                                    {topographies.map((topography) => (
                                                        <SelectItem key={topography.name} value={topography.name}>
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
                                                    variant='bordered'
                                                    placeholder='Pilih jenis tanah dominan'
                                                    name='soil_type'
                                                    defaultSelectedKeys={[plantation.jenis_tanah_dominan]}
                                                    aria-label='Pilih jenis tanah dominan'
                                                >
                                                    {soils.map((soil) => (
                                                        <SelectItem key={soil.name} value={soil.name}>
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
                                                    variant='bordered'
                                                    placeholder='Pilih varietas tanaman'
                                                    name='seed_variety_id'
                                                    defaultSelectedKeys={[plantation.id_varietas]}
                                                    aria-label='Pilih varietas tanaman'
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
                                                            name='latitude'
                                                            labelPlacement='outside'
                                                            radius='sm'
                                                            variant='bordered'
                                                            placeholder='Latitude'
                                                            defaultValue={plantation.latitude}
                                                            isDisabled
                                                            aria-label='Latitude'
                                                        />

                                                        <span className='text-xs'>
                                                            Koordinat Latitude terisi secara otomatis.
                                                        </span>
                                                    </div>

                                                    <div className='flex w-full flex-col gap-y-1'>
                                                        <Input
                                                            name='longitude'
                                                            labelPlacement='outside'
                                                            radius='sm'
                                                            variant='bordered'
                                                            placeholder='longitude'
                                                            defaultValue={plantation.longitude}
                                                            isDisabled
                                                            aria-label='longitude'
                                                        />

                                                        <span className='text-xs'>
                                                            Koordinat Longitude terisi secara otomatis.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex'>
                                <Button onPress={onOpenChange} color='secondary' radius='sm'>
                                    Batal
                                </Button>

                                <Button type='submit' form='edit-plantation-form' color='primary' radius='sm'>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
