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
import { PlusIcon } from '@heroicons/react/24/outline'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import { useEffectOnce } from 'usehooks-ts'
import { Plantation } from '@/@types/Plantation'
import { targetStore } from '@/store/backoffice/targetStore'
import { useTarget } from '@/hooks/backoffice/useTarget'
import { AsyncListData } from '@react-stately/data'
import { Target } from '@/@types/Target'
import { formatInput } from '@/utils'

type Props = {
    list: AsyncListData<Target>
}

export default function AddTargetModal({ list }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isCreating } = targetStore()
    const { plantations } = plantationStore()

    // custom hooks
    const { createTarget } = useTarget()
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
                <span className='hidden sm:inline'>Tambah Target Panen</span>
            </Button>

            <Modal
                scrollBehavior='inside'
                size='4xl'
                className='dark:text-light'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                aria-label='Tambah Target Panen'
            >
                <ModalContent aria-label='Tambah Target Panen'>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Tambah Target Panen</ModalHeader>

                            <ModalBody className='relative'>
                                <form
                                    id='add-target-form'
                                    onSubmit={async (e) => {
                                        await createTarget(e)

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
                                            <label htmlFor=''>Tahun Target</label>

                                            <Input
                                                onInput={(e) =>
                                                    (e.currentTarget.value = e.currentTarget.value.replace(
                                                        /[^0-9.]/g,
                                                        '',
                                                    ))
                                                }
                                                name='year'
                                                labelPlacement='outside'
                                                radius='sm'
                                                variant='bordered'
                                                placeholder='Masukkan tahun target'
                                                aria-label='Tahun'
                                            />
                                        </div>

                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label htmlFor=''>Target Panen</label>

                                            <Input
                                                onInput={(e) => formatInput(e)}
                                                name='target_panen'
                                                labelPlacement='outside'
                                                radius='sm'
                                                variant='bordered'
                                                placeholder='Masukkan jumlah target'
                                                aria-label='Jumlah Target'
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
                                    form='add-target-form'
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
