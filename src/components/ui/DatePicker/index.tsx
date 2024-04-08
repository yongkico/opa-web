import { JSX, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'
import { DayPicker } from 'react-day-picker'
import { getTodayDate } from '@/utils'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'

export default function DatePicker(): JSX.Element {
    // states
    const [chosenDate, setChosenDate] = useState<string>(getTodayDate())

    // refs
    const popoverTriggerRef = useRef<HTMLButtonElement | null>(null)

    return (
        <Popover>
            <PopoverTrigger ref={popoverTriggerRef} className='w-full'>
                <input
                    onChange={() => {}}
                    className='input-primary w-full cursor-pointer'
                    type='text'
                    placeholder='Choose Date'
                    value={format(new Date(chosenDate), 'PPP')}
                />
            </PopoverTrigger>

            <PopoverContent className='w-full bg-white'>
                <DayPicker
                    mode='single'
                    selected={chosenDate as any}
                    onDayClick={setChosenDate as any}
                    onSelect={() => popoverTriggerRef.current?.click()}
                    modifiersClassNames={{
                        selected: 'selected-date',
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}
