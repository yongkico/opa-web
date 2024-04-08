import { Dispatch, JSX, SetStateAction, useRef } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'

type Props = {
    range: DateRange | undefined
    setRange: Dispatch<SetStateAction<DateRange | undefined>>
}

export default function DatePicker({ range, setRange }: Props): JSX.Element {
    // refs
    const popoverTriggerRef = useRef<HTMLButtonElement | null>(null)

    return (
        <Popover>
            <PopoverTrigger className='w-full'>
                <Button
                    className='rounded-r-none border border-secondary'
                    ref={popoverTriggerRef}
                    variant='bordered'
                    radius='sm'
                >
                    {range?.from && range?.to
                        ? `${format(range.from, 'yyyy-MM-dd').toString()} - ${format(
                              range.to,
                              'yyyy-MM-dd',
                          ).toString()}`
                        : 'Pilih Tanggal (dari - sampai)'}
                </Button>
            </PopoverTrigger>

            <PopoverContent className='w-full bg-white'>
                <DayPicker
                    mode='range'
                    selected={range}
                    onSelect={setRange}
                    modifiersClassNames={{
                        selected: 'selected-date',
                    }}
                />

                <p></p>
            </PopoverContent>
        </Popover>
    )
}
