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
    Select,
    SelectItem,
} from '@nextui-org/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { userManagementStore } from '@/store/backoffice/userManagementStore'
import { useUserManagement } from '@/hooks/backoffice/useUserManagement'
import { AsyncListData } from '@react-stately/data'
import { User } from '@/@types/Auth'

type Props = {
    list: AsyncListData<User>
}

export default function AddUserModal({ list }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isCreating } = userManagementStore()

    // custom hooks
    const { createUser } = useUserManagement()

    // for updating user
    async function handleCreateUser(e: FormEvent<HTMLFormElement>) {
        await createUser(e)

        onOpenChange()

        list.reload()
    }

    return (
        <>
            <Button onPress={onOpen} className='w-max' color='primary' radius='sm' isIconOnly>
                <PlusIcon className='h-4 w-4' />
            </Button>

            <Modal
                scrollBehavior='inside'
                className='dark:text-light'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                aria-label='Tambah Pengguna'
            >
                <ModalContent aria-label='Tambah Pengguna'>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Tambah Pengguna</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='create-user-form' onSubmit={handleCreateUser}>
                                    <div className='flex flex-col gap-4'>
                                        <Input
                                            variant='bordered'
                                            name='name'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Name'
                                            isDisabled={isCreating}
                                        />

                                        <Input
                                            variant='bordered'
                                            name='email'
                                            type='email'
                                            radius='sm'
                                            autoComplete='off'
                                            labelPlacement='outside'
                                            placeholder='Email'
                                            isDisabled={isCreating}
                                        />

                                        <Input
                                            variant='bordered'
                                            name='password'
                                            type='password'
                                            autoComplete='off'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Password'
                                            isDisabled={isCreating}
                                        />

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            name='is_active'
                                            labelPlacement='outside'
                                            placeholder='Status'
                                            isDisabled={isCreating}
                                        >
                                            <SelectItem key={1} value='1'>
                                                Aktif
                                            </SelectItem>

                                            <SelectItem key={2} value='2'>
                                                Tidak Aktif
                                            </SelectItem>
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            name='role_id'
                                            labelPlacement='outside'
                                            placeholder='Role'
                                            isDisabled={isCreating}
                                        >
                                            <SelectItem key={'1'} value='1'>
                                                Administrator
                                            </SelectItem>

                                            <SelectItem key={'2'} value='2'>
                                                Member
                                            </SelectItem>

                                            <SelectItem key={'3'} value='3'>
                                                Author
                                            </SelectItem>
                                        </Select>
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='secondary' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    isLoading={isCreating}
                                    type='submit'
                                    form='create-user-form'
                                    color='primary'
                                    radius='sm'
                                >
                                    Tambah
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
