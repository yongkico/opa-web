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
import { PlusIcon } from '@heroicons/react/24/outline'
import { targetStore } from '@/store/backoffice/targetStore'
import { useVariety } from '@/hooks/backoffice/useVariety'

export default function AddVarietyModal(): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isCreating } = targetStore()

    // custom hooks
    const { createVariety } = useVariety()

    return (
        <>
            <Button
                onPress={onOpen}
                className='w-max'
                color='primary'
                radius='sm'
                startContent={<PlusIcon className='h-4 w-4' />}
            >
                <span className='hidden sm:inline'>Tambah Varietas</span>
            </Button>

            <Modal
                scrollBehavior='inside'
                className='dark:text-light'
                backdrop='blur'
                size='2xl'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                aria-label='Tambah Variety Panen'
            >
                <ModalContent aria-label='Tambah Variety Panen'>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Tambah Varietas</ModalHeader>

                            <ModalBody className='relative'>
                                <form
                                    className='p-4'
                                    id='add-target-form'
                                    onSubmit={async (e) => {
                                        await createVariety(e)

                                        onOpenChange()
                                    }}
                                >
                                    <div className='flex w-full flex-col gap-y-1'>
                                        <label htmlFor=''>Varietas</label>

                                        <Input
                                            name='name'
                                            labelPlacement='outside'
                                            radius='sm'
                                            placeholder='Masukkan nama varietas'
                                            aria-label='Varietas'
                                        />
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
