import { AssetsDashboard } from '@/assets'
import Image from 'next/image'
import { JSX } from 'react'

export default function Result(): JSX.Element {
    return (
        <div>
            <header className='mb-4'>
                <h2>Rekomendasi Pemupukan</h2>
            </header>

            {/* filter section */}
            <section className='apply-dark mb-8 space-y-4 rounded-lg border p-4 lg:p-8'>
                <div className='flex flex-col items-start justify-between gap-4 lg:flex-row'>
                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor='farm'>Nama Kebun</label>

                        <select className='input-primary' name='farm' id='farm'>
                            <option value=''>Kebun A</option>

                            <option value=''>Kebun B</option>
                        </select>
                    </div>

                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor='year'>Tahun Aplikasi</label>

                        <select className='input-primary' name='year' id='year'>
                            <option value=''>2022</option>

                            <option value=''>2023</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col items-end gap-4 md:flex-row'>
                    <div className='flex w-full flex-col gap-y-1'>
                        <label htmlFor='year'>Jenis Pupuk</label>

                        <select className='input-primary' name='year' id='year'>
                            <option value=''>Pupuk tunggal</option>
                        </select>
                    </div>

                    <button className='btn-icon'>
                        <span>Proses</span>
                    </button>
                </div>
            </section>
            {/* end of filter section */}

            {/* result section */}
            <section className='apply-dark mb-8 space-y-4 rounded-lg border p-4 lg:p-8'>
                <div className='grid grid-cols-1 gap-4 text-white md:grid-cols-2 lg:gap-8'>
                    <div className='relative space-y-4 overflow-hidden rounded-lg bg-[#5A9CFF] p-4'>
                        <div className='border-b pb-2'>
                            {/* blob */}
                            <div className='absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#488bf0]'></div>

                            <p className='relative text-lg font-semibold'>Total Kebutuhan Pupuk</p>

                            <p className='text-sm'>Per 6 bulan/1ha</p>
                        </div>

                        <div className='flex justify-between gap-x-2 lg:py-2'>
                            {[1, 2, 3].map((_item: number, index: number) => (
                                <div key={`item-${index}`}>
                                    <p className='text-xl'>
                                        3 <span className='text-sm'>karung</span>
                                    </p>

                                    <p className='text-2xl font-bold'>Urea</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='relative flex flex-col justify-between space-y-3.5 overflow-hidden rounded-lg bg-primary p-4'>
                        {/* image */}
                        <Image
                            className='absolute right-0 top-0 z-10'
                            src={AssetsDashboard.asset_cash}
                            alt='Asset Cash'
                        />

                        {/* blob */}
                        <div className='absolute -right-10 -top-12 h-32 w-32 rounded-full bg-accent'></div>

                        <p className='relative z-10 text-lg font-semibold'>Biaya pupuk tunggal</p>

                        <p className='text-3xl font-bold md:text-3xl'>Rp1.850.000</p>

                        <p className=''>per 6 bulan/1 ha</p>
                    </div>
                </div>

                {/* table */}
                <div className='overflow-x-auto'>
                    {/* table */}
                    <table className='apply-dark mt-8 min-w-full border'>
                        <thead className='bg-primary text-white'>
                            <tr>
                                <th>Cara Aplikasi</th>

                                <th>Waktu Aplikasi</th>

                                <th>Frekuensi Aplikasi</th>

                                <th>Penempatan Pupuk</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className=''>
                                <td>Sebar diatas pelepah dengan bentuk I dan U</td>

                                <td className='apply-dark space-y-4 border-x'>
                                    <div>
                                        <p>Semester I:</p>

                                        <p>Maret/April/Juni</p>
                                    </div>

                                    <div>
                                        <p>Semester I:</p>

                                        <p>Maret/April/Juni</p>
                                    </div>
                                </td>

                                <td>1x dalam 6 bulan</td>

                                <td className='apply-dark border-l'>
                                    <div>
                                        <p>Urea di piringan</p>

                                        <p>Lainnya diatas rumpukan pelepah</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* end of table */}
            </section>
            {/* end of result section */}

            {/* kebutuhan pupuk section */}
            <section className='apply-dark mb-8 space-y-8 border-t p-4 lg:p-8'>
                <header>
                    <h3>Detail Kebutuhan Pupuk</h3>
                </header>

                {/* table dosis pupuk */}
                <div className='overflow-x-auto'>
                    <table className='min-w-full text-left'>
                        <thead className='thead-primary'>
                            <tr>
                                <th rowSpan={2}>Dosis Pupuk</th>

                                <th className='pb-0 text-center' colSpan={4}>
                                    Jenis Pupuk Tunggal
                                </th>

                                <th rowSpan={2}>Dibuat Pada</th>
                            </tr>

                            <tr>
                                <th>Urea</th>

                                <th>TSP</th>

                                <th>MOP</th>

                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='whitespace-nowrap'>Dosis per pokok (kg / pokok / 6 bulan)</td>

                                <td>1.5 kg</td>

                                <td>5.5 kg</td>

                                <td>3.5 kg</td>

                                <td>2.5 kg</td>

                                <td rowSpan={3}>24 November 2023</td>
                            </tr>

                            <tr className='bg-primary/10'>
                                <td className='whitespace-nowrap'>Dosis per pokok (kg / pokok / 6 bulan)</td>

                                <td>1.5 kg</td>

                                <td>5.5 kg</td>

                                <td>3.5 kg</td>

                                <td>2.5 kg</td>
                            </tr>

                            <tr>
                                <td className='whitespace-nowrap'>Dosis per pokok (kg / pokok / 6 bulan)</td>

                                <td>1.5 kg</td>

                                <td>5.5 kg</td>

                                <td>3.5 kg</td>

                                <td>2.5 kg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* end of table dosis pupuk */}

                {/* table kebutuhan karung */}
                <div className='overflow-x-auto'>
                    <table className='min-w-full text-left'>
                        <thead className='thead-primary'>
                            <tr>
                                <th rowSpan={2}>Dosis Pupuk</th>

                                <th className='pb-0 text-center' colSpan={4}>
                                    Jenis Pupuk Tunggal
                                </th>

                                <th rowSpan={2}>Dibuat Pada</th>
                            </tr>

                            <tr>
                                <th>Urea</th>

                                <th>TSP</th>

                                <th>MOP</th>

                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='whitespace-nowrap'>Dosis per pokok (kg / pokok / 6 bulan)</td>

                                <td>1.5 kg</td>

                                <td>5.5 kg</td>

                                <td>3.5 kg</td>

                                <td>2.5 kg</td>

                                <td rowSpan={3}>24 November 2023</td>
                            </tr>

                            <tr className='bg-primary/10'>
                                <td className='whitespace-nowrap'>Dosis per pokok (kg / pokok / 6 bulan)</td>

                                <td>1.5 kg</td>

                                <td>5.5 kg</td>

                                <td>3.5 kg</td>

                                <td>2.5 kg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* end of table kebutuhan karung */}

                {/* table biaya pemupukan */}
                <div className='overflow-x-auto'>
                    <table className='min-w-full text-left'>
                        <thead className='thead-primary'>
                            <tr>
                                <th colSpan={2}>Total Biaya Pemupukan (Rp)</th>

                                <th className='w-52'>Dibuat Pada</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1 Hektar</td>

                                <td>Rp. 1,880,500</td>

                                <td rowSpan={2}>24 November 2023</td>
                            </tr>

                            <tr className='bg-primary/10'>
                                <td>Total Area</td>

                                <td>Rp. 15,880,500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* end of table biaya pemupukan */}
            </section>
            {/* end of kebutuhan pupuk section */}
        </div>
    )
}
