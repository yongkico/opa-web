'use client'

import { JSX, FormEvent, useState } from 'react'
import Image from 'next/image'
import AssetLogin from '@/assets/asset-login.webp'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/partials/Logo'
import { register } from '@/modules/authModule'
import Loading from '@/components/partials/Loading'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button, Input } from '@nextui-org/react'
import { toast } from 'sonner'
import { successToast } from '@/configs/toastConfig'
import { useTranslation } from '@/i18n/client'

type RegisterFailed = {
    status: boolean
    message: [
        {
            name: string
        },
        {
            email: string
        },
        {
            password: string
        },
    ]
    data: string
}

export default function Register(): JSX.Element {
    // translation
    const { t } = useTranslation('common')

    // states
    const [registerError, setRegisterError] = useState<RegisterFailed>({} as RegisterFailed)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    // router
    const router = useRouter()

    const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setIsProcessing(true)

        const name = e.currentTarget.user_name.value
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        try {
            const res = await register({ name, email, password })

            toast.success(res.message, successToast)

            router.push('/auth/login')
        } catch (error) {
            const err = error as RegisterFailed

            setRegisterError(err)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className='mx-auto grid h-screen items-center justify-center bg-light dark:bg-[#012432] lg:grid-cols-2'>
            <div className='relative hidden h-screen overflow-hidden bg-primary lg:flex lg:items-end lg:justify-center'>
                {/* blob 1 */}
                <div className='absolute -left-36 -top-36 flex h-96 w-96 items-center justify-center rounded-full bg-accent/50'></div>

                {/* blob 2 */}
                <div className='absolute -bottom-96 -left-16 flex h-[38rem] w-[38rem] items-center justify-center rounded-full bg-accent/50'></div>

                <Image className='relative max-h-screen w-80 object-contain' src={AssetLogin} alt='Asset Login' />
            </div>

            <div className='apply-dark relative mx-auto w-[calc(100vw-2rem)] space-y-12 rounded-lg bg-white p-6 shadow dark:bg-dark sm:w-[26rem] lg:p-8'>
                <header>
                    <Link href={'/home'}>
                        <Logo className='w-24' />
                    </Link>

                    <h1 className='text-base'>{t('gabungDenganOpa')}</h1>
                </header>

                <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleRegister(e)}>
                    <div className='flex flex-col items-center gap-y-2'>
                        <Input
                            classNames={{
                                inputWrapper: 'border apply-dark',
                            }}
                            name='user_name'
                            variant='bordered'
                            radius='sm'
                            labelPlacement='outside'
                            type='text'
                            label='Name'
                            isRequired
                            isInvalid={!!registerError?.message?.[0]?.name}
                            errorMessage={registerError?.message?.[0]?.name}
                        />

                        <Input
                            classNames={{
                                inputWrapper: 'border apply-dark',
                            }}
                            name='email'
                            variant='bordered'
                            radius='sm'
                            labelPlacement='outside'
                            type='email'
                            label='Email'
                            isRequired
                            isInvalid={!!registerError?.message?.[1]?.email}
                            errorMessage={registerError?.message?.[1]?.email}
                        />

                        <Input
                            classNames={{
                                inputWrapper: 'border apply-dark',
                            }}
                            name='password'
                            variant='bordered'
                            type={isPasswordVisible ? 'text' : 'password'}
                            label='Password'
                            radius='sm'
                            labelPlacement='outside'
                            isRequired
                            isInvalid={!!registerError?.message?.[2]?.password}
                            errorMessage={registerError?.message?.[2]?.password}
                            endContent={
                                <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} type='button'>
                                    {isPasswordVisible ? (
                                        <EyeIcon className='h-5 w-5 cursor-pointer' />
                                    ) : (
                                        <EyeSlashIcon className='h-5 w-5 cursor-pointer' />
                                    )}
                                </button>
                            }
                        />
                    </div>

                    <div className='my-4 flex justify-between'>
                        <Link className='ml-auto' href='#'>
                            <span className='text-sm font-semibold text-secondary underline underline-offset-2'>
                                {t('syaratDanKetentuan')}
                            </span>
                        </Link>
                    </div>

                    <Button className='w-full' type='submit' color='primary' radius='sm' isLoading={isProcessing}>
                        {t('daftar')}
                    </Button>

                    <div className='mt-4 flex justify-center gap-x-2 text-sm sm:text-base'>
                        <p>{t('sudahPunyaAkun')}?</p>

                        <Link href='/auth/login'>
                            <span className='font-bold text-secondary'>{t('masukDisini')}</span>
                        </Link>
                    </div>

                    {/* loading */}
                    {isProcessing && (
                        <div className='absolute inset-0 flex items-center justify-center rounded-lg  backdrop-blur-sm'>
                            <Loading />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
