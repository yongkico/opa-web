'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Loading from '../../../Loading'
import { groupStore } from '@/store/backoffice/groupStore'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { Group } from '@/@types/Group'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
    group: Group
    isOpen: boolean
    setIsDeleteModalOpen: (open: boolean) => void
}

export default function DeleteGroupModal({ group, isOpen, setIsDeleteModalOpen }: Props): JSX.Element {
    // global states
    const { isDeleting } = groupStore()

    // custom hooks
    const { deleteGroup } = useGroup()

    // router
    const router = useRouter()

    // search params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    // DELETE RESPON STILL WRONG

    return (
        <Modal
            className='dark:text-light'
            backdrop='blur'
            isOpen={isOpen}
            onOpenChange={() => setIsDeleteModalOpen(false)}
        >
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
                                <p className='text-center'>Apakah kamu yakin menghapus group ini?</p>

                                <p className='text-center text-sm text-primary'>({`${group.nama}`})</p>
                            </div>
                        </ModalBody>

                        <ModalFooter className='flex justify-end'>
                            <Button
                                onPress={() => setIsDeleteModalOpen(false)}
                                color='primary'
                                variant='light'
                                radius='sm'
                            >
                                Batal
                            </Button>

                            <Button
                                onPress={async () => {
                                    await deleteGroup(group.id)

                                    setIsDeleteModalOpen(false)

                                    params.delete('id')
                                    window.history.pushState(null, '', `?${params.toString()}`)

                                    router.refresh()
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
    )
}