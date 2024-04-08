import { Rule } from '@/@types/Rule'
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { JSX } from 'react'
import { ruleStore } from '@/store/backoffice/ruleStore'
import { DataResponse } from '@/@types'
import RulesDropdown from '../../Dropdowns/Rules/RulesDropdown'

type Props = {
    list: DataResponse<Rule[]>
}

export default function RulesTable({ list }: Props): JSX.Element {
    // global states
    const { isFetching } = ruleStore()

    return (
        <Table
            classNames={{
                wrapper: 'p-0 rounded-none',
                table: 'apply-dark',
                th: 'bg-primary text-white text-base',
                td: 'text-base py-4',
            }}
        >
            <TableHeader>
                <TableColumn>Opsi</TableColumn>

                <TableColumn>Produktivitas</TableColumn>

                <TableColumn>Rerata Jumlah Tandan</TableColumn>

                <TableColumn>Rerata Berat Tandan</TableColumn>

                <TableColumn>Kesimpulan</TableColumn>
            </TableHeader>

            <TableBody isLoading={isFetching} loadingContent={<Spinner />} emptyContent='Tidak ada data'>
                {list.data?.map((rule: Rule, index: number) => (
                    <TableRow className='even:bg-primary/10' key={index}>
                        <TableCell>
                            <RulesDropdown rule={rule} />
                        </TableCell>

                        <TableCell>{rule.productivity}</TableCell>

                        <TableCell>{rule.average_ffb_quantity}</TableCell>

                        <TableCell>{rule.average_ffb_weight}</TableCell>

                        <TableCell>{rule.conclusion_message}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
