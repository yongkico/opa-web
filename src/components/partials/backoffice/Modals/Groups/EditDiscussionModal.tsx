'use client'

import { Discussion } from '@/@types/Group'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { groupStore } from '@/store/backoffice/groupStore'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { FormEvent, JSX } from 'react'

type Props = {
    discussion: Discussion
    isOpen: boolean
    onOpenChange: () => void
}

export default function EditDiscussionModal({ discussion, isOpen, onOpenChange }: Props): JSX.Element {
    // custom hooks
    const { editDiscussion, getGroupDiscussionsById } = useGroup()

    // global states
    const { isUpdating } = groupStore()

    // search params
    const searchParams = useSearchParams()

    return (
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
                        <ModalHeader className='flex flex-col gap-1'>Edit Grup Diskusi</ModalHeader>

                        <ModalBody className='relative'>
                            <form
                                id='update-group'
                                onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                                    await editDiscussion(discussion.id, searchParams.get('id') as string, e)

                                    await getGroupDiscussionsById(searchParams.get('id') as string)

                                    onOpenChange()
                                }}
                            >
                                <div className='p-4 lg:p-8'>
                                    <div className='flex w-full flex-col gap-y-1'>
                                        <label htmlFor=''>Deskripsi Grup</label>

                                        <Textarea
                                            variant='bordered'
                                            radius='sm'
                                            name='content'
                                            placeholder='Masukkan deskripsi'
                                            isRequired
                                            defaultValue={discussion.konten}
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
                                form='update-group'
                                color='primary'
                                radius='sm'
                                isLoading={isUpdating}
                            >
                                Update Diskusi
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
