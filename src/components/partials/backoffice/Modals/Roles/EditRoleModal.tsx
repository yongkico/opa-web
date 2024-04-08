'use client'

import { FormEvent, JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { Role } from '@/@types/Role'
import { roleStore } from '@/store/backoffice/roleStore'
import { useRole } from '@/hooks/backoffice/useRole'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    role: Role
}

export default function EditRoleModal({ isOpen, setIsOpen, role }: Props): JSX.Element {
    // global states
    const { isUpdating } = roleStore()

    // custom hooks
    const { updateRole, errorMessages } = useRole()

    // for updating role
    async function handleUpdateRole(e: FormEvent<HTMLFormElement>) {
        await updateRole(role.id, e)

        setIsOpen(false)
    }

    return (
        <>
            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={setIsOpen}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Edit Role</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='update-role-form' onSubmit={handleUpdateRole}>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-4'>
                                            <Input
                                                labelPlacement='outside'
                                                radius='sm'
                                                variant='bordered'
                                                name='role_name'
                                                type='text'
                                                label='Nama Role'
                                                placeholder='Masukkan nama role...'
                                                isDisabled={isUpdating}
                                                isInvalid={!!errorMessages?.message?.name[0]}
                                                errorMessage={errorMessages?.message?.name[0]}
                                                defaultValue={role.name}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    form='update-role-form'
                                    type='submit'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isUpdating}
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
