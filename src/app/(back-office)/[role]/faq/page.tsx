'use client'

import { JSX } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'

type Faq = {
    title: string
    content: string
}

const faq: Faq[] = [
    {
        title: 'Apa manfaat kelapa sawit?',
        content:
            'Kelapa sawit memiliki peran strategis dalam pembangunan ekonomi Indonesia, menjadi penghasil devisa negara melalui ekspor perkebunan, dan kontribusi sub sektor perkebunan terhadap perekonomian nasional diharapkan semakin meningkat. Selain itu, industri kelapa sawit di Indonesia dibangun dengan pendekatan yang memprioritaskan keseimbangan antara aspek sosial, ekonomi, dan lingkungan, sejalan dengan komitmen pemerintah dalam melaksanakan pembangunan berkelanjutan',
    },
    {
        title: 'Apa peran kelapa sawit dalam makanan?',
        content:
            'Kelapa sawit memiliki peran penting dalam industri makanan dan minuman sebagai bahan baku untuk produk-produk seperti margarin, minyak goreng, roti, kue, cokelat, dan berbagai produk olahan lainnya. Selain itu, kelapa sawit juga memberikan manfaat kesehatan seperti menangkal efek radikal bebas, meningkatkan energi, dan menjaga kesehatan otak. Namun, penggunaan dan konsumsi kelapa sawit perlu diperhatikan, mengingat adanya risiko terkait seperti peningkatan kadar kolesterol jahat dalam darah dan risiko terkena penyakit jantung.',
    },
    {
        title: 'Bagaimana kelapa sawit mempengaruhi lingkungan?',
        content: '',
    },
]

export default function Faq(): JSX.Element {
    return (
        <main className='container min-h-screen space-y-8 p-4 px-0 lg:py-8'>
            <div className='apply-dark rounded-lg bg-white p-4 lg:p-8'>
                <header className='mb-4 p-4'>
                    <h1 className='md:text-2xl'>Frequently Asked Questions</h1>
                </header>
                <Accordion>
                    {faq.map((item: Faq, index: number) => (
                        <AccordionItem
                            key={`accordion-${index}`}
                            title={item.title}
                            startContent={
                                <div className='rounded-lg bg-primary p-4 text-xl text-white shadow-md'>
                                    <p>{`0${index + 1}`}</p>
                                </div>
                            }
                        >
                            {item.content}
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className='space-y-4'>
                <p className='font-bold'>Tidak menemukan solusi yang sesuai ? Silakan ajukan pertanyaanmu </p>

                <button className='btn-primary'>Ajukan Pertanyaan</button>
            </div>
        </main>
    )
}
