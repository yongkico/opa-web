'use client'

import { DataResponse } from '@/@types'
import Logo from '@/components/partials/Logo'
import { failToast } from '@/configs/toastConfig'
import { activateAccount } from '@/modules/authModule'
import { Spinner } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { JSX, useState } from 'react'
import { toast } from 'sonner'
import { useEffectOnce } from 'usehooks-ts'

export default function ActivateAccount(): JSX.Element {
    // states
    const [isActivating, setIsActivating] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<DataResponse<string>>({} as DataResponse<string>)

    // search params
    const searchParams = useSearchParams()

    async function handleActivateToken() {
        setIsActivating(true)

        try {
            await activateAccount(searchParams.get('token') as string)
        } catch (error) {
            const err = error as DataResponse<string>
            setErrorMessage(err)

            toast.error('Failed to activate account', failToast)
        } finally {
            setIsActivating(false)
        }
    }

    useEffectOnce(() => {
        handleActivateToken()
    })

    return (
        <main className='flex h-screen flex-col items-center justify-center'>
            <div className='rounded-lg bg-primary px-4 py-8 shadow sm:p-8 md:p-16'>
                <header className='mb-16 flex flex-col items-center'>
                    <Logo className='w-36' dark />

                    <h1 className='text-light'>Oil Palm Asisstant</h1>
                </header>

                {isActivating ? (
                    <section className='flex flex-col items-center gap-4'>
                        <p>Sedang mengaktivasi akun...</p>

                        <Spinner color='current' />
                    </section>
                ) : (
                    <>
                        {errorMessage?.message ? (
                            <section>
                                <div className='flex flex-col items-center gap-2 rounded-lg bg-danger px-8 py-4 text-center text-light shadow'>
                                    <p className='text-xl font-bold'>Gagal mengaktivasi akun</p>

                                    <p>Token tidak valid</p>
                                </div>
                            </section>
                        ) : (
                            <section>
                                <div className='flex flex-col items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-center text-light shadow'>
                                    <p className='text-xl font-bold'>Akun berhasil diaktivasi</p>

                                    <Link className='hover:underline' href={'/auth/login'}>
                                        Klik disini untuk masuk
                                    </Link>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}
