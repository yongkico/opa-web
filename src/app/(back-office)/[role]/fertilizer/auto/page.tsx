import { JSX } from 'react'
import Link from 'next/link'

export default function AutoRecommendation(): JSX.Element {
    return (
        <div className='container min-h-screen p-4 md:p-8'>
            <header>
                <h1 className='mb-8 text-xl'>Rekomendasi Otomatis</h1>
            </header>

            {/* filter section  */}
            <section className='apply-dark rounded-lg border p-8'>
                <div className='mb-8'>
                    <header>
                        <h2 className='mb-4 w-max whitespace-nowrap text-lg'>Rekomendasikan Pupuk 🍃</h2>
                    </header>

                    <div className='flex flex-col gap-x-20 gap-y-4 md:flex-row'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor='farm'>Kebun</label>

                            <select className='input-primary'>
                                <option selected>Pilih Kebun</option>
                            </select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor='year'>Tahun</label>

                            <select className='input-primary'>
                                <option selected>Pilih Tahun</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='text-center'>
                    <button className='btn-primary'>Lihat Rekomendasi Pupuk</button>
                </div>
            </section>
            {/* end of filter section  */}

            {/* filter result section */}
            <section className='apply-dark mt-8'>
                <div className='overflow-x-auto'>
                    <table className='min-w-full'>
                        <thead className='bg-primary text-white'>
                            <tr>
                                <th rowSpan={2}>Nama Kebun</th>

                                <th rowSpan={2}>Tahun</th>

                                <th className='pb-0' colSpan={4}>
                                    Dosis Pupuk (Kg / Pohon / Tahun)
                                </th>

                                <th rowSpan={2}>Dibuat Pada</th>

                                <th rowSpan={2}>Aksi</th>
                            </tr>

                            <tr>
                                <th>Urea</th>

                                <th>TSP</th>

                                <th>MQP</th>

                                <th>Dolomit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[1, 2, 3, 4, 5].map((_row: number, index: number) => (
                                <tr className='even:bg-neutral-100 dark:even:bg-primary/10' key={`item-${index}`}>
                                    <td>
                                        <div className='max-w-[12rem]'>
                                            <p className='font-bold'>Kebun Sawit</p>

                                            <small className='font-semibold text-neutral-500 dark:text-neutral-400'>
                                                Aek Pancur, Kabupaten Deli Serdang, Sumatera Utara, Indonesia
                                            </small>
                                        </div>
                                    </td>

                                    <td>2023</td>

                                    <td>3.25 kg</td>

                                    <td>3.25 kg</td>

                                    <td>3.25 kg</td>

                                    <td>3.25 kg</td>

                                    <td>27-06-2023</td>

                                    <td>
                                        <Link href={'#'}>
                                            <button className='btn-primary px-4 py-0.5'>Detail</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* end of filter result section */}
        </div>
    )
}
