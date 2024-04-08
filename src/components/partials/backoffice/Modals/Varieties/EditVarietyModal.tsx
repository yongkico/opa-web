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
} from '@nextui-org/react'
import { Variety } from '@/@types/Variety'
import { varietyStore } from '@/store/backoffice/varietyStore'
import { useVariety } from '@/hooks/backoffice/useVariety'

type Props = {
    variety: Variety
}

export default function EditVarietyModal({ variety }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isUpdating } = varietyStore()

    // custom hooks
    const { updateVariety } = useVariety()

    return (
        <>
            <Button onPress={onOpen} className='w-max' color='primary' radius='sm' size='sm'>
                Edit
            </Button>

            <Modal
                scrollBehavior='inside'
                className='dark:text-light'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                aria-label='Tambah Variety Panen'
            >
                <ModalContent aria-label='Tambah Variety Panen'>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Update Varietas</ModalHeader>

                            <ModalBody className='relative'>
                                <form
                                    className='p-4'
                                    id='update-variety-form'
                                    onSubmit={async (e) => {
                                        await updateVariety(variety.id, e)

                                        onOpenChange()
                                    }}
                                >
                                    <div className='flex w-full flex-col gap-y-1'>
                                        <label htmlFor=''>Nama Varietas</label>

                                        <Input
                                            name='variety_name'
                                            labelPlacement='outside'
                                            radius='sm'
                                            placeholder='Masukkan jumlah variety'
                                            aria-label='Jumlah Variety'
                                            defaultValue={variety.name}
                                            fullWidth
                                        />
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
                                    form='update-variety-form'
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
