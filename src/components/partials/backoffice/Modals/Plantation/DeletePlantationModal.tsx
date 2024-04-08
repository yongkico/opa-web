'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { Plantation } from '@/@types/Plantation'
import { plantationStore } from '@/store/backoffice/plantationStore'
import { usePlantation } from '@/hooks/backoffice/usePlantation'
import Loading from '../../../Loading'
import { AsyncListData } from '@react-stately/data'

type Props = {
    list: AsyncListData<Plantation>
    plantation: Plantation
}

export default function DeletePlantationModal({ list, plantation }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isDeleting } = plantationStore()

    // custom hooks
    const { deletePlantation } = usePlantation()

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
                                    <p className='text-center'>Apakah kamu yakin menghapus data ini?</p>

                                    <p className='text-center text-sm text-primary'>({`${plantation.nama}`})</p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await deletePlantation(plantation.id)

                                        onOpenChange()

                                        list.reload()
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
