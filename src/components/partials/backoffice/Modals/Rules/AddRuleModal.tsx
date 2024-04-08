'use client'

import { FormEvent, JSX } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Select,
    SelectItem,
    useDisclosure,
} from '@nextui-org/react'
import { ruleStore } from '@/store/backoffice/ruleStore'
import { useRule } from '@/hooks/backoffice/useRule'
import { rules } from '@/constants/rule'
import { useConclusion } from '@/hooks/backoffice/useConclusion'
import { conclusionStore } from '@/store/backoffice/conclusionStore'
import { Conclusion } from '@/@types/Conclusion'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function AddRuleModal(): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // global states
    const { isCreating } = ruleStore()
    const { conclusions } = conclusionStore()

    // custom hooks
    const { createRule, errorMessages } = useRule()
    const { getConclusions } = useConclusion()

    // for updating rule
    async function handleCreateRule(e: FormEvent<HTMLFormElement>) {
        await createRule(e)

        onOpenChange()
    }

    return (
        <>
            <Button
                onPress={() => {
                    getConclusions('1', '20')
                    onOpen()
                }}
                className='w-max'
                color='secondary'
                radius='sm'
                isIconOnly
            >
                <PlusIcon className='h-5 w-5' />
            </Button>

            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Tambah Aturan</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='update-rule-form' onSubmit={handleCreateRule}>
                                    <div className='flex flex-col gap-4'>
                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            name='productivity'
                                            labelPlacement='outside'
                                            placeholder='Produktivitas'
                                            isDisabled={isCreating}
                                            isInvalid={!!errorMessages?.message?.productivity[0]}
                                            errorMessage={errorMessages?.message?.productivity[0]}
                                        >
                                            {rules.map((rule: string) => (
                                                <SelectItem key={rule} value={rule}>
                                                    {rule}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            name='average_ffb_quantity'
                                            labelPlacement='outside'
                                            placeholder='Rerata Jumlah Tandan'
                                            isDisabled={isCreating}
                                            isInvalid={!!errorMessages?.message?.average_ffb_quantity[0]}
                                            errorMessage={errorMessages?.message?.average_ffb_quantity[0]}
                                        >
                                            {rules.map((rule: string) => (
                                                <SelectItem key={rule} value={rule}>
                                                    {rule}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            name='average_ffb_weight'
                                            labelPlacement='outside'
                                            placeholder='Rerata Berat Tandan'
                                            isDisabled={isCreating}
                                            isInvalid={!!errorMessages?.message?.average_ffb_weight[0]}
                                            errorMessage={errorMessages?.message?.average_ffb_weight[0]}
                                        >
                                            {rules.map((rule: string) => (
                                                <SelectItem key={rule} value={rule}>
                                                    {rule}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            name='conclusion_id'
                                            labelPlacement='outside'
                                            placeholder='Kesimpulan'
                                            isDisabled={isCreating}
                                            isInvalid={!!errorMessages?.message?.conclusion_id[0]}
                                            errorMessage={errorMessages?.message?.conclusion_id[0]}
                                        >
                                            {conclusions.data?.map((conclusion: Conclusion) => (
                                                <SelectItem key={conclusion.id} value={conclusion.id}>
                                                    {conclusion.message}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </form>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    form='update-rule-form'
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
