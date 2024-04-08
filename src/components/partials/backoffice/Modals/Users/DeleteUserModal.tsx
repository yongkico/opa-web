'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Loading from '../../../Loading'
import { AsyncListData } from '@react-stately/data'
import { User } from '@/@types/Auth'
import { useUserManagement } from '@/hooks/backoffice/useUserManagement'
import { userManagementStore } from '@/store/backoffice/userManagementStore'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    list: AsyncListData<User>
    user: User
}

export default function DeleteUserModal({ isOpen, setIsOpen, list, user }: Props): JSX.Element {
    // global states
    const { isDeleting } = userManagementStore()

    // custom hooks
    const { deleteUser } = useUserManagement()

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
                                    <p className='text-center'>Apakah kamu yakin menghapus user ini?</p>

                                    <p className='text-center text-sm text-primary'>({`${user.name}`})</p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await deleteUser(user.id)

                                        setIsOpen(false)

                                        list.reload()
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
