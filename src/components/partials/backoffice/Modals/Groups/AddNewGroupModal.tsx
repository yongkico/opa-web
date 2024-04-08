'use client'

import { useGroup } from '@/hooks/backoffice/useGroup'
import { groupStore } from '@/store/backoffice/groupStore'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
} from '@nextui-org/react'
import { FormEvent, JSX } from 'react'

export default function AddNewGroupModal(): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // custom hooks
    const { createGroup } = useGroup()

    // global states
    const { isCreating } = groupStore()

    return (
        <>
            <Button
                onPress={onOpen}
                className='w-max'
                color='primary'
                radius='sm'
                startContent={<PlusIcon className='h-4 w-4' />}
            >
                <span className='hidden sm:inline'>Buat Grup Diskusi</span>
            </Button>

            <Modal
                scrollBehavior='inside'
                size='xl'
                className='dark:text-light'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                aria-label='Tambah Target Panen'
            >
                <ModalContent aria-label='Tambah Target Panen'>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Buat Grup Diskusi</ModalHeader>

                            <ModalBody className='relative'>
                                <form
                                    id='add-new-group'
                                    onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                                        await createGroup(e)

                                        onOpenChange()
                                    }}
                                >
                                    <div className='space-y-4 p-4 lg:p-8'>
                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label htmlFor=''>Nama Grup</label>

                                            <Input
                                                name='name'
                                                variant='bordered'
                                                labelPlacement='outside'
                                                radius='sm'
                                                placeholder='Masukkan nama group'
                                                isRequired
                                            />
                                        </div>

                                        <div className='flex w-full flex-col gap-y-1'>
                                            <label htmlFor=''>Deskripsi Grup</label>

                                            <Textarea
                                                variant='bordered'
                                                radius='sm'
                                                name='description'
                                                placeholder='Masukkan deskripsi'
                                                isRequired
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
                                    type='submit'
                                    form='add-new-group'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isCreating}
                                >
                                    Buat Group
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
