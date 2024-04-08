import { JSX, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { Role } from '@/@types/Role'
import DeleteRoleModal from '../../Modals/Roles/DeleteRoleModal'
import EditRoleModal from '../../Modals/Roles/EditRoleModal'
import { useConclusion } from '@/hooks/backoffice/useConclusion'

type Props = {
    role: Role
}

export default function RolesDropdown({ role }: Props): JSX.Element {
    // states
    const [isDeleteRoleModalOpen, setIsDeleteRoleModalOpen] = useState<boolean>(false)
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState<boolean>(false)

    // custom hooks
    const { getConclusions } = useConclusion()

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
                    <DropdownItem
                        onPress={() => {
                            getConclusions('1', '100')

                            setIsEditRoleModalOpen(true)
                        }}
                        key='edit'
                    >
                        Edit
                    </DropdownItem>

                    <DropdownItem
                        onPress={() => setIsDeleteRoleModalOpen(true)}
                        key='delete'
                        className='text-danger'
                        color='danger'
                    >
                        Hapus
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <DeleteRoleModal isOpen={isDeleteRoleModalOpen} setIsOpen={setIsDeleteRoleModalOpen} role={role} />

            <EditRoleModal isOpen={isEditRoleModalOpen} setIsOpen={setIsEditRoleModalOpen} role={role} />
        </>
    )
}
