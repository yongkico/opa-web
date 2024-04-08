'use client'

import { Group } from '@/@types/Group'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { groupStore } from '@/store/backoffice/groupStore'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react'
import { FormEvent, JSX } from 'react'

type Props = {
    group: Group
    isOpen: boolean
    onOpenChange: () => void
}

export default function EditGroupModal({ group, isOpen, onOpenChange }: Props): JSX.Element {
    // custom hooks
    const { editGroup } = useGroup()

    // global states
    const { isUpdating } = groupStore()

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
                                    await editGroup(group.id, e)

                                    onOpenChange()
                                }}
                            >
                                <div className='space-y-4 p-4 lg:p-8'>
                                    <div className='flex w-full flex-col gap-y-1'>
                                        <label htmlFor=''>Nama Grup</label>

                                        <Input
                                            name='group_name'
                                            variant='bordered'
                                            labelPlacement='outside'
                                            radius='sm'
                                            placeholder='Masukkan nama group'
                                            isRequired
                                            defaultValue={group.nama}
                                        />
                                    </div>

                                    <div className='flex w-full flex-col gap-y-1'>
                                        <label htmlFor=''>Deskripsi Grup</label>

                                        <Textarea
                                            variant='bordered'
                                            radius='sm'
                                            name='description'
                                            placeholder='Masukkan deskripsi'
                                            isRequired
                                            defaultValue={group.deskripsi}
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
                                Update Group
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
