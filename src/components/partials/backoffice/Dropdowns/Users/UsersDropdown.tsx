import { JSX, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import DeleteUserModal from '../../Modals/Users/DeleteUserModal'
import { User } from '@/@types/Auth'
import { AsyncListData } from '@react-stately/data'
import DetailUserModal from '../../Modals/Users/DetailUserModal'
import EditUserModal from '../../Modals/Users/EditUserModal'

type Props = {
    list: AsyncListData<User>
    user: User
}

export default function UsersDropdown({ list, user }: Props): JSX.Element {
    // states
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState<boolean>(false)
    const [isDetailUserModalOpen, setIsDetailUserModalOpen] = useState<boolean>(false)
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState<boolean>(false)

    return (
        <>
            <Dropdown
                classNames={{
                    content: 'dark:text-light',
                }}
            >
                <DropdownTrigger>
                    <EllipsisVerticalIcon className='h-5 w-5 cursor-pointer text-secondary' />
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                    <DropdownItem onPress={() => setIsDetailUserModalOpen(true)} key='detail'>
                        Detail
                    </DropdownItem>

                    <DropdownItem onPress={() => setIsEditUserModalOpen(true)} key='edit'>
                        Edit
                    </DropdownItem>

                    <DropdownItem
                        onPress={() => setIsDeleteUserModalOpen(true)}
                        key='delete'
                        className='text-danger'
                        color='danger'
                    >
                        Hapus
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <DeleteUserModal
                isOpen={isDeleteUserModalOpen}
                setIsOpen={setIsDeleteUserModalOpen}
                list={list}
                user={user}
            />

            <DetailUserModal
                isOpen={isDetailUserModalOpen}
                setIsOpen={setIsDetailUserModalOpen}
                list={list}
                user={user}
            />

            <EditUserModal isOpen={isEditUserModalOpen} setIsOpen={setIsEditUserModalOpen} list={list} user={user} />
        </>
    )
}
