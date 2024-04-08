'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Loading from '../../../Loading'
import { groupStore } from '@/store/backoffice/groupStore'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { userStore } from '@/store/userStore'
import { Group } from '@/@types/Group'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'

type Props = {
    group: Group
}

export default function LeaveGroupModal({ group }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isLeaving } = groupStore()
    const { loggedInUser } = userStore()

    // custom hooks
    const { leaveGroup } = useGroup()

    // DELETE RESPON STILL WRONG

    return (
        <>
            <Button
                onPress={onOpen}
                className='w-max'
                variant='bordered'
                color='danger'
                radius='sm'
                size='sm'
                startContent={<ArrowLeftOnRectangleIcon className='h-4 w-4' />}
            >
                <span className='hidden sm:inline'>Keluar</span>
            </Button>

            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Hapus?</ModalHeader>

                            <ModalBody className='relative'>
                                {isLeaving && (
                                    <div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm'>
                                        <Loading />
                                    </div>
                                )}

                                <div>
                                    <p className='text-center'>Apakah kamu yakin keluar group ini?</p>

                                    <p className='text-center text-sm text-primary'>({`${group.nama}`})</p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await leaveGroup(loggedInUser.data.id, group.id)

                                        onOpenChange()
                                    }}
                                    color='primary'
                                    radius='sm'
                                >
                                    Keluar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
