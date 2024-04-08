'use client'

import { FormEvent, JSX } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from '@nextui-org/react'
import { groupStore } from '@/store/backoffice/groupStore'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { useSearchParams } from 'next/navigation'

export default function InviteGroupMemberModal(): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // params
    const params = useSearchParams()

    // global states
    const { isAddingMember } = groupStore()

    // custom hooks
    const { inviteMember } = useGroup()

    // INVITE MEMBER STILL ERROR

    // for handling invite member to group
    async function handleInviteMember(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        await inviteMember(e.currentTarget.email.value, params.get('id') as string)

        onOpenChange()
    }

    return (
        <>
            <Button onPress={onOpen} className='w-max' color='primary' radius='sm' size='sm'>
                Undang Anggota
            </Button>

            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Undang Anggota</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='invite-group-member-form' onSubmit={handleInviteMember}>
                                    <Input
                                        labelPlacement='outside'
                                        radius='sm'
                                        variant='bordered'
                                        name='email'
                                        type='email'
                                        label='Email'
                                        placeholder='Masukkan email...'
                                        isDisabled={isAddingMember}
                                    />
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    form='invite-group-member-form'
                                    type='submit'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isAddingMember}
                                >
                                    Undang
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
