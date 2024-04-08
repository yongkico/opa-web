import { JSX, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from '@nextui-org/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { Group } from '@/@types/Group'
import DeleteGroupModal from '../../Modals/Groups/DeleteGroupModal'
import EditGroupModal from '../../Modals/Groups/EditGroupModal'

type Props = {
    selectedGroup: Group
}

export default function GroupSettingDropdown({ selectedGroup }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // states
    const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState<boolean>(false)

    return (
        <>
            <Dropdown
                classNames={{
                    content: 'dark:text-light dark:bg-dark',
                }}
            >
                <DropdownTrigger>
                    <EllipsisVerticalIcon className='h-5 w-5 cursor-pointer text-secondary' />
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                    <DropdownItem onPress={onOpen} key='edit'>
                        Edit
                    </DropdownItem>

                    <DropdownItem
                        onPress={() => setIsDeleteGroupModalOpen(true)}
                        className='text-danger'
                        color='danger'
                        key='Delete'
                    >
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <DeleteGroupModal
                group={selectedGroup}
                isOpen={isDeleteGroupModalOpen}
                setIsDeleteModalOpen={setIsDeleteGroupModalOpen}
            />

            <EditGroupModal group={selectedGroup} isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    )
}
