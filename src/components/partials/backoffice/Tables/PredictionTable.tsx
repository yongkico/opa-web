import { Dispatch, JSX, SetStateAction } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'

type Props = {
    setIsEditModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function PredictionTable({ setIsEditModalOpen }: Props): JSX.Element {
    return (
        <table className='min-w-full'>
            <thead>
                <tr className='bg-primary text-left text-white'>
                    <th></th>

                    <th>Label Pohon</th>

                    <th>Bunga</th>

                    <th>Buah</th>

                    <th>Jumlah Pelepah</th>

                    <th>Tanggal</th>
                </tr>
            </thead>

            <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_row: number, index: number) => (
                    <tr key={`row-${index}`} className='even:bg-primary/10'>
                        <td>
                            <Popover>
                                <PopoverTrigger>
                                    <EllipsisVerticalIcon className='h-5 w-5 cursor-pointer text-secondary' />
                                </PopoverTrigger>

                                <PopoverContent className='w-max border-0 p-0'>
                                    <div className='flex flex-col items-start gap-y-2 rounded bg-primary p-4'>
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className='text-white duration-150 active:scale-90'
                                        >
                                            Edit
                                        </button>

                                        <button className='text-white duration-150 active:scale-90'>Hapus</button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </td>

                        <td>Pohon 1</td>

                        <td>42</td>

                        <td>52</td>

                        <td>62</td>

                        <td className='whitespace-nowrap'>26-06-2024</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
