'use client'

import { FormEvent, JSX } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
} from '@nextui-org/react'
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

export default function EditUserModal({ isOpen, setIsOpen, list, user }: Props): JSX.Element {
    // global states
    const { isUpdating } = userManagementStore()

    // custom hooks
    const { updateUser } = useUserManagement()

    // for updating user
    async function handleUpdateUser(e: FormEvent<HTMLFormElement>) {
        await updateUser(user.id, e)

        setIsOpen(false)

        list.reload()
    }

    return (
        <>
            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={setIsOpen}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Hapus?</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='update-user-form' onSubmit={handleUpdateUser}>
                                    <div className='flex flex-col gap-4'>
                                        <Input
                                            variant='bordered'
                                            name='user_name'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Name'
                                            defaultValue={user.name}
                                            isDisabled={isUpdating}
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
                                            defaultSelectedKeys={[user.is_active]}
                                            isDisabled={isUpdating}
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
                                            defaultSelectedKeys={[user.role_id]}
                                            isDisabled={isUpdating}
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
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    form='update-user-form'
                                    type='submit'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isUpdating}
                                >
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
