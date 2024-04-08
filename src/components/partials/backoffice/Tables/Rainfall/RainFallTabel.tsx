import { AnnualRainfall } from '@/@types/Rainfall'
import Loading from '@/components/partials/Loading'
import { rainfallStore } from '@/store/backoffice/rainfallStore'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { JSX } from 'react'

export default function RainFallTabel(): JSX.Element {
    // global states
    const { annualRainfalls, isFetching } = rainfallStore()

    return (
        <Table
            aria-label='Rainfall Table'
            classNames={{
                wrapper: 'p-4 rounded-lg lg:p-8 shadow-none apply-dark',
                th: 'bg-primary text-white text-base',
                td: 'text-base py-4',
                sortIcon: 'text-white',
            }}
        >
            <TableHeader>
                <TableColumn>No</TableColumn>

                <TableColumn>Tahun</TableColumn>

                <TableColumn>Curah Hujan (mm)</TableColumn>

                <TableColumn>Hari Hujan</TableColumn>

                <TableColumn>Defisit Air (mm)</TableColumn>
            </TableHeader>

            <TableBody isLoading={isFetching} emptyContent='Tidak ada data' loadingContent={<Loading />}>
                {annualRainfalls.data?.map((item: AnnualRainfall, index: number) => (
                    <TableRow key={`row-${index}`} className='even:bg-primary/10'>
                        <TableCell>{index + 1}</TableCell>

                        <TableCell>{item.year}</TableCell>

                        <TableCell>{item.rainfall}</TableCell>

                        <TableCell>{item.rainy_day}</TableCell>

                        <TableCell>{item.water_deficit}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
