import { Dispatch, JSX, SetStateAction, useRef } from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'

type Props = {
    chosenDate: string
    setChosenDate: Dispatch<SetStateAction<string>>
}

export default function SingleDatePicker({ chosenDate, setChosenDate }: Props): JSX.Element {
    // refs
    const popoverTriggerRef = useRef<HTMLButtonElement | null>(null)

    return (
        <Popover showArrow>
            <PopoverTrigger>
                <Button
                    ref={popoverTriggerRef}
                    className='flex justify-start active:scale-100'
                    variant='bordered'
                    radius='sm'
                >
                    {chosenDate ? `${format(chosenDate, 'dd-MM-yyyy').toString()}` : 'DD/MM/YYYY'}
                </Button>
            </PopoverTrigger>

            <PopoverContent className='dark:text-light' aria-label='Static Actions'>
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
