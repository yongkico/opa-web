'use client'

import { JSX, FormEvent, useState } from 'react'
import Image from 'next/image'
import AssetLogin from '@/assets/asset-login.webp'
import Link from 'next/link'
import Logo from '@/components/partials/Logo'
import { forgotPassword, resetPassword, validateResetPasswordToken } from '@/modules/authModule'
import Loading from '@/components/partials/Loading'
import { Button, Input } from '@nextui-org/react'
import { DataResponse } from '@/@types'
import { toast } from 'sonner'
import { failToast, successToast } from '@/configs/toastConfig'
import { useEffectOnce } from 'usehooks-ts'
import { useRouter, useSearchParams } from 'next/navigation'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useTranslation } from '@/i18n/client'

export default function ResetPassword(): JSX.Element {
    // translation
    const { t } = useTranslation('common')

    // states
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [_isValidating, setIsValidating] = useState<boolean>(false)
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false)
    const [error, setError] = useState<DataResponse<string>>({} as DataResponse<string>)
    const [success, setSuccess] = useState<DataResponse<string>>({} as DataResponse<string>)
    const [errorResetPassword, setErrorResetPassword] = useState<DataResponse<string>>({} as DataResponse<string>)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    // search params
    const searchParams = useSearchParams()

    // router
    const router = useRouter()

    const handleForgotPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setIsProcessing(true)

        const email = e.currentTarget.email.value

        try {
            const res = await forgotPassword(email)

            setSuccess(res)

            toast.success(res.message, successToast)

            setError({} as DataResponse<string>)
        } catch (error: any) {
            const err = error as DataResponse<string>

            setError(err)
        } finally {
            setIsProcessing(false)
        }
    }

    async function handleValidateResetPasswordToken() {
        setIsValidating(true)

        try {
            const res = await validateResetPasswordToken(searchParams.get('token') as string)

            toast.success(res.message, successToast)

            setIsTokenValid(true)
        } catch (error) {
            const err = error as DataResponse<string>
            toast.error(err.message, failToast)
        } finally {
            setIsValidating(false)
        }
    }

    useEffectOnce(() => {
        if (searchParams.get('token')) {
            handleValidateResetPasswordToken()
        }
    })

    async function handleResetPassword(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        formData.append('token', searchParams.get('token') as string)

        try {
            const res = await resetPassword(formData)

            toast.success(res.message, successToast)

            setErrorResetPassword({} as DataResponse<string>)

            router.push('/auth/login')
        } catch (error) {
            const err = error as DataResponse<string>

            toast.error(err.message, failToast)

            setErrorResetPassword(err)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className='mx-auto grid h-screen items-center justify-center bg-light dark:bg-[#012432] lg:grid-cols-2'>
            <div className='hidden h-screen bg-primary lg:flex lg:items-end lg:justify-center'>
                {/* blob 1 */}
                <div className='absolute -left-36 -top-36 flex h-96 w-96 items-center justify-center rounded-full bg-accent/50'></div>

                {/* blob 2 */}
                <div className='absolute -bottom-96 -left-16 flex h-[38rem] w-[38rem] items-center justify-center rounded-full bg-accent/50'></div>

                <Image className='relative max-h-screen w-80 object-contain' src={AssetLogin} alt='Asset Login' />
            </div>

            <div className='apply-dark relative mx-auto w-[calc(100vw-2rem)] space-y-12 rounded-lg bg-white p-6 shadow dark:bg-dark sm:w-[26rem] lg:p-8'>
                <header>
                    <Logo className='w-24' />

                    <h1 className='text-base'>{t('resetPasswordAnda')}</h1>
                </header>

                {!isTokenValid ? (
                    <form onSubmit={handleForgotPassword}>
                        <div className='flex flex-col items-center gap-y-4'>
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
                                isInvalid={!!error?.message}
                                errorMessage={error?.message}
                            />

                            {/* error message */}
                            <div>
                                <p className='mt-4 text-center text-sm text-green-500'>{success?.message}</p>
                            </div>
                            {/* end of error message */}
                        </div>

                        <Button className='mt-8' type='submit' color='primary' radius='sm' fullWidth>
                            Reset
                        </Button>

                        <div className='mt-4 flex justify-center gap-x-2 text-sm sm:text-base'>
                            <p>{t('ingatPassword')}?</p>

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
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <div className='flex flex-col items-center gap-y-4'>
                            <Input
                                classNames={{
                                    inputWrapper: 'border apply-dark',
                                }}
                                name='password'
                                variant='bordered'
                                radius='sm'
                                labelPlacement='outside'
                                type={isPasswordVisible ? 'text' : 'password'}
                                label='Password baru'
                                isRequired
                                isInvalid={!!errorResetPassword?.message}
                                errorMessage={errorResetPassword?.message}
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

                            <Button className='mt-8' type='submit' color='primary' radius='sm' fullWidth>
                                Ganti Password
                            </Button>

                            {/* error message */}
                            <div>
                                <p className='mt-4 text-center text-sm text-green-500'>{success?.message}</p>
                            </div>
                            {/* end of error message */}
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
