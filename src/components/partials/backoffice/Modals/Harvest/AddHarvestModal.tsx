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
import { PlusIcon } from '@heroicons/react/24/outline'
import { harvestStore } from '@/store/backoffice/harvestStore'
import { useHarvest } from '@/hooks/backoffice/useHarvest'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { useEffectOnce } from 'usehooks-ts'
import { Plantation } from '@/@types/Plantation'
import { AsyncListData } from '@react-stately/data'
import { Harvest } from '@/@types/Harvest'
import SingleDatePicker from '../../DatePicker/SingleDatePicker'
import { formatInput } from '@/utils'

type Props = {
    list: AsyncListData<Harvest>
}

export default function AddHarvestModal({ list }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // states
    const [chosenDate, setChosenDate] = useState<string>('')

    // global states
    const { isCreating } = harvestStore()
    const { plantations } = plantationStore()

    // custom hooks
    const { createHarvest } = useHarvest()
    const { getPlantations } = usePlantation()

    useEffectOnce(() => {
        getPlantations()
    })

    return (
        <>
            <Button
                onPress={onOpen}
                className='w-max'
                color='primary'
                radius='sm'
                startContent={<PlusIcon className='h-4 w-4' />}
            >
                <span className='hidden sm:inline'>Tambah Hasil Panen</span>
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
                            <ModalHeader className='flex flex-col gap-1'>Tambah Hasil Panen</ModalHeader>

                            <ModalBody className='relative'>
                                <form
                                    id='edit-plantation-form'
                                    onSubmit={async (e) => {
                                        await createHarvest(e, chosenDate)

                                        onOpenChange()

                                        list.reload()

                                        setChosenDate('')
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

                                            <SingleDatePicker chosenDate={chosenDate} setChosenDate={setChosenDate} />
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
