import { DataResponse } from '@/@types'
import { Role } from '@/@types/Role'
import { roleStore } from '@/store/backoffice/roleStore'
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { JSX } from 'react'
import RolesDropdown from '../../Dropdowns/Roles/RolesDropdown'

type Props = {
    list: DataResponse<Role[]>
}

export default function RulesTable({ list }: Props): JSX.Element {
    // global states
    const { isFetching } = roleStore()

    return (
        <Table
            onSortChange={() => console.log('sort change')}
            classNames={{
                wrapper: 'p-0 rounded-none',
                table: 'apply-dark',
                th: 'bg-primary text-white text-base',
                td: 'text-base py-4',
            }}
        >
            <TableHeader>
                <TableColumn key='name'>Opsi</TableColumn>

                <TableColumn key='height' allowsSorting>
                    Nama Peran
                </TableColumn>
            </TableHeader>

            <TableBody isLoading={isFetching} loadingContent={<Spinner />} emptyContent='Tidak ada data'>
                {list.data?.map((role: Role, index: number) => (
                    <TableRow key={index} className='even:bg-primary/10'>
                        <TableCell>
                            <RolesDropdown role={role} />
                        </TableCell>

                        <TableCell>{role.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
