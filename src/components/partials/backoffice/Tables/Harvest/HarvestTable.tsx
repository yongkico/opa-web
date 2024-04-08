import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { JSX, useEffect, useState } from 'react'
import DeleteHarvestModal from '../../Modals/Harvest/DeleteHarvestModal'
import { AsyncListData } from '@react-stately/data'
import { Harvest } from '@/@types/Harvest'
import EditHarvestModal from '../../Modals/Harvest/EditHarvestModal'
import { harvestStore } from '@/store/backoffice/harvestStore'
import { formatDateToHumanReadable, formatNumberToLocal } from '@/utils'

type Props = {
    list: AsyncListData<Harvest>
    searchText: string
}

export default function HarvestTable({ list, searchText }: Props): JSX.Element {
    // states
    const [currentPage, setCurrentPage] = useState<number>(1)

    // global states
    const { isFetching } = harvestStore()

    useEffect(() => {
        if (searchText !== '') setCurrentPage(1)
    }, [searchText])

    return (
        <>
            <Table
                aria-label='Harvest Table'
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
                classNames={{
                    wrapper: 'p-4 rounded-lg shadow-none apply-dark lg:p-8',
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

                    <TableColumn key='tanggal' allowsSorting>
                        Tanggal Panen
                    </TableColumn>

                    <TableColumn key='berat' allowsSorting>
                        Total Berat
                    </TableColumn>

                    <TableColumn key='tandan' allowsSorting>
                        Total TBS
                    </TableColumn>

                    <TableColumn key='harga' allowsSorting>
                        Total Harga Penjualan
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
                                item.berat.includes(searchText) ||
                                item.nama_kebun.includes(
                                    searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
                                ) ||
                                item.tanggal.includes(searchText) ||
                                item.harga.includes(searchText) ||
                                item.tandan.includes(searchText),
                        )
                        .slice(currentPage * 10 - 10, currentPage * 10)
                        .map((harvest: Harvest, index: number) => (
                            <TableRow className='even:bg-primary/10' key={`harvest-${index}`}>
                                <TableCell>{index + (currentPage * 10 - 10) + 1}</TableCell>

                                <TableCell>{harvest.nama_kebun}</TableCell>

                                <TableCell>{formatDateToHumanReadable(harvest.tanggal)}</TableCell>

                                <TableCell>{formatNumberToLocal(harvest.berat)} Kg</TableCell>

                                <TableCell>{formatNumberToLocal(harvest.tandan)}</TableCell>

                                <TableCell>Rp{Number(harvest.harga).toLocaleString('id-ID')}</TableCell>

                                <TableCell>
                                    <div className='flex gap-x-2'>
                                        <EditHarvestModal list={list} harvest={harvest} />

                                        <DeleteHarvestModal list={list} harvest={harvest} />
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
                                item.berat.includes(searchText) ||
                                item.nama_kebun.includes(
                                    searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
                                ) ||
                                item.tanggal.includes(searchText) ||
                                item.harga.includes(searchText) ||
                                item.tandan.includes(searchText),
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
                                        item.berat.includes(searchText) ||
                                        item.nama_kebun.includes(
                                            searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                                                letter.toUpperCase(),
                                            ),
                                        ) ||
                                        item.tanggal.includes(searchText) ||
                                        item.harga.includes(searchText) ||
                                        item.tandan.includes(searchText),
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
