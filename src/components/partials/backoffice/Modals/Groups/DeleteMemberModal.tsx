'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Loading from '../../../Loading'
import { groupStore } from '@/store/backoffice/groupStore'
import { MinusIcon } from '@heroicons/react/24/outline'
import { GroupMember } from '@/@types/Group'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { useSearchParams } from 'next/navigation'

type Props = {
    member: GroupMember
}

export default function DeleteMemberModal({ member }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isDeleting } = groupStore()

    // search params
    const searchParams = useSearchParams()

    // custom hooks
    const { deleteMember } = useGroup()

    return (
        <>
            <MinusIcon
                onClick={onOpen}
                className='absolute -right-1 -top-2 h-4 w-4 cursor-pointer rounded-full bg-danger text-light'
                title='Hapus Anggota'
            />

            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
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

                                <div className='space-y-2'>
                                    <p className='text-center'>Apakah kamu yakin mengeluarkan anggota ini?</p>

                                    <p className='text-center text-sm text-primary'>({`${member.name}`})</p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await deleteMember(member.id, searchParams.get('id')!.toString())

                                        onOpenChange()
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
