import { TrashIcon } from '@heroicons/react/24/outline'
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { JSX } from 'react'

export default function ImageUploader(): JSX.Element {
    // for adding gallery

    // for removing gallery

    return (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6'>
            <div key={`gallery-`} className='relative'>
                <img className='aspect-video w-full rounded object-cover' alt='gallery' />

                <button type='button' className='btn-primary absolute left-2 top-2 w-max p-1.5'>
                    <TrashIcon className='h-4 w-4 md:h-5 md:w-5' />
                </button>
            </div>

            <>
                <label
                    className='flex aspect-video cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed'
                    htmlFor='gallery'
                >
                    <CloudArrowUpIcon className='h-12 w-12' />

                    <span>Browse Image</span>
                </label>

                <input className='hidden' id='gallery' name='gallery' type='file' />
            </>
        </div>
    )
}
