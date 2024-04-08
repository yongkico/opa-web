'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Loading from '../../../Loading'
import { Role } from '@/@types/Role'
import { useRole } from '@/hooks/backoffice/useRole'
import { roleStore } from '@/store/backoffice/roleStore'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    role: Role
}

export default function DeleteRoleModal({ isOpen, setIsOpen, role }: Props): JSX.Element {
    // global states
    const { isDeleting } = roleStore()

    // custom hooks
    const { deleteRole } = useRole()

    return (
        <>
            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={setIsOpen}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Hapus?</ModalHeader>

                            <ModalBody className='relative'>
                                {isDeleting && (
                                    <div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm'>
                                        <Loading />
                                    </div>
                                )}

                                <div>
                                    <p className='text-center'>Apakah kamu yakin menghapus role ini?</p>

                                    <p className='text-center text-sm text-primary'>({`${role.name}`})</p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await deleteRole(role.id)

                                        setIsOpen(false)
                                    }}
                                    color='primary'
                                    radius='sm'
                                >
                                    Hapus
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
