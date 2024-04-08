import { JSX, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from '@nextui-org/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { Discussion } from '@/@types/Group'
import DeleteDiscussionModal from '../../Modals/Groups/DeleteDiscussionModal'
import EditDiscussionModal from '../../Modals/Groups/EditDiscussionModal'

type Props = {
    selectedDiscussion: Discussion
}

export default function DiscussionSettingDropdown({ selectedDiscussion }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // states
    const [isDeleteDiscussionModalOpen, setIsDeleteDiscussionModalOpen] = useState<boolean>(false)

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
                        onPress={() => setIsDeleteDiscussionModalOpen(true)}
                        className='text-danger'
                        color='danger'
                        key='Delete'
                    >
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <DeleteDiscussionModal
                discussion={selectedDiscussion}
                isOpen={isDeleteDiscussionModalOpen}
                setIsDeleteModalOpen={setIsDeleteDiscussionModalOpen}
            />

            <EditDiscussionModal discussion={selectedDiscussion} isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    )
}
