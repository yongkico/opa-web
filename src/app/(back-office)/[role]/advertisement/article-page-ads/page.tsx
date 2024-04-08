'use client'

import { JSX, useState } from 'react'
import AssetArticleHero from '@/assets/webp/asset-article-hero.webp'
import { EyeIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import Modal from '@/components/partials/backoffice/Modal'

export default function ArtikelAds(): JSX.Element {
    // states
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false)

    return (
        <div className='container min-h-screen p-4 md:p-8'>
            <div className='mb-8'>
                {/* new article */}
                <button className='btn-primary'>+ Tambah Iklan</button>
            </div>

            <div>
                <header>
                    <h1 className='mb-8'>Daftar Iklan</h1>
                </header>

                <div className='grid md:grid-cols-2'>
                    <div className='group relative'>
                        <img
                            src={AssetArticleHero.src}
                            alt='aset iklan'
                            className='object-cover duration-300 group-hover:brightness-50'
                        />

                        <div className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 space-x-4 group-hover:block'>
                            <button
                                onClick={() => setIsEditOpen(true)}
                                className='rounded-full bg-white/50 p-2.5 text-white'
                            >
                                <PencilIcon className='h-6 w-6' />
                            </button>

                            <button
                                onClick={() => setIsViewOpen(true)}
                                className='rounded-full bg-white/50 p-2.5 text-white'
                            >
                                <EyeIcon className='h-6 w-6' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* modal for edit ads */}
                <Modal
                    isOpen={isEditOpen}
                    setIsOpen={setIsEditOpen}
                    size='medium'
                    header={<p>Edit Iklan</p>}
                    footer={
                        <div className='flex justify-center gap-x-4'>
                            <button className='btn-outline'>Batal</button>

                            <button className='btn-primary'>Simpan</button>
                        </div>
                    }
                >
                    <div className='flex flex-col gap-4 p-4 md:flex-row'>
                        <img src={AssetArticleHero.src} alt='aset iklan' className='rounded object-cover md:w-2/3' />

                        <div className='flex flex-col items-start justify-between gap-4 md:w-1/3'>
                            <button className='btn-secondary'>Hapus</button>
                        </div>
                    </div>
                </Modal>
                {/* end of modal for edit ads */}

                {/* modal for view ads */}
                <Modal isOpen={isViewOpen} setIsOpen={setIsViewOpen} size='medium' header={<p>Mini Dashboard</p>}>
                    <div className='grid gap-8 p-4 md:grid-cols-2'>
                        <img src={AssetArticleHero.src} alt='aset iklan' className='rounded object-cover' />

                        <div className='flex flex-col items-start gap-8'>
                            <div className='flex gap-x-20'>
                                <div>
                                    <p>Impresi</p>

                                    <p className='text-xl font-bold'>1000</p>
                                </div>

                                <div>
                                    <p>CTR</p>

                                    <p className='text-xl font-bold'>5%</p>
                                </div>
                            </div>

                            <div>
                                <p>Jumlah Klik</p>

                                <p className='text-xl font-bold'>50</p>
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* end of modal for view ads */}
            </div>
        </div>
    )
}
