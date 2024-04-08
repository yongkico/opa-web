'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Loading from '../../../Loading'
import { groupStore } from '@/store/backoffice/groupStore'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { Discussion } from '@/@types/Group'
import { useSearchParams } from 'next/navigation'

type Props = {
    discussion: Discussion
    isOpen: boolean
    setIsDeleteModalOpen: (open: boolean) => void
}

export default function DeleteDiscussionModal({ discussion, isOpen, setIsDeleteModalOpen }: Props): JSX.Element {
    // global states
    const { isDeleting } = groupStore()

    // custom hooks
    const { deleteDiscussion, getGroupDiscussionsById } = useGroup()

    // search params
    const searchParams = useSearchParams()

    // NOTE: DELETE RESPONSE STILL ERROR

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
                                <p className='text-center'>Apakah kamu yakin menghapus diskusi ini?</p>
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
                                    await deleteDiscussion(discussion.id)

                                    await getGroupDiscussionsById(searchParams.get('id') as string)

                                    setIsDeleteModalOpen(false)
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
