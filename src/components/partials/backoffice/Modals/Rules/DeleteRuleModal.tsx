'use client'

import { JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Loading from '../../../Loading'
import { Rule } from '@/@types/Rule'
import { useRule } from '@/hooks/backoffice/useRule'
import { ruleStore } from '@/store/backoffice/ruleStore'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    rule: Rule
}

export default function DeleteRuleModal({ isOpen, setIsOpen, rule }: Props): JSX.Element {
    // global states
    const { isDeleting } = ruleStore()

    // custom hooks
    const { deleteRule } = useRule()

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
                                    <p className='text-center'>Apakah kamu yakin menghapus rule ini?</p>

                                    <p className='text-center text-sm text-primary'>({`${rule.id}`})</p>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    onPress={async () => {
                                        await deleteRule(rule.id)

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