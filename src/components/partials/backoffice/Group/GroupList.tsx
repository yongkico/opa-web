'use client'

import { JSX } from 'react'
import { UserIcon } from '@heroicons/react/24/solid'
import AddNewGroupModal from '../Modals/Groups/AddNewGroupModal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { groupStore } from '@/store/backoffice/groupStore'
import { Group } from '@/@types/Group'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { useSearchParams } from 'next/navigation'
import { Spinner } from '@nextui-org/react'

export default function GroupList(): JSX.Element {
    // global states
    const { isGroupListOpen, setIsGroupListOpen, groups, isFetchingGroup } = groupStore()

    // custom hooks
    const { getGroupDiscussionsById, getGroupStatistic } = useGroup()

    // search params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    return (
        <div
            className={`${
                isGroupListOpen ? 'w-full' : '-translate-x-full lg:translate-x-0'
            } absolute inset-0 z-20 overflow-hidden duration-300 lg:w-80 lg:pr-8 lg:duration-0`}
        >
            {/* group list header */}
            <header className='apply-dark flex h-16 items-center justify-between border-b bg-white pb-4'>
                <AddNewGroupModal />

                <XMarkIcon onClick={() => setIsGroupListOpen(false)} className='h-6 w-6 cursor-pointer lg:hidden' />
            </header>
            {/* end of group list header */}

            {/* list */}
            <ul className='max-h-[70vh] overflow-y-auto'>
                {isFetchingGroup && (
                    <div className='mt-8 flex items-center justify-center'>
                        <Spinner size='lg' />
                    </div>
                )}

                {groups.data?.length === 0 ||
                    (!groups.data && (
                        <div className='mt-8 flex items-center justify-center'>
                            <p className='text-primary'>Tidak ada grup</p>
                        </div>
                    ))}

                {groups.data?.map((group: Group, index: number) => (
                    <li
                        onClick={() => {
                            getGroupDiscussionsById(group.id)
                            getGroupStatistic(group.id, '', '')

                            params.set('id', group.id)
                            params.delete('discussion_id')
                            params.delete('start_date')
                            params.delete('end_date')

                            window.history.pushState(null, '', `?${params.toString()}`)

                            setIsGroupListOpen(false)
                        }}
                        className={`${group.id === params.get('id') ? 'bg-primary/20' : ''} ${
                            index === 0
                                ? 'rounded-b-xl'
                                : index === groups.data?.length - 1
                                  ? 'rounded-t-xl'
                                  : 'rounded-lg'
                        } flex cursor-pointer items-center justify-between gap-x-4 p-4 duration-300 hover:bg-primary/20`}
                        key={`grup-${index}`}
                    >
                        <div>
                            <p className='font-bold'>{group.nama}</p>

                            <p className='line-clamp-1 text-xs'>{group.deskripsi}</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                            <UserIcon className='h-4 w-4' />

                            <p>{group.anggota?.length}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {/* end of list */}
        </div>
    )
}
