'use client'

import { FormEvent, JSX } from 'react'
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
import { roleStore } from '@/store/backoffice/roleStore'
import { useRole } from '@/hooks/backoffice/useRole'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function AddRoleModal(): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isCreating } = roleStore()

    // custom hooks
    const { createRole, errorMessages } = useRole()

    // for updating role
    async function handleCreateRole(e: FormEvent<HTMLFormElement>) {
        await createRole(e)

        onOpenChange()
    }

    return (
        <>
            <Button
                onPress={() => {
                    onOpen()
                }}
                className='w-max'
                color='secondary'
                radius='sm'
                isIconOnly
            >
                <PlusIcon className='h-5 w-5' />
            </Button>

            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Tambah Role</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='add-role-form' onSubmit={handleCreateRole}>
                                    <div className='flex flex-col gap-4'>
                                        <Input
                                            labelPlacement='outside'
                                            radius='sm'
                                            variant='bordered'
                                            name='name'
                                            type='text'
                                            label='Nama Role'
                                            placeholder='Masukkan nama role...'
                                            isDisabled={isCreating}
                                            isInvalid={!!errorMessages?.message?.name[0]}
                                            errorMessage={errorMessages?.message?.name}
                                        />
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    form='add-role-form'
                                    type='submit'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isCreating}
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
