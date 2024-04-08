'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Loading from '../../../Loading'
import { groupStore } from '@/store/backoffice/groupStore'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { Comment } from '@/@types/Group'
import { useSearchParams } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/outline'

type Props = {
    comment: Comment
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export default function DeleteCommentModal({ comment, isOpen, setIsOpen }: Props): JSX.Element {
    // global states
    const { isDeleting } = groupStore()

    // custom hooks
    const { deleteComment, getGroupDiscussionsById } = useGroup()

    // search params
    const searchParams = useSearchParams()

    // NOTE: DELETE RESPONSE STILL ERROR

    return (
        <>
            <TrashIcon
                onClick={() => setIsOpen(true)}
                className='h-4 w-4 cursor-pointer rounded text-danger duration-150 hover:bg-danger-50'
            />

            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
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
                                    <p className='text-center'>Apakah kamu yakin mengahapus komen ini?</p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await deleteComment(comment.id)

                                        await getGroupDiscussionsById(searchParams.get('id') as string)

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
