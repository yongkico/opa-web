'use client'

import { FormEvent, JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea } from '@nextui-org/react'
import { Conclusion } from '@/@types/Conclusion'
import { conclusionStore } from '@/store/backoffice/conclusionStore'
import { useConclusion } from '@/hooks/backoffice/useConclusion'
import { useSearchParams } from 'next/navigation'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    conclusion: Conclusion
}

export default function EditConclusionModal({ isOpen, setIsOpen, conclusion }: Props): JSX.Element {
    // global states
    const { isUpdating, setInitialPage } = conclusionStore()

    // custom hooks
    const { updateConclusion, getConclusions, errorMessages } = useConclusion()

    // params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    // for updating conclusion
    async function handleUpdateConclusion(e: FormEvent<HTMLFormElement>) {
        await updateConclusion(conclusion.id, e)

        setIsOpen(false)

        params.set('page', '1')
        window.history.pushState(null, '', `?${params.toString()}`)

        getConclusions(params.get('page') as string)

        setInitialPage(1)
    }

    return (
        <>
            <Modal className='dark:text-light' size='2xl' backdrop='blur' isOpen={isOpen} onOpenChange={setIsOpen}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Edit Kesimpulan</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='update-conclusion-form' onSubmit={handleUpdateConclusion}>
                                    <div className='flex flex-col gap-4'>
                                        <Textarea
                                            type='text'
                                            variant='bordered'
                                            size='sm'
                                            name='message'
                                            radius='sm'
                                            defaultValue={conclusion.message}
                                            isInvalid={!!errorMessages?.message?.message[0]}
                                            errorMessage={errorMessages?.message?.message[0]}
                                        />
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    form='update-conclusion-form'
                                    type='submit'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isUpdating}
                                >
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
