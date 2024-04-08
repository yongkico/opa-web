'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Loading from '../../../Loading'
import { varietyStore } from '@/store/backoffice/varietyStore'
import { useVariety } from '@/hooks/backoffice/useVariety'
import { Variety } from '@/@types/Variety'

type Props = {
    variety: Variety
}

export default function DeleteVarietyModal({ variety }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isDeleting } = varietyStore()

    // custom hooks
    const { deleteVariety } = useVariety()

    return (
        <>
            <Button onPress={onOpen} className='w-max' color='danger' size='sm' radius='sm'>
                Delete
            </Button>

            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Hapus?</ModalHeader>

                            <ModalBody className='relative'>
                                {isDeleting && (
                                    <div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm'>
                                        <Loading />
                                    </div>
                                )}

                                <div>
                                    <p className='text-center'>Apakah kamu yakin menghapus varietas ini?</p>

                                    <p className='text-center text-sm text-primary'>({`${variety.name}`})</p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await deleteVariety(variety.id)

                                        onOpenChange()
                                    }}
                                    color='primary'
                                    radius='sm'
                                >
                                    Hapus
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
