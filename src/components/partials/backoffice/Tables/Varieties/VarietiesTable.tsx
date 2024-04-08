'use client'

import { JSX } from 'react'
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { varietyStore } from '@/store/backoffice/varietyStore'
import { useVariety } from '@/hooks/backoffice/useVariety'
import { useEffectOnce } from 'usehooks-ts'
import { Variety } from '@/@types/Variety'
import EditVarietyModal from '../../Modals/Varieties/EditVarietyModal'
import DeleteVarietyModal from '../../Modals/Varieties/DeleteVarietyModal'

export default function VarietiesTable(): JSX.Element {
    // global states
    const { isFetching, varieties } = varietyStore()

    // custom hooks
    const { getVarieties } = useVariety()

    useEffectOnce(() => {
        getVarieties()
    })

    return (
        <Table
            aria-label='Plantations Table'
            classNames={{
                wrapper: 'p-4 rounded-lg lg:p-8 shadow-none apply-dark',
                th: 'bg-primary text-white text-base',
                td: 'text-base py-4',
                sortIcon: 'text-white',
            }}
        >
            <TableHeader>
                <TableColumn>No</TableColumn>

                <TableColumn key='nama_kebun'>Nama Varietas</TableColumn>

                <TableColumn>Aksi</TableColumn>
            </TableHeader>

            <TableBody
                emptyContent='Tidak ada data'
                // items={list.items}
                isLoading={isFetching}
                loadingContent={<Spinner />}
            >
                {varieties.data?.map((variety: Variety, index: number) => (
                    <TableRow key={`variety-${index}`}>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell>{variety.name}</TableCell>

                        <TableCell>
                            <div className='flex gap-x-2'>
                                <EditVarietyModal variety={variety} />

                                <DeleteVarietyModal variety={variety} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
