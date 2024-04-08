'use client'

import { ChangeEvent, FormEvent, JSX, useRef, useState } from 'react'
import { EyeIcon, EyeSlashIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { Button, Input, Tab, Tabs } from '@nextui-org/react'
import { useEffectOnce } from 'usehooks-ts'
import { useAccount } from '@/hooks/backoffice/useAccount'
import { accountStore } from '@/store/backoffice/accountStore'

type EditableProfile = {
    name: string
}

export default function Account(): JSX.Element {
    // states
    const [isImageUploaded, setIsImageUploaded] = useState<boolean>(true)
    const [editableProfile, setEditableProfile] = useState<EditableProfile>()
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>('')
    const [isVisible, setIsVisible] = useState({
        current_password: false,
        new_password: false,
        confirm_new_password: false,
    })

    // refs
    const imageRef = useRef<HTMLImageElement | null>(null)
    const imageLabelRef = useRef<HTMLLabelElement | null>(null)

    // custom hooks
    const { getProfile, updateProfile, changePassword, updatePasswordErrorMessages } = useAccount()

    // global states
    const { profile, isUpdatingPassword, isUpdatingProfile } = accountStore()

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const image: File | null | undefined = e.currentTarget.files?.item(0)

        if (image) {
            const imageUrl = URL.createObjectURL(image)

            imageRef.current!.src = imageUrl

            setIsImageUploaded(true)

            return
        }

        setIsImageUploaded(false)
    }

    useEffectOnce(() => {
        getProfile()
    })

    function handleUpdateProfile(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        updateProfile(e)
    }

    function handleUpdatePassword(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const newPassword = e.currentTarget.new_password.value
        const confirmPassword = e.currentTarget.confirm_password.value

        if (newPassword !== confirmPassword) {
            setConfirmPasswordMessage('Password do not match')

            return
        }

        setConfirmPasswordMessage('')

        changePassword(e)
    }

    return (
        <main className='container min-h-screen space-y-8 px-0 py-4 md:py-8'>
            {/* tabs */}
            <section className='apply-dark rounded-lg bg-white p-4 lg:p-8'>
                <header className='mb-4 p-4'>
                    <h1 className='md:text-2xl'>Profile</h1>
                </header>

                <Tabs variant='underlined' size='lg' color='primary'>
                    <Tab key='profile' title='Profile'>
                        <form
                            id='update-profile-form'
                            onSubmit={handleUpdateProfile}
                            className='flex flex-col gap-x-4 gap-y-8 p-4 sm:flex-row sm:gap-x-12'
                        >
                            {/* profile image */}
                            <div>
                                <div className={`${isImageUploaded ? 'hidden' : ''} w-full md:w-max`}>
                                    <label
                                        ref={imageLabelRef}
                                        className='relative flex flex-col items-center rounded-lg border-2 border-dashed border-neutral-500 px-8 py-4 text-center text-sm text-neutral-500'
                                        htmlFor='image-profile'
                                    >
                                        <PhotoIcon className='h-12 w-12' />
                                        <span>Upload</span> <span> your photo</span>
                                    </label>

                                    <input
                                        onChange={handleImageChange}
                                        className='hidden'
                                        type='file'
                                        name='profile_image'
                                        id='image-profile'
                                    />
                                </div>

                                {/* image preview */}
                                <div className={`${isImageUploaded ? '' : 'hidden'} flex flex-col gap-2.5`}>
                                    <img
                                        ref={imageRef}
                                        className='aspect-video rounded-lg object-cover sm:w-48'
                                        src={profile.data?.image_url}
                                        alt='photo profile'
                                    />

                                    <Button
                                        onPress={() => imageLabelRef.current?.click()}
                                        color='primary'
                                        variant='ghost'
                                        radius='sm'
                                        size='sm'
                                    >
                                        Change
                                    </Button>

                                    <p className='text-center text-xs text-primary'>
                                        File harus JPG atau PNG. <br /> Ukuran maksimal 2MB
                                    </p>
                                </div>
                                {/* end of image preview */}
                            </div>
                            {/* end of profile image */}

                            {/* profile form */}
                            <div className='flex w-full flex-col gap-y-4'>
                                <div className='flex flex-col gap-y-1'>
                                    <label htmlFor='fullname'>Nama Lengkap</label>

                                    <Input
                                        onChange={(e) => setEditableProfile({ name: e.target.value })}
                                        classNames={{
                                            inputWrapper: 'border apply-dark',
                                        }}
                                        name='name'
                                        variant='bordered'
                                        type='text'
                                        radius='sm'
                                        isDisabled={isUpdatingProfile}
                                        placeholder='Masukkan nama lengkap...'
                                        labelPlacement='outside'
                                        value={editableProfile?.name ?? profile.data?.name}
                                        isRequired
                                    />
                                </div>

                                <div className='flex flex-col gap-y-1'>
                                    <label htmlFor='fullname'>Email</label>

                                    <Input
                                        classNames={{
                                            inputWrapper: 'border apply-dark',
                                        }}
                                        variant='bordered'
                                        type='email'
                                        radius='sm'
                                        placeholder='Masukkan email...'
                                        labelPlacement='outside'
                                        isDisabled
                                        value={profile.data?.email}
                                    />
                                </div>

                                {/* action button */}
                                <div className='mt-4 flex gap-x-4'>
                                    <Button
                                        form='update-profile-form'
                                        type='submit'
                                        color='secondary'
                                        radius='sm'
                                        isLoading={isUpdatingProfile}
                                    >
                                        Simpan
                                    </Button>
                                </div>
                                {/* end of action button */}
                            </div>
                            {/* end of profile form */}
                        </form>
                    </Tab>

                    <Tab key='change-password' title='Change Password'>
                        {/* profile form */}
                        <form
                            onSubmit={handleUpdatePassword}
                            id='change-password-form'
                            className='flex w-full max-w-md flex-col gap-y-4'
                        >
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='old-password'>Password Lama</label>

                                <Input
                                    classNames={{
                                        inputWrapper: 'border apply-dark',
                                    }}
                                    name='old_password'
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='Masukkan password lama..'
                                    labelPlacement='outside'
                                    isRequired
                                    isInvalid={!!updatePasswordErrorMessages.message?.old_password}
                                    errorMessage={updatePasswordErrorMessages.message?.old_password?.[0]}
                                    type={isVisible.current_password ? 'text' : 'password'}
                                    endContent={
                                        <button
                                            onClick={() =>
                                                setIsVisible({
                                                    ...isVisible,
                                                    current_password: !isVisible.current_password,
                                                })
                                            }
                                            type='button'
                                        >
                                            {isVisible.current_password ? (
                                                <EyeIcon className='h-5 w-5 text-neutral-500' />
                                            ) : (
                                                <EyeSlashIcon className='h-5 w-5 text-neutral-500' />
                                            )}
                                        </button>
                                    }
                                />
                            </div>

                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='new-password'>Password Baru</label>

                                <Input
                                    classNames={{
                                        inputWrapper: 'border apply-dark',
                                    }}
                                    name='new_password'
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='Masukkan password baru...'
                                    labelPlacement='outside'
                                    isRequired
                                    isInvalid={!!updatePasswordErrorMessages.message?.new_password}
                                    errorMessage={updatePasswordErrorMessages.message?.new_password?.[0]}
                                    type={isVisible.new_password ? 'text' : 'password'}
                                    endContent={
                                        <button
                                            onClick={() =>
                                                setIsVisible({
                                                    ...isVisible,
                                                    new_password: !isVisible.new_password,
                                                })
                                            }
                                            type='button'
                                        >
                                            {isVisible.new_password ? (
                                                <EyeIcon className='h-5 w-5 text-neutral-500' />
                                            ) : (
                                                <EyeSlashIcon className='h-5 w-5 text-neutral-500' />
                                            )}
                                        </button>
                                    }
                                />
                            </div>

                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='new-password-confirm'>Ketik Ulang Password Baru</label>

                                <Input
                                    classNames={{
                                        inputWrapper: 'border apply-dark',
                                    }}
                                    name='confirm_password'
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='Konfimari password baru...'
                                    labelPlacement='outside'
                                    isRequired
                                    isInvalid={!!confirmPasswordMessage}
                                    errorMessage={confirmPasswordMessage}
                                    type={isVisible.confirm_new_password ? 'text' : 'password'}
                                    endContent={
                                        <button
                                            onClick={() =>
                                                setIsVisible({
                                                    ...isVisible,
                                                    confirm_new_password: !isVisible.confirm_new_password,
                                                })
                                            }
                                            type='button'
                                        >
                                            {isVisible.confirm_new_password ? (
                                                <EyeIcon className='h-5 w-5 text-neutral-500' />
                                            ) : (
                                                <EyeSlashIcon className='h-5 w-5 text-neutral-500' />
                                            )}
                                        </button>
                                    }
                                />
                            </div>

                            {/* action button */}
                            <div className='mt-4 flex gap-x-4'>
                                <Button
                                    form='change-password-form'
                                    type='submit'
                                    color='secondary'
                                    radius='sm'
                                    isLoading={isUpdatingPassword}
                                >
                                    Simpan
                                </Button>
                            </div>
                            {/* end of action button */}
                        </form>
                        {/* end of profile form */}
                    </Tab>
                </Tabs>
            </section>
        </main>
    )
}
