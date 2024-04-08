import { JSX } from 'react'
import { AssetFaq } from '@/assets/index'
import Image from 'next/image'
import { Tnc } from '@/@types'
import { createTranslation } from '@/i18n/server'

const tncs: Tnc[] = [
    {
        id: 1,
        title: 'Definisi Istilah',
        description: [
            {
                id: 1,
                name: 'Aplikasi: Merujuk pada perangkat lunak yang dikembangkan untuk membantu pengelolaan perkebunan kelapa sawit.',
            },
            { id: 2, name: 'Pengguna:  Merujuk pada individu atau entitas yang menggunakan aplikasi. ' },
        ],
    },
    {
        id: 2,
        title: 'Akun Pengguna',
        description: [
            {
                id: 1,
                name: 'Pengguna diharuskan membuat akun untuk mengakses aplikasi. ',
            },
            {
                id: 2,
                name: 'Setiap akun adalah tanggung jawab tunggal pengguna dan tidak boleh dibagikan dengan pihak lain. ',
            },
        ],
    },
    {
        id: 3,
        title: 'Keamanan dan Privasi',
        description: [
            {
                id: 1,
                name: 'Informasi yang disimpan oleh aplikasi dijamin keamanannya.',
            },
            {
                id: 2,
                name: 'Pengguna diharapkan untuk menjaga kerahasiaan informasi login dan tidak mengungkapkannya kepada pihak lain. ',
            },
        ],
    },
    {
        id: 4,
        title: 'Penggunaan Aplikasi',
        description: [
            {
                id: 1,
                name: 'Aplikasi hanya boleh digunakan untuk keperluan yang sah terkait pengelolaan perkebunan kelapa sawit',
            },
            {
                id: 2,
                name: 'Pengguna tidak diperkenankan menggunakan aplikasi untuk tujuan ilegal atau merugikan.',
            },
        ],
    },
    {
        id: 5,
        title: 'Pemeliharaan dan Pembaruan',
        description: [
            {
                id: 1,
                name: 'Pihak pengembang akan melakukan pemeliharaan dan pembaruan secara berkala untuk meningkatkan kinerja dan fungsionalitas aplikasi.',
            },
        ],
    },
    {
        id: 6,
        title: 'Pembatasan Tanggung Jawab: ',
        description: [
            {
                id: 1,
                name: 'Penggunaan aplikasi adalah risiko pengguna sendiri.                 ',
            },
            {
                id: 2,
                name: 'Pihak pengembang tidak bertanggung jawab atas kerugian atau kerusakan yang disebabkan oleh penggunaan aplikasi.                 ',
            },
        ],
    },
    {
        id: 7,
        title: 'Hak Cipta: ',
        description: [
            {
                id: 1,
                name: 'Seluruh hak cipta atas aplikasi, termasuk namun tidak terbatas pada kode sumber, desain, dan dokumentasi, tetap menjadi milik penuh pihak pengembang.                 ',
            },
        ],
    },
    {
        id: 8,
        title: 'Pengakhiran Akses:',
        description: [
            {
                id: 1,
                name: 'Pihak pengembang berhak untuk mengakhiri akses pengguna ke aplikasi jika ditemukan pelanggaran terhadap syarat dan ketentuan ini.                 ',
            },
        ],
    },
    {
        id: 9,
        title: 'Pembatalan dan Pengembalian Dana:  ',
        description: [
            {
                id: 1,
                name: 'Pembatalan dan pengembalian dana hanya akan dipertimbangkan berdasarkan kebijakan yang telah ditetapkan oleh pihak pengembang                ',
            },
        ],
    },
    {
        id: 10,
        title: 'Perubahan Syarat dan Ketentuan:  ',
        description: [
            {
                id: 1,
                name: 'Pihak pengembang berhak untuk mengubah syarat dan ketentuan ini dengan pemberitahuan kepada pengguna.   ',
            },
        ],
    },
    {
        id: 11,
        title: 'Hukum yang Berlaku:  ',
        description: [
            {
                id: 1,
                name: 'Syarat dan ketentuan ini diatur oleh hukum yang berlaku di wilayah tempat pihak pengembang beroperasi. ',
            },
        ],
    },
]

export default async function TermsAndCondition(): Promise<JSX.Element> {
    // translation
    const { t } = await createTranslation('tnc')

    return (
        <main>
            <header className='relative overflow-hidden pt-20'>
                <div className="bg-[url('/webp/asset-faq-cover.webp')] bg-cover pt-10">
                    <div className='container'>
                        <div className='flex flex-col items-center justify-between gap-y-4 text-center text-white md:flex-row md:text-left'>
                            <div className='flex flex-col gap-y-4'>
                                <h1 className='text-4xl lg:text-6xl'>{t('syaratKetentuanOpa')}</h1>
                                <span className='lg:text-2xl'>{t('berlakuMulai')}</span>
                            </div>
                            <Image
                                src={AssetFaq.man_mobile}
                                alt='Asset Faq'
                                className='h-40 w-44 object-cover md:h-64 md:w-80 lg:h-80 lg:w-96'
                            />
                        </div>
                    </div>
                </div>
            </header>

            <section className='py-4 lg:py-8'>
                <div className='container'>
                    <div className='flex flex-col gap-y-4 text-sm text-grey md:gap-y-6 md:text-base lg:gap-y-8 lg:text-lg'>
                        <span>{t('paragraf1')}</span>
                        <span>{t('paragraf2')}</span>

                        <span>{t('paragraf3')}</span>
                    </div>
                </div>
            </section>

            <section className='py-4 lg:py-8'>
                <div className='container'>
                    <div className='flex flex-col gap-y-4 text-sm text-grey md:gap-y-6 md:text-base lg:gap-y-8 lg:text-lg'>
                        {tncs.map((tnc: Tnc, index: number) => (
                            <div key={tnc.id}>
                                <span className='font-semibold text-tertiary'>
                                    {index + 1}. {tnc.title}
                                </span>
                                <ul className='mt-1 space-y-2  '>
                                    {tnc.description.map((desc) => (
                                        <ul key={desc.id}>• {desc.name}</ul>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
