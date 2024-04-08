'use client'

import { JSX, useEffect, useState } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { harvestRotations, soils, topographies } from '@/constants'
import { globalStore } from '@/store/backoffice/global'
import { useGlobal } from '@/hooks/backoffice/useGlobal'
import { useEffectOnce } from 'usehooks-ts'
import { useParams, useRouter } from 'next/navigation'
import { Plantation } from '@/@types/Plantation'
import AutoCompleteMap from '@/components/partials/backoffice/Map/AutoCompleteMap'
import { formatInput, formatNumberToLocal } from '@/utils'

export default function EditPlantation(): JSX.Element {
    // states
    const [editablePlantation, setEditablePlantation] = useState<Plantation>({} as Plantation)

    // global states
    const { isUpdating, plantation } = plantationStore()
    const { varieties, coordinate } = globalStore()

    // custom hooks
    const { updatePlantation, getPlantation } = usePlantation()
    const { getAllVarieties } = useGlobal()

    // params
    const params = useParams()

    // router
    const router = useRouter()

    useEffectOnce(() => {
        getAllVarieties()
    })

    useEffect(() => {
        getPlantation(params.id as string)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    return (
        <main className='apply-dark container mt-4 min-h-[80vh] space-y-8 rounded-lg bg-white p-4 lg:mt-8 lg:p-8'>
            <header>
                <h1 className='p-4 text-xl'>Sunting Kebun</h1>
            </header>

            <form
                id='edit-plantation-form'
                onSubmit={async (e) => {
                    await updatePlantation(params.id as string, e)
                }}
            >
                <div className='grid grid-cols-1 gap-8 px-4 md:grid-cols-2'>
                    <div className='space-y-4'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Nama Kebun</label>

                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            nama: e.target.value,
                                        }
                                    })
                                }
                                name='plantation_name'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan nama kebun'
                                value={editablePlantation.nama ?? formatNumberToLocal(plantation.data?.nama)}
                                aria-label='Masukkan nama kebun'
                            />
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Luas Lahan</label>

                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            luas: e.target.value,
                                        }
                                    })
                                }
                                onInput={(e) => formatInput(e)}
                                name='land_area'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan luas lahan'
                                value={editablePlantation.luas ?? formatNumberToLocal(plantation.data?.luas)}
                                aria-label='Masukkan luas lahan'
                            />

                            <span className='text-xs'>Gunakan tanda titik ( . ) untuk bilangan desimal.</span>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Jumlah Pohon</label>

                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            jumlah_pohon: e.target.value,
                                        }
                                    })
                                }
                                onInput={(e) => formatInput(e)}
                                name='number_tree'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan jumlah pohon'
                                value={
                                    editablePlantation.jumlah_pohon ??
                                    formatNumberToLocal(plantation.data?.jumlah_pohon)
                                }
                                aria-label='Masukkan jumlah pohon'
                            />
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Tahun Tanam</label>

                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            tahun_tanam: e.target.value,
                                        }
                                    })
                                }
                                onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''))}
                                name='planting_year'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan tahun tanam'
                                value={editablePlantation.tahun_tanam ?? plantation.data?.tahun_tanam}
                                aria-label='Masukkan tahun tanam'
                            />
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Rotasi Panen (Hari)</label>

                            <Select
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            rotasi_panen: e.target.value,
                                        }
                                    })
                                }
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Pilih rotasi'
                                name='harvest_rotation'
                                selectedKeys={[editablePlantation.rotasi_panen ?? plantation.data?.rotasi_panen]}
                                aria-label='Pilih rotasi'
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
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            jenis_topografi_dominan: e.target.value,
                                        }
                                    })
                                }
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Pilih jenis topografi dominan'
                                name='topography_type'
                                selectedKeys={[
                                    editablePlantation.jenis_topografi_dominan ??
                                        plantation.data?.jenis_topografi_dominan,
                                ]}
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
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            jenis_tanah_dominan: e.target.value,
                                        }
                                    })
                                }
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Pilih jenis tanah dominan'
                                name='soil_type'
                                selectedKeys={[
                                    editablePlantation.jenis_tanah_dominan ?? plantation.data?.jenis_tanah_dominan,
                                ]}
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
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            id_varietas: e.target.value,
                                        }
                                    })
                                }
                                classNames={{
                                    listbox: 'dark:text-light',
                                    trigger: 'border apply-dark',
                                }}
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Pilih varietas tanaman'
                                name='seed_variety_id'
                                selectedKeys={[editablePlantation.id_varietas ?? plantation.data?.id_varietas]}
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

                            {/* <Input
                            classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                onChange={(e) =>
                                    setEditablePlantation((prev) => {
                                        return {
                                            ...prev,
                                            alamat: e.target.value,
                                        }
                                    })
                                }
                                name='address'
                                labelPlacement='outside'
                                radius='sm'
                                variant='bordered'
                                placeholder='Masukkan alamat kebun'
                                value={editablePlantation.alamat ?? plantation.data?.alamat}
                                aria-label='Masukkan alamat kebun'
                            /> */}
                            <AutoCompleteMap initialAddress={editablePlantation.alamat ?? plantation.data?.alamat} />
                        </div>

                        <div className='space-y-1'>
                            <label>Koordinat</label>

                            <div className='flex justify-between gap-x-4'>
                                <div className='flex w-full flex-col gap-y-1'>
                                    <Input
                                        classNames={{
                                            inputWrapper: 'border apply-dark',
                                        }}
                                        onChange={(e) =>
                                            setEditablePlantation((prev) => {
                                                return {
                                                    ...prev,
                                                    latitude: e.target.value,
                                                }
                                            })
                                        }
                                        name='latitude'
                                        labelPlacement='outside'
                                        radius='sm'
                                        variant='bordered'
                                        placeholder='Latitude'
                                        value={coordinate.lat?.toString() || plantation.data?.latitude}
                                        isDisabled
                                        aria-label='Latitude'
                                    />

                                    <span className='text-xs'>Koordinat Latitude terisi secara otomatis.</span>
                                </div>

                                <div className='flex w-full flex-col gap-y-1'>
                                    <Input
                                        classNames={{
                                            inputWrapper: 'border apply-dark',
                                        }}
                                        onChange={(e) =>
                                            setEditablePlantation((prev) => {
                                                return {
                                                    ...prev,
                                                    longitude: e.target.value,
                                                }
                                            })
                                        }
                                        name='longitude'
                                        labelPlacement='outside'
                                        radius='sm'
                                        variant='bordered'
                                        placeholder='longitude'
                                        value={coordinate.lng?.toString() || plantation.data?.longitude}
                                        isDisabled
                                        aria-label='longitude'
                                    />

                                    <span className='text-xs'>Koordinat Longitude terisi secara otomatis.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <Button onPress={() => router.back()} className='w-full md:w-max' color='secondary' radius='sm'>
                            Batal
                        </Button>

                        <Button
                            className='w-full md:w-max'
                            isLoading={isUpdating}
                            type='submit'
                            form='edit-plantation-form'
                            color='primary'
                            radius='sm'
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    )
}
