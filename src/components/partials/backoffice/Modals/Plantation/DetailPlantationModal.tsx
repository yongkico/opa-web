import { JSX } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Plantation } from '@/@types/Plantation'
import { formatNumberToLocal } from '@/utils'

type Props = {
    plantation: Plantation
}

export default function DetailPlantationModal({ plantation }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button onPress={onOpen} className='w-max' color='secondary' size='sm' radius='sm'>
                Detail
            </Button>

            <Modal
                className='dark:text-light'
                scrollBehavior='inside'
                size='4xl'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Detail Kebun</ModalHeader>

                            <ModalBody className='relative'>
                                <div className='max-w-2xl space-y-4 md:space-y-6 md:whitespace-nowrap lg:columns-2'>
                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Nama Kebun</p>

                                        <p className='text-lg font-semibold'>{plantation.nama}</p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Luas</p>

                                        <p className='text-lg font-semibold'>
                                            {formatNumberToLocal(plantation.luas)} Ha
                                        </p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Jumlah Pohon</p>

                                        <p className='text-lg font-semibold'>
                                            {formatNumberToLocal(plantation.jumlah_pohon)}
                                        </p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Tahun Tanam</p>

                                        <p className='text-lg font-semibold'>{plantation.tahun_tanam}</p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Rotasi Panen</p>

                                        <p className='text-lg font-semibold'>{plantation.rotasi_panen} Hari</p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Jenis Topografi Dominan</p>

                                        <p className='text-lg font-semibold'>{plantation.jenis_topografi_dominan}</p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Jenis Tanah Dominan</p>

                                        <p className='text-lg font-semibold'>{plantation.jenis_tanah_dominan}</p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Varietas Tanaman</p>

                                        <p className='text-lg font-semibold'>{plantation.nama_varietas}</p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Alamat Kebun</p>

                                        <p className='whitespace-normal text-lg font-semibold'>{plantation.alamat}</p>
                                    </div>

                                    <div className='break-inside-avoid'>
                                        <p className='text-xs'>Koordinat</p>

                                        <div className='flex gap-x-4'>
                                            <p className='text-lg font-semibold'>{plantation.latitude}</p>

                                            <p className='text-lg font-semibold'>{plantation.longitude}</p>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex justify-end'>
                                <Button onPress={onOpenChange} color='primary' radius='sm'>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
