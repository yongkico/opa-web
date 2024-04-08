import { Dispatch, JSX, SetStateAction } from 'react'

type Props = {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function TargetTable({ setIsOpen }: Props): JSX.Element {
    return (
        <table className='min-w-full'>
            <thead className='thead-primary table-auto'>
                <tr className='text-left'>
                    <th>Nama Kebun</th>

                    <th>Tahun</th>

                    <th>Target (Ton/Ha/Tahun)</th>

                    <th>Aksi</th>
                </tr>
            </thead>

            <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_row: number, index: number) => (
                    <tr key={`row-${index}`} className='even:bg-primary/10'>
                        <td>
                            <p>Kebun Sawit</p>

                            <small className='font-normal'>
                                Aek Pancur, Kabupaten Deli Serdang, Sumatera Utara, Indonesia
                            </small>
                        </td>

                        <td>2023</td>

                        <td>1091 Ton</td>

                        <td>
                            <div className='flex gap-x-2'>
                                <button onClick={() => setIsOpen(true)} className='btn-edit px-4 py-1'>
                                    Edit
                                </button>

                                <button className='btn-danger px-4 py-1'>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
