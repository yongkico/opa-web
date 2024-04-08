import { JSX, useEffect, useState } from 'react'
import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { targetStore } from '@/store/backoffice/targetStore'
import { Target } from '@/@types/Target'
import DeleteTargetModal from '../../Modals/Target/DeleteTargetModal'
import EditTargetModal from '../../Modals/Target/EditTargetModal'
import { AsyncListData } from '@react-stately/data'
import { formatNumberToLocal } from '@/utils'

type Props = {
    list: AsyncListData<Target>
    searchText: string
}

export default function TargetTable({ list, searchText }: Props): JSX.Element {
    // states
    const [currentPage, setCurrentPage] = useState<number>(1)

    // global states
    const { isFetching } = targetStore()

    useEffect(() => {
        if (searchText !== '') setCurrentPage(1)
    }, [searchText])

    return (
        <>
            <Table
                aria-label='Plantations Table'
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
                classNames={{
                    wrapper: 'p-4 rounded-lg shadow lg:p-8 apply-dark',
                    th: 'bg-primary text-white text-base',
                    td: 'text-base py-4',
                    sortIcon: 'text-white',
                }}
            >
                <TableHeader>
                    <TableColumn>No</TableColumn>

                    <TableColumn key='nama_kebun' allowsSorting>
                        Nama Kebun
                    </TableColumn>

                    <TableColumn key='tahun' allowsSorting>
                        Tahun
                    </TableColumn>

                    <TableColumn key='target' allowsSorting>
                        Target (Ton/Ha/Tahun)
                    </TableColumn>

                    <TableColumn>Aksi</TableColumn>
                </TableHeader>

                <TableBody
                    emptyContent='Tidak ada data'
                    items={list.items}
                    isLoading={isFetching}
                    loadingContent={<Spinner />}
                >
                    {list.items
                        .filter(
                            (item) =>
                                item.nama_kebun.includes(
                                    searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
                                ) ||
                                item.tahun.includes(searchText) ||
                                item.target.includes(searchText),
                        )
                        .slice(currentPage * 10 - 10, currentPage * 10)
                        .map((target: Target, index: number) => (
                            <TableRow className='even:bg-primary/10' key={`target-${index}`}>
                                <TableCell>{index + (currentPage * 10 - 10) + 1}</TableCell>

                                <TableCell>{target.nama_kebun}</TableCell>

                                <TableCell>{target.tahun}</TableCell>

                                <TableCell>{formatNumberToLocal(target.target)} Ton</TableCell>

                                <TableCell>
                                    <div className='flex gap-x-2'>
                                        <EditTargetModal list={list} target={target} />

                                        <DeleteTargetModal list={list} target={target} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {/* pagination */}
            <div className='flex flex-col items-center justify-between gap-4 p-4 lg:flex-row lg:p-8'>
                <p className='text-sm'>
                    Showing {currentPage * 10 - 9} to {currentPage * 10} of{' '}
                    {
                        list.items.filter(
                            (item) =>
                                item.nama_kebun.includes(
                                    searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
                                ) ||
                                item.tahun.includes(searchText) ||
                                item.target.includes(searchText),
                        ).length
                    }{' '}
                    entries
                </p>

                <div className='flex items-center gap-x-2'>
                    <Pagination
                        onChange={(page) => {
                            setCurrentPage(page)
                        }}
                        classNames={{
                            item: 'bg-primary/10',
                        }}
                        total={
                            Math.ceil(
                                list.items.filter(
                                    (item) =>
                                        item.nama_kebun.includes(
                                            searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                                                letter.toUpperCase(),
                                            ),
                                        ) ||
                                        item.tahun.includes(searchText) ||
                                        item.target.includes(searchText),
                                ).length / 10,
                            ) || 1
                        }
                        initialPage={currentPage || 1}
                    />
                </div>
            </div>
        </>
    )
}
