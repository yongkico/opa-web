'use client'

import { JSX, useState } from 'react'
import CardThread from '../Cards/CardThread'
import { FunnelIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { AssetsGroupStatistics } from '@/assets'
import { groupStore } from '@/store/backoffice/groupStore'
import { ArrowPathIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { Avatar, Button, Spinner, Tab, Tabs, Textarea } from '@nextui-org/react'
import { Discussion, Group, GroupMember } from '@/@types/Group'
import { useSearchParams } from 'next/navigation'
import { userStore } from '@/store/userStore'
import GroupSettingDropdown from '../Dropdowns/Group/GroupSettingDropdown'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { useEffectOnce } from 'usehooks-ts'
import LeaveGroupModal from '../Modals/Groups/LeaveGroupModal'
import InviteGroupMemberModal from '../Modals/Groups/InviteGroupMemberModal'
import DatePicker from '../DatePicker'
import DeleteMemberModal from '../Modals/Groups/DeleteMemberModal'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { formatNumberToLocal } from '@/utils'
import ExportToExcelGroup from '../ExportToExcel/ExportToExcelGroup'
import CardGroupStats from '../Cards/CardGroupStats'

export default function GroupDetail(): JSX.Element {
    // search params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    // default range
    const defaultRange: DateRange = {
        from: undefined,
        to: undefined,
    }

    // states
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
    const [range, setRange] = useState<DateRange | undefined>(defaultRange)

    // global states
    const {
        isGroupListOpen,
        setIsGroupListOpen,
        discussionsById,
        isFetchingDiscussion,
        groups,
        isCreating,
        groupStatistic,
        isFilteringStatistics,
    } = groupStore()
    const { loggedInUser } = userStore()

    // custom hooks
    const { createGroupDiscussion, getGroupDiscussionsById, getGroupStatistic } = useGroup()

    // find selected group
    const selectedGroup = groups.data?.find((group) => group.id === searchParams.get('id'))

    // filter group statistics
    const filteredGroupStatistic = [
        { name: 'Luas Lahan (ha)', value: formatNumberToLocal(groupStatistic.data?.land_area.toFixed(2).toString()) },
        {
            name: 'Jumlah Pohon (pohon)',
            value: formatNumberToLocal(groupStatistic.data?.tree_number.toFixed(2).toString()),
        },
        { name: 'Berat Panen (ton)', value: formatNumberToLocal(groupStatistic.data?.weigth.toFixed(2).toString()) },
        {
            name: 'Jumlah Tandan (tandan)',
            value: formatNumberToLocal(groupStatistic.data?.ffb_quantity.toFixed(2).toString()),
        },
        {
            name: 'Pendapatan (Rp)',
            value: formatNumberToLocal(groupStatistic.data?.total_price.toLocaleString('id-ID')),
        },
        {
            name: 'Produktivitas (ton / ha)',
            value: formatNumberToLocal(groupStatistic.data?.productivity.toFixed(2).toString()),
        },
        {
            name: 'Rerata Jumlah Tandan (tandan / pohon)',
            value: formatNumberToLocal(groupStatistic.data?.average_ffb_quantity.toFixed(2).toString()),
        },
        {
            name: 'Rerata Berat Tandan (tandan / ha)',
            value: formatNumberToLocal(groupStatistic.data?.average_ffb_weight.toFixed(2).toString()),
        },
    ]

    useEffectOnce(() => {
        if (searchParams.get('id')) {
            getGroupDiscussionsById(searchParams.get('id') as string)

            getGroupStatistic(
                searchParams.get('id') as string,
                searchParams.get('start_date') as string,
                searchParams.get('end_date') as string,
            )
        }
    })

    return (
        <div
            className={`${
                isGroupListOpen ? '-translate-x-full overflow-hidden lg:translate-x-0' : 'w-full'
            } duration-300 lg:ml-[20rem] lg:w-[calc(100%-20rem)]`}
        >
            {/* group detail header */}
            <header className='apply-dark flex h-16 items-center justify-between border-b bg-white pb-4 lg:px-4'>
                <div className='flex items-center gap-x-4'>
                    <Bars3Icon
                        onClick={() => setIsGroupListOpen(!isGroupListOpen)}
                        className='h-6 w-6 cursor-pointer lg:hidden'
                    />

                    <div>
                        <p className='line-clamp-1 text-sm font-bold sm:text-base'>{selectedGroup?.nama}</p>

                        <p className='line-clamp-1 text-xs'>{selectedGroup?.deskripsi}</p>
                    </div>
                </div>

                <div>{searchParams.get('id') && <GroupSettingDropdown selectedGroup={selectedGroup as Group} />}</div>
            </header>
            {/* end of group detail header */}

            {/* tabs section */}
            <section className='apply-dark h-full bg-white py-2 duration-300 lg:p-4'>
                {!searchParams.get('id') && (
                    <div className='flex h-full flex-col items-center justify-center gap-y-8 text-primary'>
                        <Image
                            className='w-48 sm:w-72'
                            src={AssetsGroupStatistics.asset_unselected_group}
                            alt='Unselected Group'
                        />

                        <p className='mb-16 text-sm sm:text-lg'>Belum ada grup yang dipilih</p>
                    </div>
                )}

                {searchParams.get('id') && (
                    <Tabs
                        classNames={{
                            tabList: 'bg-primary/10',
                        }}
                        color='primary'
                        aria-label='Options'
                        fullWidth
                    >
                        <Tab key='diskusi' title='Diskusi'>
                            <div className='h-[60vh] max-h-[80vh] w-full space-y-4 overflow-y-scroll px-2 lg:max-h-[55vh]'>
                                <form
                                    id='create-discussion-form'
                                    onSubmit={async (e) => {
                                        await createGroupDiscussion(selectedGroup?.id as string, e)

                                        await getGroupDiscussionsById(selectedGroup?.id as string)
                                    }}
                                    className='flex gap-x-4 py-2'
                                >
                                    <div>
                                        <Avatar showFallback name={loggedInUser.data.name} isBordered color='primary' />
                                    </div>

                                    <Textarea
                                        classNames={{
                                            inputWrapper: 'border dark:border-primary/25',
                                        }}
                                        variant='bordered'
                                        label='Buat diskusi...'
                                        name='content'
                                        size='sm'
                                        isRequired
                                    ></Textarea>
                                </form>

                                <Button
                                    className='ml-auto flex items-center'
                                    type='submit'
                                    form='create-discussion-form'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isCreating}
                                >
                                    Posting
                                </Button>

                                <hr className='apply-dark' />

                                {!discussionsById.data && (
                                    <div className='flex h-full items-center justify-center'>
                                        <p className='text-center'>Tidak ada diskusi</p>
                                    </div>
                                )}

                                {isFetchingDiscussion ? (
                                    <div className='flex h-full items-center justify-center'>
                                        <Spinner size='lg' />
                                    </div>
                                ) : (
                                    <div className='space-y-4'>
                                        {discussionsById.data?.map((discussion: Discussion, index: number) => (
                                            <CardThread discussion={discussion} key={`discussion-${index}`} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Tab>

                        <Tab key='statistik' title='Statistik'>
                            <div
                                className={`${
                                    isFullScreen
                                        ? 'fixed inset-4 z-50 p-4 shadow-xl dark:bg-[#0f3745] lg:p-8'
                                        : 'lg:max-h-[55vh]'
                                } apply-dark space-y-4 rounded-lg bg-white py-4 duration-300`}
                            >
                                {/* expand view trigger */}
                                <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
                                    <div className='flex justify-between gap-4'>
                                        <Button
                                            onPress={() => setIsFullScreen(!isFullScreen)}
                                            color='secondary'
                                            radius='sm'
                                            variant='flat'
                                            isIconOnly
                                        >
                                            {!isFullScreen ? (
                                                <ArrowsPointingOutIcon className='h-6 w-6' />
                                            ) : (
                                                <ArrowsPointingInIcon className='h-6 w-6' />
                                            )}
                                        </Button>

                                        <ExportToExcelGroup
                                            data={filteredGroupStatistic}
                                            fileName={`statistik_grup_${selectedGroup?.nama
                                                .replaceAll(' ', '_')
                                                .toLocaleLowerCase()}_${searchParams.get('start_date') || ''}_${
                                                searchParams.get('end_date') || ''
                                            }`}
                                            customHeader={['Nama', 'Nilai']}
                                        />
                                    </div>

                                    <div className='flex'>
                                        {params.get('start_date') && (
                                            <Button
                                                onPress={() => {
                                                    params.delete('start_date')
                                                    params.delete('end_date')

                                                    window.history.pushState(null, '', `?${params.toString()}`)

                                                    getGroupStatistic(searchParams.get('id') as string, '', '')

                                                    setRange(defaultRange)
                                                }}
                                                className='mr-2'
                                                color='secondary'
                                                variant='flat'
                                                radius='sm'
                                                isIconOnly
                                            >
                                                <ArrowPathIcon className='h-5 w-5' />
                                            </Button>
                                        )}

                                        <DatePicker range={range} setRange={setRange} />

                                        <Button
                                            onPress={() => {
                                                // filter by date range
                                                if (range?.from && range?.to) {
                                                    getGroupStatistic(
                                                        searchParams.get('id') as string,
                                                        format(range?.from, 'yyyy-MM-dd'),
                                                        format(range?.to, 'yyyy-MM-dd'),
                                                    )

                                                    params.set('start_date', format(range?.from, 'yyyy-MM-dd'))
                                                    params.set('end_date', format(range?.to, 'yyyy-MM-dd'))

                                                    window.history.pushState(null, '', `?${params.toString()}`)
                                                }
                                            }}
                                            className='rounded-l-none'
                                            radius='sm'
                                            color='secondary'
                                            isIconOnly
                                        >
                                            <FunnelIcon className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </div>

                                <div className='flex gap-2'>
                                    {/* filter */}
                                    {/* <div className='flex w-full gap-2 overflow-x-auto py-2'>
                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                                trigger: 'border apply-dark',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Nama Petani'
                                        >
                                            <SelectItem key={'1'} value={'1'}>
                                                John Doe
                                            </SelectItem>

                                            <SelectItem key={'2'} value={'2'}>
                                                Garda Arraniri
                                            </SelectItem>
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                                trigger: 'border apply-dark',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Nama Kebun'
                                        >
                                            <SelectItem key={'1'} value={'1'}>
                                                Kebun 1
                                            </SelectItem>

                                            <SelectItem key={'2'} value={'2'}>
                                                Kebun 2
                                            </SelectItem>
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                                trigger: 'border apply-dark',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Lokasi'
                                        >
                                            <SelectItem key={'1'} value={'1'}>
                                                Lokasi 1
                                            </SelectItem>
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                                trigger: 'border apply-dark',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Tahun Tanam'
                                        >
                                            <SelectItem key={'1'} value={'1'}>
                                                2022
                                            </SelectItem>

                                            <SelectItem key={'2'} value={'2'}>
                                                2023
                                            </SelectItem>
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                                trigger: 'border apply-dark',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Topografi'
                                        >
                                            <SelectItem key={'1'} value={'1'}>
                                                Datar
                                            </SelectItem>

                                            <SelectItem key={'2'} value={'2'}>
                                                Miring
                                            </SelectItem>
                                        </Select>

                                        <Select
                                            classNames={{
                                                listbox: 'dark:text-light',
                                                trigger: 'border apply-dark',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            labelPlacement='outside'
                                            placeholder='Varietas'
                                        >
                                            <SelectItem key={'1'} value={'1'}>
                                                Varietas 1
                                            </SelectItem>

                                            <SelectItem key={'2'} value={'2'}>
                                                Varietas 2
                                            </SelectItem>
                                        </Select>
                                    </div> */}
                                </div>

                                {/* statistics list */}
                                <div className='h-[50vh] overflow-y-auto'>
                                    <div className='relative'>
                                        {isFilteringStatistics && (
                                            <Spinner className='absolute inset-0 z-50 rounded-lg bg-white/10 backdrop-blur-sm' />
                                        )}

                                        {/* highlighted */}
                                        <div
                                            className={`${
                                                isFullScreen ? 'md:grid-cols-4' : ''
                                            } grid grid-cols-1 gap-4 md:grid-cols-3`}
                                        >
                                            <button className='flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 duration-150 active:scale-95'>
                                                <Image src={AssetsGroupStatistics.asset_group_luas_lahan} alt='asset' />

                                                <div className='text-left'>
                                                    <p className='font-bold'>
                                                        {formatNumberToLocal(
                                                            groupStatistic.data?.land_area.toFixed(2).toString(),
                                                        )}{' '}
                                                        ha
                                                    </p>

                                                    <p className='text-xs text-neutral-400'>Luas Kebun</p>
                                                </div>
                                            </button>

                                            <button className='flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 duration-150 active:scale-95'>
                                                <Image
                                                    src={AssetsGroupStatistics.asset_group_jumlah_tandan}
                                                    alt='asset'
                                                />

                                                <div className='text-left'>
                                                    <p className='font-bold'>
                                                        {formatNumberToLocal(
                                                            groupStatistic.data?.tree_number.toString(),
                                                        )}
                                                    </p>

                                                    <p className='text-xs text-neutral-400'>Jumlah Pohon</p>
                                                </div>
                                            </button>

                                            <button className='flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 duration-150 active:scale-95'>
                                                <Image
                                                    src={AssetsGroupStatistics.asset_group_berat_panen}
                                                    alt='asset'
                                                />

                                                <div className='text-left'>
                                                    <p className='font-bold'>
                                                        {formatNumberToLocal(
                                                            groupStatistic.data?.weigth.toFixed(2).toString(),
                                                        )}{' '}
                                                        kg
                                                    </p>

                                                    <p className='text-xs text-neutral-400'>Total Berat</p>
                                                </div>
                                            </button>

                                            <button className='flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 duration-150 active:scale-95'>
                                                <Image
                                                    src={AssetsGroupStatistics.asset_group_berat_panen}
                                                    alt='asset'
                                                />

                                                <div className='text-left'>
                                                    <p className='font-bold'>
                                                        {formatNumberToLocal(
                                                            groupStatistic.data?.ffb_quantity.toString(),
                                                        )}{' '}
                                                        Tandan
                                                    </p>

                                                    <p className='text-xs text-neutral-400'>Total TBS</p>
                                                </div>
                                            </button>

                                            <button className='flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 duration-150 active:scale-95'>
                                                <Image src={AssetsGroupStatistics.asset_group_pendapatan} alt='asset' />

                                                <div className='text-left'>
                                                    <p className='font-bold'>
                                                        {groupStatistic.data?.total_price.toLocaleString('id-ID', {
                                                            style: 'currency',
                                                            currency: 'IDR',
                                                            maximumFractionDigits: 0,
                                                        })}
                                                    </p>

                                                    <p className='text-xs text-neutral-400'>Pendapatan</p>
                                                </div>
                                            </button>
                                        </div>

                                        <hr className='apply-dark my-4' />

                                        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
                                            <CardGroupStats
                                                type='Produktivitas'
                                                stat={groupStatistic.data?.productivity}
                                            />

                                            <CardGroupStats
                                                type='Rerata Jumlah Tandan'
                                                stat={groupStatistic.data?.average_ffb_quantity}
                                            />

                                            <CardGroupStats
                                                type='Rerata Berat Tandan'
                                                stat={groupStatistic.data?.average_ffb_weight}
                                            />
                                        </div>

                                        {/* end of highlighted */}
                                    </div>

                                    <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-3'></div>
                                </div>
                                {/* end of statistics list */}
                            </div>
                        </Tab>

                        <Tab key='anggota' title='Anggota'>
                            <div className='space-y-8 p-4 lg:py-8'>
                                <div className='flex justify-between gap-4'>
                                    <InviteGroupMemberModal />

                                    <LeaveGroupModal group={selectedGroup as Group} />
                                </div>

                                <div className='flex flex-wrap gap-8'>
                                    {selectedGroup?.anggota?.map((member: GroupMember, index: number) => (
                                        <div
                                            className='flex flex-col items-center justify-center gap-y-4'
                                            key={`item-${index}`}
                                        >
                                            <div className='relative'>
                                                <Avatar
                                                    showFallback
                                                    name={member.name}
                                                    src={member.image_url}
                                                    size='lg'
                                                    color='primary'
                                                    isBordered
                                                />

                                                <DeleteMemberModal member={member} />
                                            </div>

                                            <p className='text-center text-sm'>{member.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                )}
            </section>
            {/* end of tabs section */}
        </div>
    )
}
