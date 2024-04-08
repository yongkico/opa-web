import { User } from '@/@types/Auth'
import { Avatar, Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { AsyncListData } from '@react-stately/data'
import { JSX } from 'react'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    list: AsyncListData<User>
    user: User
}
export default function DetailUserModal({ isOpen, setIsOpen, user }: Props): JSX.Element {
    return (
        <Modal className='dark:text-light' backdrop='blur' isOpen={isOpen} onOpenChange={setIsOpen}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>Detail User</ModalHeader>

                        <ModalBody className='relative'>
                            <div className='flex flex-col items-center gap-4 text-center'>
                                <div>
                                    <Avatar src={user.image_url} size='lg' fallback />
                                </div>

                                <div>
                                    <p className='text-xl font-semibold text-primary'>{user.name}</p>

                                    <p className='text-slate-400'>{user.email}</p>
                                </div>

                                <div>
                                    <p className='text-sm text-slate-400'>Role</p>

                                    <p>{user.role_name}</p>
                                </div>

                                {user.is_active === '1' ? (
                                    <Chip color='primary' variant='flat' size='lg'>
                                        Aktif
                                    </Chip>
                                ) : (
                                    <Chip color='danger' variant='flat' size='lg'>
                                        Tidak Aktif
                                    </Chip>
                                )}
                            </div>
                        </ModalBody>

                        <ModalFooter className='flex justify-end'>
                            <Button onPress={() => setIsOpen(false)} color='primary' radius='sm'>
                                Tutup
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
