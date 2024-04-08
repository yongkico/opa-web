import { JSX, useState } from 'react'
import {
    Avatar,
    Chip,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react'
import { AsyncListData } from '@react-stately/data'
import { userManagementStore } from '@/store/backoffice/userManagementStore'
import { UserIcon } from '@heroicons/react/24/outline'
import { User } from '@/@types/Auth'
import UsersDropdown from '../../Dropdowns/Users/UsersDropdown'

type Props = {
    list: AsyncListData<User>
}

export default function UsersTable({ list }: Props): JSX.Element {
    // states
    const [currentPage, setCurrentPage] = useState<number>(1)

    // global states
    const { isFetching } = userManagementStore()

    return (
        <>
            <Table
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
                classNames={{
                    wrapper: 'p-0 rounded-none shadow-none',
                    table: 'apply-dark',
                    th: 'bg-primary text-white text-base',
                    td: 'text-base py-4',
                }}
            >
                <TableHeader>
                    <TableColumn>Opsi</TableColumn>

                    <TableColumn key='name' allowsSorting>
                        Pengguna
                    </TableColumn>

                    <TableColumn key='email' allowsSorting>
                        Email
                    </TableColumn>

                    <TableColumn key='role' allowsSorting>
                        Role
                    </TableColumn>

                    <TableColumn key='is_active' allowsSorting>
                        Status
                    </TableColumn>
                </TableHeader>

                <TableBody
                    items={list.items}
                    emptyContent='Tidak ada data.'
                    isLoading={isFetching}
                    loadingContent={<Spinner />}
                >
                    {list.items.slice(currentPage * 10 - 10, currentPage * 10).map((user: User, index: number) => (
                        <TableRow className='even:bg-primary/10' key={index}>
                            <TableCell>
                                <UsersDropdown list={list} user={user} />
                            </TableCell>

                            <TableCell>
                                <div className='flex items-center gap-x-2'>
                                    <Avatar src={user.image_url} />

                                    <span>{user.name}</span>
                                </div>
                            </TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>
                                <div className='flex items-center gap-x-1'>
                                    <UserIcon className='h-4 w-4 text-secondary' />

                                    <span>{user.role_name}</span>
                                </div>
                            </TableCell>

                            <TableCell>
                                {user.is_active === '1' ? (
                                    <Chip color='primary' variant='flat'>
                                        Aktif
                                    </Chip>
                                ) : (
                                    <Chip color='danger' variant='flat'>
                                        Tidak Aktif
                                    </Chip>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* pagination */}
            <div className='flex flex-col items-center justify-between gap-4 p-4 lg:flex-row lg:p-8'>
                <p className='text-sm'>
                    Showing {currentPage * 10 - 9} to {currentPage * 10} of {list.items.length} entries
                </p>

                <div className='flex items-center gap-x-2'>
                    <Pagination
                        onChange={(page) => {
                            setCurrentPage(page)
                        }}
                        classNames={{
                            item: 'bg-primary/10',
                        }}
                        total={Math.ceil(list.items.length / 10) || 1}
                        initialPage={currentPage || 1}
                    />
                </div>
            </div>
        </>
    )
}
