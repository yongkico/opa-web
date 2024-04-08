'use client'

import { JSX, useState } from 'react'
import Modal from '@/components/partials/backoffice/Modal'
import PredictionTable from '@/components/partials/backoffice/Tables/PredictionTable'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/solid'
import DatePicker from '@/components/ui/DatePicker'
import ComingSoon from '@/components/partials/backoffice/VerificationAgronomy/ComingSoon'

export default function Prediction(): JSX.Element {
    // states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    return (
        <div className='container px-0 py-4 lg:py-8'>
            <ComingSoon />
        </div>
    )

    return (
        <>
            <div className='container min-h-screen p-4 lg:p-8'>
                {/* filter section */}
                <section className='apply-dark mt-8 space-y-8 rounded-lg border p-4 lg:p-8'>
                    <div className='flex flex-col items-end justify-between gap-4 lg:flex-row'>
                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor='farm'>Kebun</label>

                            <select className='input-primary' name='farm' id='farm'>
                                <option value=''>Kebun A</option>

                                <option value=''>Kebun B</option>
                            </select>
                        </div>

                        <div className='flex w-full flex-col gap-y-1'>
                            <label htmlFor='year'>Tahun</label>

                            <select className='input-primary' name='year' id='year'>
                                <option value=''>2022</option>

                                <option value=''>2023</option>
                            </select>
                        </div>
                    </div>

                    <button className='btn-primary mx-auto block'>Cari Informasi</button>
                </section>
                {/* end of filter section */}

                {/* calculate prediction section */}
                <section className='apply-dark mt-8 space-y-8'>
                    <div className='flex flex-col gap-4 lg:flex-row'>
                        <div className='rounded-lg bg-primary/20 p-2 text-primary lg:w-2/5'>
                            <div className='flex items-center gap-x-2 border-b border-primary/50 p-2'>
                                <ExclamationCircleIcon className='h-5 w-5' />

                                <span className='font-bold'>Informasi</span>
                            </div>

                            <p className='p-2 font-semibold'>
                                Prediksi produksi dapat dilakukan dengan syarat memasukkan data trossen telling minimal
                                90 pohon.
                            </p>
                        </div>

                        <div className='apply-dark grid place-items-center rounded-lg border p-4 md:grid-cols-2 lg:w-3/5'>
                            <div className='apply-dark flex w-full flex-col items-center justify-center gap-4 border-b p-4 md:border-b-0 md:border-r'>
                                <p className='text-xl font-bold md:text-2xl'>Prediksi Produksi</p>

                                <button className='btn-secondary'>Hitung</button>
                            </div>

                            <div className='flex w-full flex-col items-center justify-center gap-4 p-4'>
                                <p className='text-xl font-bold md:text-2xl'>Total Produksi</p>

                                <p className='text-4xl font-bold'>158.902 KG</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end of calculate prediction section */}

                {/* table section */}
                <section className='apply-dark mt-8 space-y-8 rounded-lg border p-4 lg:p-8'>
                    <div className='flex flex-col justify-between gap-y-4'>
                        <p className='text-xl font-bold lg:text-2xl'>Trossen Telling</p>

                        <div className='flex items-center justify-between gap-4'>
                            <input className='input-primary' type='text' placeholder='Pencarian' />

                            <button onClick={() => setIsAddModalOpen(true)} className='btn-secondary p-2'>
                                <PlusIcon className='h-5 w-5' />
                            </button>
                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        <PredictionTable setIsEditModalOpen={setIsEditModalOpen} />
                    </div>

                    {/* pagination */}
                    <div>
                        <nav
                            className='apply-dark flex items-center justify-between border-t px-4 py-3 sm:px-6'
                            aria-label='Pagination'
                        >
                            <div className='hidden sm:block'>
                                <p className='text-sm'>
                                    Showing <span className='font-medium'>1</span> to{' '}
                                    <span className='font-medium'>10</span> of <span className='font-medium'>97</span>{' '}
                                    results
                                </p>
                            </div>

                            <div className='flex flex-1 justify-between gap-x-4 sm:justify-end'>
                                <button className='btn-outline px-4 text-sm' onClick={() => {}} disabled={true}>
                                    Previous
                                </button>

                                <button className='btn-outline px-4 text-sm' onClick={() => {}}>
                                    Next
                                </button>
                            </div>
                        </nav>
                    </div>
                </section>
                {/* end of table section */}

                {/* modal for add trossen telling */}
                <Modal
                    isOpen={isAddModalOpen}
                    setIsOpen={setIsAddModalOpen}
                    header={<p>Tambah Trossen Telling</p>}
                    footer={
                        <div className='flex justify-center gap-x-4'>
                            <button onClick={() => setIsAddModalOpen(false)} className='btn-secondary'>
                                Batal
                            </button>

                            <button className='btn-primary'>Tambah</button>
                        </div>
                    }
                >
                    <div className='space-y-4 p-4'>
                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Label Pohon
                            </label>

                            <input className='input-primary w-full' type='text' placeholder='Masukkan label pohon' />
                        </div>

                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Bunga
                            </label>

                            <input className='input-primary w-full' type='text' placeholder='Masukkan jumlah bunga' />
                        </div>

                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Buah
                            </label>

                            <input className='input-primary w-full' type='text' placeholder='Masukkan jumlah buah' />
                        </div>

                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Jumlah Pelepah
                            </label>

                            <input className='input-primary w-full' type='text' placeholder='Masukkan jumlah pelepah' />
                        </div>

                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Tanggal
                            </label>

                            <DatePicker />
                        </div>
                    </div>
                </Modal>
                {/* end of modal for add trossen telling */}

                {/* modal for edit trossen telling */}
                <Modal
                    isOpen={isEditModalOpen}
                    setIsOpen={setIsEditModalOpen}
                    header={<p>Edit Trossen Telling</p>}
                    footer={
                        <div className='flex justify-center gap-x-4'>
                            <button onClick={() => setIsEditModalOpen(false)} className='btn-secondary'>
                                Batal
                            </button>

                            <button className='btn-primary'>Edit</button>
                        </div>
                    }
                >
                    <div className='space-y-4 p-4'>
                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Label Pohon
                            </label>

                            <input className='input-primary w-full' type='text' placeholder='Masukkan label pohon' />
                        </div>

                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Bunga
                            </label>

                            <input className='input-primary w-full' type='text' placeholder='Masukkan jumlah bunga' />
                        </div>

                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Buah
                            </label>

                            <input className='input-primary w-full' type='text' placeholder='Masukkan jumlah buah' />
                        </div>

                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Jumlah Pelepah
                            </label>

                            <input className='input-primary w-full' type='text' placeholder='Masukkan jumlah pelepah' />
                        </div>

                        <div className='flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-x-8'>
                            <label className='w-64 whitespace-nowrap' htmlFor='pohon'>
                                Tanggal
                            </label>

                            <DatePicker />
                        </div>
                    </div>
                </Modal>
                {/* end of modal for edit trossen telling */}
            </div>{' '}
        </>
    )
}
