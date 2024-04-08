'use client'

import { FormEvent, JSX } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Textarea,
} from '@nextui-org/react'
import { useConclusion } from '@/hooks/backoffice/useConclusion'
import { conclusionStore } from '@/store/backoffice/conclusionStore'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function AddConclusionModal(): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isCreating } = conclusionStore()

    // custom hooks
    const { createConclusion, errorMessages } = useConclusion()

    // for updating conclusion
    async function handleCreateConclusion(e: FormEvent<HTMLFormElement>) {
        await createConclusion(e)

        onOpenChange()
    }

    return (
        <>
            <Button onPress={onOpen} className='w-max' color='secondary' radius='sm' isIconOnly>
                <PlusIcon className='h-5 w-5' />
            </Button>

            <Modal className='dark:text-light' size='2xl' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Tambah Kesimpulan</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='update-conclusion-form' onSubmit={handleCreateConclusion}>
                                    <div className='flex flex-col gap-4'>
                                        <Textarea
                                            type='text'
                                            variant='bordered'
                                            name='message'
                                            radius='sm'
                                            labelPlacement='outside'
                                            isInvalid={!!errorMessages?.message?.message[0]}
                                            errorMessage={errorMessages?.message?.message[0]}
                                        />
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    form='update-conclusion-form'
                                    type='submit'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isCreating}
                                >
                                    Tambah
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
