import { JSX } from 'react'
import { Button } from '@nextui-org/react'
import { utils, writeFile } from 'xlsx'
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'

type Props = {
    data: object[]
    fileName: string
    customHeader: string[]
}

export default function ExportToExcel({ data, fileName, customHeader }: Props): JSX.Element {
    function handleExport() {
        // create workbook
        const workbook = utils.book_new()

        // create worksheet
        const worksheet = utils.json_to_sheet(data)

        // custom header
        utils.sheet_add_aoa(worksheet, [customHeader], { origin: 'A1' })

        // append worksheet to workbook
        utils.book_append_sheet(workbook, worksheet, 'Sheet 1')

        // export spreadsheet
        writeFile(workbook, `${fileName}.xlsx`, { bookType: 'xlsx', compression: true })
    }

    return (
        <div>
            <Button
                className='border'
                onPress={handleExport}
                variant='bordered'
                color='secondary'
                radius='sm'
                startContent={<DocumentArrowUpIcon className='h-4 w-4' />}
            >
                Export ke excel
            </Button>
        </div>
    )
}
