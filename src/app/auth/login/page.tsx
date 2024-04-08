'use client'

import { JSX, FormEvent, useState } from 'react'
import Image from 'next/image'
import AssetLogin from '@/assets/asset-login.webp'
import Link from 'next/link'
import Logo from '@/components/partials/Logo'
import { login, validate } from '@/modules/authModule'
import Loading from '@/components/partials/Loading'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { LoginFailed } from '@/@types/Auth'
import { Button, Chip, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { userStore } from '@/store/userStore'
import { toast } from 'sonner'
import { successToast } from '@/configs/toastConfig'
import { getRole } from '@/utils'
import { avatarStore } from '@/store/avatarStore'
import { useTranslation } from '@/i18n/client'

export default function Login(): JSX.Element {
    // translation
    const { t } = useTranslation('common')

    // states
    const [loginFailed, setLoginFailed] = useState<LoginFailed>({} as LoginFailed)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    // global states
    const { setLoggedInUser } = userStore()
    const { setAvatar } = avatarStore()

    // router
    const router = useRouter()

    // for handling login
    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setIsProcessing(true)

        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        try {
            const res = await login({ email, password })

            setLoginFailed({} as LoginFailed)
            setLoggedInUser(res)

            setAvatar(res.data.image_url)

            const resetForm = e.target as HTMLFormElement
            resetForm.reset()

            localStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN, res.access_token)

            const validate_res = await validate()

            toast.success(res.message, successToast)

            setLoggedInUser(validate_res)

            if (res.data.role_name === 'Author') {
                router.push(`/author/articles`)

                return
            }

            router.push(`/${getRole(res.data.role_name)}/dashboard`)
        } catch (error) {
            setLoginFailed(error as LoginFailed)
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
                    <Link href={`/home`}>
                        <Logo className='w-24' />
                    </Link>

                    <h1 className='text-base'>{t('selamatDatang')}</h1>
                </header>

                <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleLogin(e)}>
                    {/* error section */}
                    {loginFailed?.message && (
                        <Chip className='mb-4 min-w-full' color='danger' radius='sm'>
                            {loginFailed?.message}
                        </Chip>
                    )}

                    <div className='flex flex-col items-center gap-y-2'>
                        <Input
                            classNames={{
                                inputWrapper: 'border apply-dark',
                            }}
                            name='email'
                            variant='bordered'
                            type='email'
                            label='Email'
                            radius='sm'
                            labelPlacement='outside'
                            isRequired
                            isInvalid={!!loginFailed.message}
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
                            isInvalid={!!loginFailed.message}
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

                    <div className='my-4 mt-8 flex justify-end'>
                        <Link href='/auth/reset-password'>
                            <span className='text-sm font-semibold hover:underline hover:underline-offset-2'>
                                {t('lupaPassword')}?
                            </span>
                        </Link>
                    </div>

                    <Button className='w-full' type='submit' color='primary' radius='sm' isLoading={isProcessing}>
                        {t('masuk')}
                    </Button>

                    <div className='mt-4 flex justify-center gap-x-2 text-sm sm:text-base'>
                        <p>{t('belumPunyaAkun')}?</p>

                        <Link href='/auth/register'>
                            <span className='font-bold text-secondary'>{t('daftarDisini')}</span>
                        </Link>
                    </div>

                    {/* loading */}
                    {isProcessing && (
                        <div className='absolute inset-0 z-50 flex items-center justify-center rounded-lg  backdrop-blur-sm'>
                            <Loading />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
