'use client'

import { JSX, useState } from 'react'
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
import { harvestStore } from '@/store/backoffice/harvestStore'
import { useHarvest } from '@/hooks/backoffice/useHarvest'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { Plantation } from '@/@types/Plantation'
import { Harvest } from '@/@types/Harvest'
import { AsyncListData } from '@react-stately/data'
import SingleDatePicker from '../../DatePicker/SingleDatePicker'
import { formatInput, formatNumberToLocal } from '@/utils'

type Props = {
    list: AsyncListData<Harvest>
    harvest: Harvest
}

export default function EditHarvestModal({ list, harvest }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // states
    const [chosenDate, setChosenDate] = useState<string>('')

    // global states
    const { isUpdating } = harvestStore()
    const { plantations } = plantationStore()

    // custom hooks
    const { updateHarvest } = useHarvest()

    return (
        <>
            <Button
                onPress={() => {
                    setChosenDate(harvest.tanggal)
                    onOpen()
                }}
                className='w-max'
                color='primary'
                radius='sm'
                size='sm'
            >
                Edit
            </Button>

            <Modal
                scrollBehavior='inside'
                size='4xl'
                className='dark:text-light'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                aria-label='Tambah Hasil Panen'
            >
                <ModalContent aria-label='Tambah Hasil Panen'>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Update Hasil Panen</ModalHeader>

                            <ModalBody className='relative'>
                                <form
                                    id='update-harvest-form'
                                    onSubmit={async (e) => {
                                        await updateHarvest(harvest.id, e, chosenDate)

                                        onOpenChange()

                                        list.reload()
                                    }}
                                >
                                    <div className='grid grid-cols-1 gap-8 p-4 md:grid-cols-2'>
                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label htmlFor=''>Pilih Kebun</label>

                                            <Select
                                                classNames={{
                                                    listbox: 'dark:text-light',
                                                }}
                                                labelPlacement='outside'
                                                radius='sm'
                                                variant='bordered'
                                                placeholder='Pilih kebun'
                                                name='plantation_id'
                                                aria-label='Pilih Kebun'
                                                defaultSelectedKeys={[harvest.id_kebun]}
                                            >
                                                {plantations.data?.map((plantation: Plantation) => (
                                                    <SelectItem
                                                        aria-label='Pilih Kebun'
                                                        key={plantation.id}
                                                        value={plantation.id}
                                                    >
                                                        {plantation.nama}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>

                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label htmlFor=''>Pilih Tanggal</label>

                                            <SingleDatePicker setChosenDate={setChosenDate} chosenDate={chosenDate} />
                                        </div>

                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label htmlFor=''>Total Berat(Kg)</label>

                                            <Input
                                                onInput={(e) => formatInput(e)}
                                                name='total_weight'
                                                labelPlacement='outside'
                                                radius='sm'
                                                variant='bordered'
                                                placeholder='Masukkan total berat'
                                                aria-label='Total Berat(Kg)'
                                                defaultValue={formatNumberToLocal(harvest.berat)}
                                            />
                                        </div>

                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label htmlFor=''>Total TBS</label>

                                            <Input
                                                onInput={(e) => formatInput(e)}
                                                name='total_ffb'
                                                labelPlacement='outside'
                                                radius='sm'
                                                variant='bordered'
                                                placeholder='Masukkan total TBS'
                                                aria-label='Total TBS'
                                                defaultValue={formatNumberToLocal(harvest.tandan)}
                                            />
                                        </div>

                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label htmlFor=''>Total Harga</label>

                                            <Input
                                                onInput={(e) => formatInput(e)}
                                                name='total_price'
                                                labelPlacement='outside'
                                                radius='sm'
                                                variant='bordered'
                                                placeholder='Masukkan total harga'
                                                aria-label='Total Harga'
                                                defaultValue={formatNumberToLocal(harvest.harga)}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='secondary' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    isLoading={isUpdating}
                                    type='submit'
                                    form='update-harvest-form'
                                    color='primary'
                                    radius='sm'
                                >
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
