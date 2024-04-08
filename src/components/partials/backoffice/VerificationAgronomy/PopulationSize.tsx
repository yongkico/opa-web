import { JSX, useState } from 'react'
import Image from 'next/image'
import { AssetsDashboard, AssetsVerificationAgronomy } from '@/assets'
import { ExclamationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { cn } from '@/utils'

export default function PopulationSize(): JSX.Element {
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [verifyData, setVerifyData] = useState<boolean>(false)

    return (
        <>
            <header>
                <h1>Jumlah Populasi</h1>
            </header>

            {/* information section */}
            <section className='apply-dark mt-8 space-y-8 rounded-lg'>
                <div className='space-y-8'>
                    <button onClick={() => setVerifyData(false)} className='btn-secondary ml-auto block'>
                        Verifikasi
                    </button>

                    {/* information section */}
                    <div className='rounded-lg bg-primary/20 p-2 text-primary '>
                        <div className='flex items-center gap-x-2 border-b border-primary/50 p-2'>
                            <ExclamationCircleIcon className='h-5 w-5' />

                            <span className='font-bold'>Informasi</span>
                        </div>

                        <ul className='list-disc p-2 pl-8 font-semibold'>
                            <li>
                                Sebaiknya pengamatan/verifikasi dilakukan pada Awal Januari untuk Semester I dan Awal
                                Juli untuk Semester II.
                            </li>
                        </ul>
                    </div>
                    {/* end of information section */}
                </div>
                {verifyData ? (
                    <div></div>
                ) : (
                    <div className='apply-dark space-y-8 rounded-lg border p-4 lg:space-y-16 lg:p-8'>
                        {/* filter */}
                        <div className='space-y-4'>
                            <div className='grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:gap-8'>
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

                                <div className='flex w-full flex-col gap-y-1'>
                                    <label htmlFor=''>Jumlah Pohon</label>

                                    <input className='input-primary' type='text' placeholder='Jumlah Pohon' />
                                </div>

                                <div className='ml-auto flex gap-x-2 md:col-span-2'>
                                    <input id='checkbox-jumlah-pohon' name='checkbox-jumlah-pohon' type='checkbox' />

                                    <label className='text-sm' htmlFor='checkbox-jumlah-pohon'>
                                        Ceklist ini untuk mengisi dengan jumlah pohon terbaru
                                    </label>
                                </div>
                            </div>

                            <div className='apply-dark mt-8 space-y-8 rounded-lg'>
                                <button
                                    onClick={() => {
                                        setVerifyData(true)
                                        setIsVerified(true)
                                    }}
                                    className='btn-secondary mx-auto block'
                                >
                                    Verifikasi
                                </button>
                            </div>
                        </div>
                        {/* end of filter */}
                    </div>
                )}
            </section>
            {/* end of information section */}

            {/* filtered result section  */}
            <section className='apply-dark mt-8 flex flex-col overflow-hidden rounded-lg border p-4 text-light lg:p-8'>
                <div className='flex flex-col items-end gap-4 pb-8 md:flex-row'>
                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor=''>Kebun</label>

                        <select className='input-primary w-full' name='' id=''>
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

                <div className='flex flex-col gap-4 overflow-hidden rounded-lg bg-accent lg:flex-row'>
                    <div className='relative flex flex-col justify-center space-y-6 bg-primary p-4 lg:w-1/3 lg:p-8'>
                        <div>
                            <p className='text-sm font-bold'>Kebun</p>

                            <p className='text-xl font-bold'>Kebun Sawit A</p>
                        </div>

                        <div>
                            <p className='text-sm font-bold'>Semester</p>

                            <p className='text-xl font-bold'>Semester I</p>
                        </div>

                        <div>
                            <p className='text-sm font-bold'>Tahun</p>

                            <p className='text-xl font-bold'>2023</p>
                        </div>
                    </div>

                    <div className='space-y-4 p-4 lg:w-2/3 lg:py-8'>
                        {isVerified ? (
                            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                                <div className='space-y-2.5 rounded-md bg-primary px-4 py-2.5'>
                                    <p>Jumlah Pohon</p>

                                    <p className='text-2xl font-bold'>200</p>

                                    <p className='text-xs'>Pohon</p>
                                </div>

                                <div className='space-y-2.5 rounded-md bg-primary px-4 py-2.5'>
                                    <p>Populasi per Hektar</p>

                                    <p className='text-2xl font-bold'>200</p>

                                    <p className='text-xs'>Pohon per Ha</p>
                                </div>

                                <div className='space-y-2.5 rounded-md bg-yellow-400 px-4 py-2.5 text-dark'>
                                    <p>Kriteria</p>

                                    <p className='text-lg font-bold'>Dibawah Standar</p>

                                    <p className='text-xs'>Intensitas Ringan</p>
                                </div>
                            </div>
                        ) : (
                            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                                <div className='aspect-[4/3] rounded-md bg-primary px-4 py-2.5'>
                                    <p>Jumlah Pohon</p>

                                    <div className='flex h-full items-center justify-center'>
                                        <p className='text-center font-bold '>Belum Verifikasi</p>
                                    </div>
                                </div>

                                <div className='aspect-[4/3] rounded-md bg-primary px-4 py-2.5'>
                                    <p>Populasi per Hektar</p>

                                    <div className='flex h-full items-center justify-center'>
                                        <p className='text-center font-bold '>Belum Verifikasi</p>
                                    </div>
                                </div>

                                <div className='aspect-[4/3] rounded-md bg-primary px-4 py-2.5'>
                                    <p>Kriteria</p>

                                    <div className='flex h-full items-center justify-center'>
                                        <p className='text-center font-bold '>Belum Verifikasi</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isVerified ? (
                            <div className='relative w-full space-y-2'>
                                <p>Diverifikasi pada</p>

                                <div className='flex flex-col gap-4 lg:flex-row lg:items-end'>
                                    <p className='w-max whitespace-nowrap rounded-full bg-primary px-4 py-1'>
                                        📅10 November 2023
                                    </p>

                                    <p className='w-max rounded-full bg-primary px-4 py-1'>⏰10:20</p>

                                    <img
                                        className='absolute -bottom-12 -right-6 hidden lg:block'
                                        src={AssetsDashboard.asset_productivity.src}
                                        alt='Asset Pelepah'
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className='relative w-full space-y-2'>
                                <p>Diverifikasi pada</p>

                                <div className='flex flex-col gap-4 lg:flex-row lg:items-end'>
                                    <p className='w-max whitespace-nowrap rounded-full bg-primary px-4 py-1'>📅-</p>

                                    <p className='w-max rounded-full bg-primary px-4 py-1'>⏰-</p>

                                    <img
                                        className='absolute -bottom-12 -right-6 hidden lg:block'
                                        src={AssetsDashboard.asset_productivity.src}
                                        alt='Asset Pelepah'
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/* end of filtered result section  */}

            <section className=''>
                {isVerified ? (
                    <div className='apply-dark relative mt-8 flex max-w-lg rounded border lg:mt-32'>
                        <div className='relative overflow-hidden lg:w-64'>
                            {/* blob */}
                            <div className='absolute -left-12 -top-12 rounded-full bg-neutral-200 p-20'></div>
                        </div>

                        <Image
                            className='absolute -top-16 hidden w-20 lg:block'
                            src={AssetsVerificationAgronomy.asset_verification_agronomy_good}
                            alt='Asset Message Agronomy'
                        />

                        <div className='space-y-4 p-4'>
                            <p className='text-xl font-bold'>PESAN</p>

                            <p>
                                Jumlah populasi anda saat ini sesuai standar dan masih dalam kriteria Normal, yaitu
                                sekitar 133,87 pohon / ha.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='apply-dark relative mt-8 flex max-w-lg rounded border lg:mt-32'>
                        <div className='relative overflow-hidden lg:w-64'>
                            {/* blob */}
                            <div className='absolute -left-12 -top-12 rounded-full bg-neutral-200 p-20'></div>
                        </div>

                        <Image
                            className='absolute -top-16 hidden w-20 lg:block'
                            src={AssetsVerificationAgronomy.asset_verification_agronomy_bad}
                            alt='Asset Message Agronomy'
                        />

                        <div className='space-y-4 p-4'>
                            <p className='text-xl font-bold'>PESAN</p>

                            <p>
                                Sayangnya kamu belum melakukan verifikasi untuk Semester I tahun 2024, silahkan lakukan
                                verifikasi.
                            </p>
                        </div>
                    </div>
                )}
            </section>

            {isVerified && (
                <div>
                    {/* table section */}
                    <section className='mt-8 space-y-8 p-4 lg:mt-12 lg:space-y-16'>
                        {/* filter */}
                        <div className='space-y-4'>
                            <p className='text-lg font-bold'>Seluruh Data Jumlah Populasi</p>

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

                                    <TableColumn allowsSorting>Jumlah Populasi</TableColumn>

                                    <TableColumn allowsSorting>Pesan</TableColumn>

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

                                                    <span>133</span>

                                                    <small className='text-gray-500'>pohon / ha</small>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <p>
                                                    Jumlah populasi anda saat ini sesuai standar dan masih dalam
                                                    kriteria Normal
                                                </p>
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
            )}
        </>
    )
}
