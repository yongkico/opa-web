import { JSX, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { Rule } from '@/@types/Rule'
import DeleteRuleModal from '../../Modals/Rules/DeleteRuleModal'
import EditRuleModal from '../../Modals/Rules/EditRuleModal'
import { useConclusion } from '@/hooks/backoffice/useConclusion'

type Props = {
    rule: Rule
}

export default function RulesDropdown({ rule }: Props): JSX.Element {
    // states
    const [isDeleteRuleModalOpen, setIsDeleteRuleModalOpen] = useState<boolean>(false)
    const [isEditRuleModalOpen, setIsEditRuleModalOpen] = useState<boolean>(false)

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

                            setIsEditRuleModalOpen(true)
                        }}
                        key='edit'
                    >
                        Edit
                    </DropdownItem>

                    <DropdownItem
                        onPress={() => setIsDeleteRuleModalOpen(true)}
                        key='delete'
                        className='text-danger'
                        color='danger'
                    >
                        Hapus
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <DeleteRuleModal isOpen={isDeleteRuleModalOpen} setIsOpen={setIsDeleteRuleModalOpen} rule={rule} />

            <EditRuleModal isOpen={isEditRuleModalOpen} setIsOpen={setIsEditRuleModalOpen} rule={rule} />
        </>
    )
}
