'use client'

import { FormEvent, JSX } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from '@nextui-org/react'
import { Rule } from '@/@types/Rule'
import { ruleStore } from '@/store/backoffice/ruleStore'
import { useRule } from '@/hooks/backoffice/useRule'
import { rules } from '@/constants/rule'
import { conclusionStore } from '@/store/backoffice/conclusionStore'
import { Conclusion } from '@/@types/Conclusion'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    rule: Rule
}

export default function EditRuleModal({ isOpen, setIsOpen, rule }: Props): JSX.Element {
    // global states
    const { isUpdating } = ruleStore()
    const { conclusions } = conclusionStore()

    // custom hooks
    const { updateRule } = useRule()

    // for updating rule
    async function handleUpdateRule(e: FormEvent<HTMLFormElement>) {
        await updateRule(rule.id, e)

        setIsOpen(false)
    }

    return (
        <>
            <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={setIsOpen}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Edit Aturan</ModalHeader>

                            <ModalBody className='relative'>
                                <form id='update-rule-form' onSubmit={handleUpdateRule}>
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
                                            defaultSelectedKeys={[rule.productivity]}
                                            isDisabled={isUpdating}
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
                                            defaultSelectedKeys={[rule.average_ffb_quantity]}
                                            isDisabled={isUpdating}
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
                                            defaultSelectedKeys={[rule.average_ffb_weight]}
                                            isDisabled={isUpdating}
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
                                            placeholder='Rerata Berat Tandan'
                                            defaultSelectedKeys={[rule.conclusion_id]}
                                            isDisabled={isUpdating}
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
                                <Button onPress={() => setIsOpen(false)} color='primary' variant='light' radius='sm'>
                                    Batal
                                </Button>

                                <Button
                                    form='update-rule-form'
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
