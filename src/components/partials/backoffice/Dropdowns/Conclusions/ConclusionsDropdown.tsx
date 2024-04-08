import { JSX, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { Conclusion } from '@/@types/Conclusion'
import DeleteConclusionModal from '../../Modals/Conclusions/DeleteConclusionModal'
import EditConclusionModal from '../../Modals/Conclusions/EditConclusionModal'

type Props = {
    conclusion: Conclusion
}

export default function ConclusionsDropdown({ conclusion }: Props): JSX.Element {
    // states
    const [isDeleteConclusionModalOpen, setIsDeleteConclusionModalOpen] = useState<boolean>(false)
    const [isEditConclusionModalOpen, setIsEditConclusionModalOpen] = useState<boolean>(false)

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
                    <DropdownItem onPress={() => setIsEditConclusionModalOpen(true)} key='edit'>
                        Edit
                    </DropdownItem>

                    <DropdownItem
                        onPress={() => setIsDeleteConclusionModalOpen(true)}
                        key='delete'
                        className='text-danger'
                        color='danger'
                    >
                        Hapus
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <DeleteConclusionModal
                isOpen={isDeleteConclusionModalOpen}
                setIsOpen={setIsDeleteConclusionModalOpen}
                conclusion={conclusion}
            />

            <EditConclusionModal
                isOpen={isEditConclusionModalOpen}
                setIsOpen={setIsEditConclusionModalOpen}
                conclusion={conclusion}
            />
        </>
    )
}
