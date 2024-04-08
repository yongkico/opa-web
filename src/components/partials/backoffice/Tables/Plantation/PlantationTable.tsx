import { JSX, useEffect, useState } from 'react'
import {
    Button,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { Plantation } from '@/@types/Plantation'
import DeletePlantationModal from '../../Modals/Plantation/DeletePlantationModal'
import { AsyncListData } from '@react-stately/data'
import DetailPlantationModal from '../../Modals/Plantation/DetailPlantationModal'
import Link from 'next/link'
import { formatNumberToLocal, getRole } from '@/utils'
import { userStore } from '@/store/userStore'

type Props = {
    list: AsyncListData<Plantation>
    searchText: string
}

export default function PlantationTable({ list, searchText }: Props): JSX.Element {
    // states
    const [currentPage, setCurrentPage] = useState<number>(1)

    // global states
    const { isFetching } = plantationStore()
    const { loggedInUser } = userStore()

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
                    wrapper: 'p-4 lg:p-8 rounded-lg shadow apply-dark',
                    th: 'bg-primary text-white text-base',
                    td: 'text-base py-4',
                    sortIcon: 'text-white',
                }}
            >
                <TableHeader>
                    <TableColumn>No</TableColumn>

                    <TableColumn key='nama' allowsSorting>
                        Nama Kebun
                    </TableColumn>

                    <TableColumn key='luas' allowsSorting>
                        Luas Lahan
                    </TableColumn>

                    <TableColumn key='jumlah_pohon' allowsSorting>
                        Jumlah Pohon
                    </TableColumn>

                    <TableColumn key='tahun_tanam' allowsSorting>
                        Tahun Tanam
                    </TableColumn>

                    <TableColumn key='actions'>Aksi</TableColumn>
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
                                item.nama.includes(
                                    searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
                                ) ||
                                item.luas.includes(searchText) ||
                                item.jumlah_pohon.includes(searchText) ||
                                item.tahun_tanam.includes(searchText),
                        )
                        .slice(currentPage * 10 - 10, currentPage * 10)
                        .map((plantation: Plantation, index: number) => (
                            <TableRow className='even:bg-primary/10' key={`plantation-${index}`}>
                                <TableCell>{index + (currentPage * 10 - 10) + 1}</TableCell>

                                <TableCell>{plantation.nama}</TableCell>

                                <TableCell>{formatNumberToLocal(plantation.luas)}</TableCell>

                                <TableCell>{formatNumberToLocal(plantation.jumlah_pohon)}</TableCell>

                                <TableCell>{plantation.tahun_tanam}</TableCell>

                                <TableCell>
                                    <div className='flex gap-x-2'>
                                        {/* <EditPlantationModal plantation={plantation} /> */}
                                        <Button
                                            href={`/${getRole(loggedInUser.data?.role_name)}/plantation/edit/${
                                                plantation.id
                                            }`}
                                            as={Link}
                                            color='primary'
                                            size='sm'
                                            radius='sm'
                                        >
                                            Edit
                                        </Button>

                                        <DetailPlantationModal plantation={plantation} />

                                        <DeletePlantationModal list={list} plantation={plantation} />
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
                                item.nama.includes(
                                    searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
                                ) ||
                                item.luas.includes(searchText) ||
                                item.jumlah_pohon.includes(searchText) ||
                                item.tahun_tanam.includes(searchText),
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
                                        item.nama.includes(
                                            searchText.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                                                letter.toUpperCase(),
                                            ),
                                        ) ||
                                        item.luas.includes(searchText) ||
                                        item.jumlah_pohon.includes(searchText) ||
                                        item.tahun_tanam.includes(searchText),
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
