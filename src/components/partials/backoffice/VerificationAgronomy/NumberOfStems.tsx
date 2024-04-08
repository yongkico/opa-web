import { AssetsDashboard } from '@/assets'
import { cn } from '@/utils'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import Link from 'next/link'
import { JSX } from 'react'

export default function NumberOfStems(): JSX.Element {
    return (
        <div className='space-y-4 lg:space-y-8'>
            <header>
                <h1>Jumlah Pelepah, Bunga, dan Buah</h1>
            </header>
            {/* add sections */}
            <section>
                <Link
                    href='/member/verification-agronomy/number-of-stems/add'
                    className='btn-secondary ml-auto block w-max'
                >
                    + Tambah Data
                </Link>
            </section>
            {/* end of add sections */}

            {/* information section */}
            <section className='rounded-lg bg-primary/20 p-2 text-primary '>
                <div className='flex items-center gap-x-2 border-b border-primary/50 p-2'>
                    <ExclamationCircleIcon className='h-5 w-5' />

                    <span className='font-bold'>Informasi</span>
                </div>

                <ul className='list-disc p-2 pl-8 font-semibold'>
                    <li>
                        Pengamatan/verifikasi sebaiknya dilakukan pada Bulan Desember untuk Semester I dan Bulan Juni
                        untuk Semester II.
                    </li>

                    <li>
                        Untuk petunjuk penentuan pohon contoh dapat membaca artikel ini: cara menentukan pohon contoh
                        untuk quality control agronomi
                    </li>
                </ul>
            </section>
            {/* end of information section */}

            {/* plantation info section */}
            <section className='apply-dark space-y-8 rounded-lg border p-4'>
                <div className='flex flex-col items-end gap-4 p-4 md:flex-row'>
                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor=''>Kebun</label>

                        <select className='input-primary' name='' id=''>
                            <option value=''>Pilih Kebun</option>
                            <option value=''>Kebun A</option>
                            <option value=''>Kebun B</option>
                            <option value=''>Kebun C</option>
                        </select>
                    </div>

                    <button className='btn-icon'>
                        <MagnifyingGlassIcon className='h-5 w-5' />
                        Search
                    </button>
                </div>

                <div className='apply-dark rounded-lg bg-primary p-4 text-light lg:p-8'>
                    <div className='flex flex-col gap-4 lg:flex-row lg:gap-8'>
                        <div className='grid grid-cols-2 gap-4 lg:w-1/4 lg:grid-cols-1'>
                            <div>
                                <p className='text-sm'>Kebun</p>

                                <p>Kebun A</p>
                            </div>

                            <div>
                                <p className='text-sm'>Semester</p>

                                <p>Semester 1</p>
                            </div>

                            <div>
                                <p className='text-sm'>Tahun</p>

                                <p>2023</p>
                            </div>
                        </div>

                        {/* grid */}
                        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8'>
                            <div className='relative h-max overflow-hidden rounded-lg bg-accent p-4 text-center text-light'>
                                {/* blob */}
                                <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-600'></div>

                                <div className='relative space-y-4'>
                                    <p>Rerata Jumlah Bunga dan Buah</p>

                                    <p className='text-5xl font-bold'>5.1</p>

                                    <p className='text-sm'>tandan per pohon</p>

                                    <div className='rounded-full bg-orange-600 p-2 text-sm'>
                                        <p>Jumlah tandan masih dibawah standar</p>
                                    </div>
                                </div>
                            </div>

                            <div className='relative h-max overflow-hidden rounded-lg bg-accent p-4 text-center text-light'>
                                {/* blob */}
                                <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-600'></div>

                                <div className='relative space-y-4'>
                                    <p>Rerata Jumlah Pelepah</p>

                                    <p className='text-5xl font-bold'>42</p>

                                    <p className='text-sm'>pelepah per pohon</p>

                                    <div className='rounded-full bg-green-600 p-2 text-sm'>
                                        <p>Jumlah pelepah sesuai standar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative mt-4 w-full space-y-2'>
                        <p>Diverifikasi pada</p>

                        <div className='flex flex-col gap-4 lg:flex-row lg:items-end'>
                            <p className='w-max whitespace-nowrap'>📅10 November 2023</p>

                            <p className='w-max'>⏰10:20</p>

                            <img
                                className='absolute -bottom-8 -right-6 hidden lg:block'
                                src={AssetsDashboard.asset_productivity.src}
                                alt='Asset Pelepah'
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* end of plantation info section */}

            {/* table section */}
            <section className='space-y-8 p-4 lg:space-y-16'>
                {/* filter */}
                <div className='space-y-4'>
                    <p className='text-lg font-bold'>Seluruh Data Jumlah Pelepah, Bunga dan Buah</p>

                    <div className='grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Kebun</label>

                            <select className='input-primary' name='' id=''>
                                <option value=''>Pilih Kebun</option>
                                <option value=''>Kebun A</option>
                                <option value=''>Kebun B</option>
                                <option value=''>Kebun C</option>
                            </select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Semester</label>

                            <select className='input-primary' name='' id=''>
                                <option value=''>Pilih Semester</option>
                                <option value=''>Semester 1</option>
                                <option value=''>Semester 2</option>
                                <option value=''>Semester 3</option>
                            </select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor=''>Tahun</label>

                            <select className='input-primary' name='' id=''>
                                <option value=''>Pilih Tahun</option>
                                <option value=''>Tahun 2023</option>
                                <option value=''>Tahun 2024</option>
                                <option value=''>Tahun 2025</option>
                            </select>
                        </div>

                        <button className='btn-primary'>Filter</button>
                    </div>
                </div>
                {/* end of filter */}

                {/* table */}
                <div className='space-y-4'>
                    <button className='btn-outline'>Export to Excel</button>

                    <Table
                        onSortChange={() => console.log('sort change')}
                        classNames={{
                            wrapper: 'p-0 rounded-none shadow-none',
                            table: 'apply-dark',
                            th: 'bg-primary text-white text-base',
                            td: 'text-base py-4',
                        }}
                    >
                        <TableHeader>
                            <TableColumn>Nama Kebun</TableColumn>

                            <TableColumn allowsSorting>Tanggal Verifikasi</TableColumn>

                            <TableColumn allowsSorting>Semester</TableColumn>

                            <TableColumn allowsSorting>Rerata Jumlah Bunga dan Buah</TableColumn>

                            <TableColumn allowsSorting>Rerata Jumlah Pelepah</TableColumn>

                            <TableColumn allowsSorting>Aksi</TableColumn>
                        </TableHeader>

                        <TableBody>
                            {[...Array(4)].map((_: any, index: number) => (
                                <TableRow className='even:bg-primary/10' key={index}>
                                    <TableCell>
                                        <div>
                                            <p>Kebun Sawit</p>

                                            <small className='font-normal'>
                                                Aek Pancur, Kabupaten Deli Serdang, Sumatera Utara, Indonesia
                                            </small>
                                        </div>
                                    </TableCell>

                                    <TableCell>29 Desember 2022</TableCell>

                                    <TableCell>Semester I 2022</TableCell>

                                    <TableCell>
                                        <div className='flex items-center gap-x-2'>
                                            <span
                                                className={`${cn({
                                                    'bg-green-500 text-light': true,
                                                    'bg-red-600 text-light': false,
                                                })} aspect-square h-4 w-4 whitespace-nowrap rounded-full text-center`}
                                            ></span>

                                            <span>6.1 tandan</span>
                                        </div>

                                        <small>Rerata jumlah bunga dan buah masih sesuai standar</small>
                                    </TableCell>

                                    <TableCell>
                                        <div className='flex items-center gap-x-2'>
                                            <span
                                                className={`${cn({
                                                    'bg-green-500 text-light': false,
                                                    'bg-red-600 text-light': true,
                                                })} aspect-square h-4 w-4 whitespace-nowrap rounded-full text-center`}
                                            ></span>

                                            <span>35 pelepah</span>
                                        </div>

                                        <small>Rerata jumlah pelepah masih dibawah standar</small>
                                    </TableCell>

                                    <TableCell>
                                        <div className='space-y-2'>
                                            <button className='btn-edit w-full px-4 py-1'>Lihat</button>

                                            <button className='btn-secondary w-full px-4 py-1'>Edit</button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* pagination */}
                    <div className='flex flex-col items-center justify-between gap-4 py-4 lg:flex-row lg:py-8'>
                        <p className='text-sm'>Showing 1 to 10 of 1000 entries</p>

                        <div className='flex items-center gap-x-2'>
                            <Pagination
                                classNames={{
                                    item: 'bg-primary/10',
                                }}
                                total={10}
                                initialPage={1}
                            />
                        </div>
                    </div>
                </div>
                {/* end of table */}
            </section>
            {/* end of table section */}
        </div>
    )
}
