import { JSX, useState } from 'react'
import Image from 'next/image'
import { AssetsDashboard, AssetsVerificationAgronomy } from '@/assets'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { cn } from '@/utils'

export default function PlantIllegitim(): JSX.Element {
    // states
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [showData, setShowData] = useState<boolean>(false)

    return (
        <>
            <header>
                <h1>Bahan Tanaman</h1>
            </header>

            {/* information section */}
            <section className='apply-dark mt-8 space-y-8 rounded-lg'>
                <div className='space-y-8'>
                    <button onClick={() => setIsVerified(true)} className='btn-secondary ml-auto block'>
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
                                Verifikasi bahan tanaman hanya dilakukan satu kali untuk memastikan bahan tanam yang
                                digunakan legitim atau illegitim.
                            </li>

                            <li>
                                Metode yang digunakan adalah segregasi tanaman, informasi lebih lanjut tentang cara
                                melakukan segregasi dapat dilihat dalam artikel: Cara melakukan segregasi untuk
                                memastikan kualitas bahan tanam.
                            </li>

                            <li>
                                Perbedaan cangkang tebal (Dura), tidak ada cangkang (Pisifera), dan cangkang tipis
                                (Tenera) dapat dilihat pada artikel ini: Perbedaan Dura, Pisifera, dan cangkang Tenera.
                            </li>
                        </ul>
                    </div>
                    {/* end of information section */}
                </div>
                {!isVerified ? (
                    <></>
                ) : (
                    <div className='apply-dark space-y-8 rounded-lg border p-4 lg:space-y-16 lg:p-8'>
                        {/* verification */}
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
                                    <label htmlFor=''>Luas (Ha)</label>

                                    <input className='input-primary' type='text' placeholder='5' />
                                </div>
                            </div>

                            <div className='flex items-center gap-x-2 text-primary'>
                                <ExclamationCircleIcon className='h-5 w-5' />

                                <p>Jumlah Sampel yang harus diambil sebanyak 20 sampel</p>
                            </div>

                            <div className='grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:gap-8'>
                                <div className='flex w-full flex-col gap-y-1'>
                                    <label htmlFor=''>
                                        Jumlah Cangkang Tebal (Dura) & Tidak Ada Cangkang (Pisifera)
                                    </label>

                                    <input className='input-primary' type='text' placeholder='5' />
                                </div>

                                <div className='flex w-full flex-col gap-y-1'>
                                    <label htmlFor=''>Jumlah Cangkang Tipis (Tenera)</label>

                                    <input className='input-primary' type='text' placeholder='5' />
                                </div>
                            </div>

                            <div className='pt-4'>
                                <button
                                    onClick={() => {
                                        setIsVerified(true)
                                    }}
                                    className='btn-secondary mx-auto block'
                                >
                                    Verifikasi Ulang
                                </button>
                            </div>
                        </div>
                        {/* end of verification */}
                    </div>
                )}
            </section>
            {/* end of information section */}

            {/* information section */}
            <section className='apply-dark mt-8 space-y-8 rounded-lg border p-4 lg:p-8'>
                <div className='flex flex-col gap-4 overflow-hidden rounded-lg bg-accent text-light lg:flex-row'>
                    <div className='relative flex flex-col justify-center space-y-6 bg-primary p-4 lg:w-1/3 lg:p-8'>
                        <div>
                            <p className='text-sm font-bold'>Kebun</p>

                            <p className='text-xl font-bold'>Kebun Sawit A</p>

                            <p className='text-sm'>Aek Pancur, Kabupaten Deli Serdang, Sumatera Utara, Indonesia</p>
                        </div>
                    </div>

                    <div className='space-y-4 p-4 lg:w-2/3 lg:py-8'>
                        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                            <div className='space-y-2.5 rounded-md bg-primary px-4 py-2.5'>
                                <p>Jumlah Sampel</p>

                                <p className='text-2xl font-bold'>20</p>

                                <p className=''>Sampel</p>
                            </div>

                            <div className='space-y-2.5 rounded-md bg-primary px-4 py-2.5'>
                                <p>Jumlah Dura & Pisifera</p>

                                <p className='text-2xl font-bold'>7</p>

                                <p className=''>(50%)</p>
                            </div>

                            <div className='space-y-2.5 rounded-md bg-primary px-4 py-2.5'>
                                <p>Jumlah Tenera</p>

                                <p className='text-2xl font-bold'>12</p>

                                <p className=''>(50%)</p>
                            </div>

                            <div className='space-y-2.5 rounded-md bg-orange-600 px-4 py-2.5 text-dark'>
                                <p>Kriteria</p>

                                <p className='text-lg font-bold'>Bahan Tanam Elligitim</p>
                            </div>
                        </div>

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

                <div>
                    <button onClick={() => setShowData(true)} className='btn-primary mx-auto block'>
                        Lihat Semua Data
                    </button>
                </div>
            </section>
            {/* end of information section */}

            {/* message section */}
            <section className='apply-dark relative mt-8 flex max-w-lg rounded border lg:mt-32'>
                <div className='relative overflow-hidden lg:w-96'>
                    {/* blob */}
                    <div className='absolute -left-12 -top-12 rounded-full bg-neutral-200 p-20'></div>
                </div>

                <Image
                    className='absolute -top-16 hidden w-24 lg:block'
                    src={AssetsVerificationAgronomy.asset_verification_agronomy_good}
                    alt='Asset Message Agronomy'
                />

                <div className='space-y-4 p-4'>
                    <p className='text-xl font-bold'>PESAN</p>

                    <p>
                        Terdapat indikasi bahan tanam illegitim (palsu) di Kebun A. Bahan tanaman illegitim akan menjadi
                        faktor pembatas utama dalam mencapai produktivitas kelapa sawit.
                    </p>
                </div>
            </section>
            {/* end of message section */}

            {/* table section */}
            {showData && (
                <section className='mt-8 space-y-8 p-4 lg:mt-12 lg:space-y-16'>
                    {/* filter */}
                    <div className='space-y-4'>
                        <p className='text-lg font-bold'>Seluruh Data Bahan Tanaman</p>

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

                                <TableColumn allowsSorting>Jumlah Sampel</TableColumn>

                                <TableColumn allowsSorting>Jumlah Cangkang Tebal (Dura)</TableColumn>

                                <TableColumn allowsSorting>Jumlah Cangkang Tipis (Tenera)</TableColumn>

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

                                        <TableCell>100 sampel</TableCell>

                                        <TableCell>30 (30%) Dura</TableCell>

                                        <TableCell>70 (30%) Dura</TableCell>

                                        <TableCell>
                                            <div className='flex w-72 items-center gap-x-2'>
                                                <span
                                                    className={`${cn({
                                                        'bg-green-500 text-light': true,
                                                        'bg-red-600 text-light': false,
                                                    })} aspect-square h-4 w-4 whitespace-nowrap rounded-full text-center`}
                                                ></span>

                                                <span>
                                                    Terdapat indikasi bahan tanam illegitim (palsu) di Kebun A. Bahan
                                                    tanam illegitim akan menjadi faktor pembatas utama dalam mencapai
                                                    produktivitas kelapa sawit.
                                                </span>
                                            </div>
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
            )}
            {/* end of table section */}
        </>
    )
}
