'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Loading from '../../../Loading'
import { Conclusion } from '@/@types/Conclusion'
import { useConclusion } from '@/hooks/backoffice/useConclusion'
import { conclusionStore } from '@/store/backoffice/conclusionStore'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    conclusion: Conclusion
}

export default function DeleteConclusionModal({ isOpen, setIsOpen, conclusion }: Props): JSX.Element {
    // global states
    const { isDeleting } = conclusionStore()

    // custom hooks
    const { deleteConclusion } = useConclusion()

    return (
        <>
            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={setIsOpen}>
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
                                    <p className='text-center'>Apakah kamu yakin menghapus kesimpulan ini?</p>

                                    <p className='line-clamp-2 text-center text-sm text-primary'>
                                        ({`${conclusion.message}`})
                                    </p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await deleteConclusion(conclusion.id)

                                        setIsOpen(false)
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
