'use client'

import { DataResponse } from '@/@types'
import { Comment, Discussion } from '@/@types/Group'
import { useGroup } from '@/hooks/backoffice/useGroup'
import { userStore } from '@/store/userStore'
// import { groupStore } from '@/store/backoffice/groupStore'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import {
    Avatar,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    useDisclosure,
} from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { FormEvent, JSX, useState } from 'react'
import DeleteCommentModal from './DeleteCommentModal'

type Props = {
    discussion: Discussion
}

export default function AddCommentModal({ discussion }: Props): JSX.Element {
    const { onOpen, isOpen, onOpenChange } = useDisclosure()

    // states
    const [commentsByDiscussion, setCommentsByDiscussion] = useState<DataResponse<Comment[]>>()
    const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false)
    const [isSendingComment, setIsSendingComment] = useState<boolean>(false)
    const [isDeleteCommentModal, setIsDeleteCommentModal] = useState<boolean>(false)

    // custom hooks
    const { addComment, getCommentsByDiscussionId } = useGroup()

    // global states
    const { loggedInUser } = userStore()
    // const { discussionsById } = groupStore()

    // search params
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    return (
        <>
            <Button
                onPress={async () => {
                    setIsFetchingComments(true)

                    params.set('discussion_id', discussion.id)
                    window.history.pushState(null, '', `?${params.toString()}`)

                    onOpen()

                    setCommentsByDiscussion(await getCommentsByDiscussionId('', discussion.id))

                    setIsFetchingComments(false)
                }}
                className='h-max px-1'
                color='primary'
                variant='light'
                radius='full'
                startContent={<ChatBubbleOvalLeftIcon className='h-4 w-4' />}
            >
                Comments
            </Button>

            <Modal
                className='dark:text-light'
                scrollBehavior='inside'
                size='3xl'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                aria-label='Tambah Target Panen'
            >
                <ModalContent aria-label='Tambah Target Panen'>
                    {() => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                {discussion.created_by}&apos;s Diskusi
                            </ModalHeader>

                            <ModalBody className='relative'>
                                <div className='sticky -top-2 z-40 pb-4 lg:px-8'>
                                    <div className='flex flex-col gap-y-4 rounded-lg bg-accent p-4 text-light shadow-lg'>
                                        <div className='flex items-center gap-x-2'>
                                            <div>
                                                <Avatar
                                                    src={discussion.image_user}
                                                    showFallback
                                                    name={discussion.nama_user}
                                                    isBordered
                                                    size='sm'
                                                />
                                            </div>

                                            <p className='font-semibold'>{discussion.created_by || 'User Name'}</p>
                                        </div>

                                        <div dangerouslySetInnerHTML={{ __html: discussion.konten }}></div>
                                    </div>
                                </div>

                                {/* list of comments */}
                                <div className='flex flex-col gap-y-2 p-2 lg:p-8'>
                                    {isFetchingComments && <Spinner />}

                                    {/* comment bubble */}
                                    {!isFetchingComments &&
                                        commentsByDiscussion?.data.map((comment: Comment, index: number) => (
                                            <div
                                                key={`comment-${index}`}
                                                className={`${
                                                    loggedInUser.data.name === comment.created_by
                                                        ? 'self-end bg-primary/20 dark:bg-[#173d4d]'
                                                        : 'bg-white dark:bg-[#0e222b]'
                                                } apply-dark flex max-w-lg gap-x-2 rounded-lg border p-2`}
                                            >
                                                <div>
                                                    <Avatar
                                                        src={comment.image_user}
                                                        showFallback
                                                        name={comment.created_by}
                                                        size='sm'
                                                        color='primary'
                                                    />
                                                </div>

                                                <div className='flex w-full flex-col'>
                                                    <div className='flex items-center justify-between gap-x-4'>
                                                        <p className='text-xs text-secondary'>{comment.created_by}</p>

                                                        <div className='flex gap-x-1'>
                                                            <p className='text-[10px] text-primary'>
                                                                {comment.created_at}
                                                            </p>

                                                            {loggedInUser.data.name === comment.created_by && (
                                                                <DeleteCommentModal
                                                                    comment={comment}
                                                                    isOpen={isDeleteCommentModal}
                                                                    setIsOpen={setIsDeleteCommentModal}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <article
                                                        className='text-sm'
                                                        dangerouslySetInnerHTML={{ __html: comment.konten }}
                                                    ></article>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </ModalBody>

                            <ModalFooter className='flex items-end justify-between gap-2 border-t border-primary/25'>
                                <form
                                    className='w-full'
                                    id='add-comment'
                                    onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                                        setIsSendingComment(true)

                                        await addComment(searchParams.get('discussion_id') as string, e)

                                        setCommentsByDiscussion(
                                            await getCommentsByDiscussionId(
                                                '',
                                                searchParams.get('discussion_id') as string,
                                            ),
                                        )

                                        setIsSendingComment(false)
                                    }}
                                >
                                    <div className='flex items-center gap-x-2.5 py-2 pb-0 lg:px-8'>
                                        <div>
                                            <Avatar showFallback color='primary' name={loggedInUser.data.name} />
                                        </div>

                                        <Input
                                            classNames={{
                                                inputWrapper: 'border apply-dark',
                                            }}
                                            variant='bordered'
                                            radius='sm'
                                            labelPlacement='outside'
                                            name='content'
                                            placeholder='Berikan komentar...'
                                            isRequired
                                        />
                                    </div>
                                </form>

                                <Button
                                    type='submit'
                                    form='add-comment'
                                    color='primary'
                                    radius='sm'
                                    isLoading={isSendingComment}
                                >
                                    Kirim
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
