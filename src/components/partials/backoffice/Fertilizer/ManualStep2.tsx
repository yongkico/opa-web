import Link from 'next/link'
import { JSX } from 'react'
export default function ManualStep2(): JSX.Element {
    return (
        <div>
            <header>
                <h2 className='mb-8'>Masukkan Informasi Pupuk di Sekitar Kebun Anda</h2>
            </header>

            <div className='apply-dark mb-8 rounded-md border p-8'>
                <div className='space-y-8'>
                    <header>
                        <h3 className='mb-4 w-max whitespace-nowrap text-lg'>Pupuk Tunggal (*wajib isi)</h3>
                    </header>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8'>
                        <div className='flex w-full flex-col gap-y-2'>
                            <label>Sumber Nitrogen (N)</label>

                            <select className='input-primary'>
                                <option selected>Pilih sumber Pupuk N anda</option>
                            </select>
                        </div>

                        <div className='flex w-full flex-col gap-y-2'>
                            <div>
                                <label>
                                    Harga Pupuk N (RP per satu karung){' '}
                                    <span className='text-primary'>1 karung = 50 kg</span>
                                </label>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                <label>Rp</label>

                                <input
                                    type='text'
                                    placeholder='Masukkan harga pupuk N'
                                    className='input-primary w-full'
                                />
                            </div>
                        </div>

                        <div className='flex w-full flex-col gap-y-2'>
                            <label>Sumber Fosfor (P)</label>

                            <select className='input-primary'>
                                <option selected>Pilih sumber Pupuk P anda</option>
                            </select>
                        </div>

                        <div className='flex w-full flex-col gap-y-2'>
                            <div>
                                <label>
                                    Harga pupuk P (Rp per satu karung){' '}
                                    <span className='text-primary'>1 karung = 50 kg</span>
                                </label>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                <label>Rp</label>

                                <input
                                    type='text'
                                    placeholder='Masukkan harga pupuk N'
                                    className='input-primary w-full'
                                />
                            </div>
                        </div>

                        <div className='flex w-full flex-col gap-y-2'>
                            <label>Sumber Kalium (K)</label>

                            <select className='input-primary'>
                                <option selected>Pilih sumber Pupuk K anda</option>
                            </select>
                        </div>

                        <div className='flex w-full flex-col gap-y-2'>
                            <div>
                                <label>
                                    Harga pupuk K (Rp per satu karung){' '}
                                    <span className='text-primary'>1 karung = 50 kg</span>
                                </label>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                <label>Rp</label>

                                <input
                                    type='text'
                                    placeholder='Masukkan harga pupuk N'
                                    className='input-primary w-full'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='apply-dark rounded-md border p-8'>
                <div className='mb-8 space-y-8'>
                    <header>
                        <h3 className='mb-4 w-max whitespace-nowrap text-lg'>Pupuk Majemuk</h3>
                    </header>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8'>
                        <div className='flex w-full flex-col gap-y-2'>
                            <div>
                                <label>
                                    Harga pupuk NPK Phonska <br /> (Rp per satu karung) 1 karung = 50 kg
                                    <span className='text-primary'>1 karung = 50 kg</span>
                                </label>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                <label>Rp</label>

                                <input
                                    type='text'
                                    placeholder='Masukkan harga pupuk N'
                                    className='input-primary w-full'
                                />
                            </div>
                        </div>

                        <div className='flex w-full flex-col gap-y-2'>
                            <div>
                                <label>
                                    Harga pupuk NPK (13-6-27-4+0.65) <br />
                                    (Rp per satu karung) 1 karung = 50 kg
                                    <span className='text-primary'>1 karung = 50 kg</span>
                                </label>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                <label>Rp</label>

                                <input
                                    type='text'
                                    placeholder='Masukkan harga pupuk N'
                                    className='input-primary w-full'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-8 space-y-8'>
                    <header>
                        <h3 className='w-max whitespace-nowrap text-lg'>Jenis Pupuk Majemuk Lain</h3>

                        <p className='text-sm'>Kandungan hara (oksida) cek disini untuk melihat contoh</p>
                    </header>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>N (%)</label>

                            <input className='input-primary' type='text' placeholder='Masukkan kandungan N' />
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>P2O5 (%)</label>

                            <input className='input-primary' type='text' placeholder='Masukkan kandungan N' />
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>K2O (%)</label>

                            <input className='input-primary' type='text' placeholder='Masukkan kandungan N' />
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>MgO (%)</label>

                            <input className='input-primary' type='text' placeholder='Masukkan kandungan N' />
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <label htmlFor=''>B2O3 (%)</label>

                            <input className='input-primary' type='text' placeholder='Masukkan kandungan N' />
                        </div>
                    </div>

                    <div className='flex w-full flex-col gap-y-2'>
                        <div>
                            <label>Harga pupuk majemuk (Rp per satu karung) </label>

                            <span className='text-primary'>1 karung = 50 kg</span>
                        </div>

                        <div className='flex items-center gap-x-2'>
                            <label>Rp</label>

                            <input type='text' placeholder='Masukkan harga pupuk N' className='input-primary w-full' />
                        </div>
                    </div>
                </div>
            </div>

            <section className='p-4 lg:p-8'>
                <Link href={'/member/fertilizer/manual?step=result'} className='btn-primary mx-auto block w-max'>
                    Hasil
                </Link>
            </section>
        </div>
    )
}
