import { Conclusion } from '@/@types/Conclusion'
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { JSX } from 'react'
import { conclusionStore } from '@/store/backoffice/conclusionStore'
import { DataResponse } from '@/@types'
import ConclusionsDropdown from '../../Dropdowns/Conclusions/ConclusionsDropdown'

type Props = {
    list: DataResponse<Conclusion[]>
}

export default function ConclusionsTable({ list }: Props): JSX.Element {
    // global states
    const { isFetching } = conclusionStore()

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
                <TableColumn>Opsi</TableColumn>

                <TableColumn allowsSorting>Pesan</TableColumn>
            </TableHeader>

            <TableBody isLoading={isFetching} loadingContent={<Spinner />} emptyContent='Tidak ada data'>
                {list.data?.map((conclusion: Conclusion, index: number) => (
                    <TableRow className='even:bg-primary/10' key={index}>
                        <TableCell>
                            <ConclusionsDropdown conclusion={conclusion} />
                        </TableCell>

                        <TableCell>{conclusion.message}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
