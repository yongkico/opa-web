import { JSX } from 'react'
import { Discussion } from '@/@types/Group'
import { Avatar } from '@nextui-org/react'
import AddCommentModal from '../Modals/Groups/AddCommentModal'
import DiscussionSettingDropdown from '../Dropdowns/Group/DiscussionSettingDropdown'

type Props = {
    discussion: Discussion
}

export default function CardThread({ discussion }: Props): JSX.Element {
    return (
        <div className='apply-dark my-4 flex flex-col items-start gap-y-4 rounded-lg border bg-white p-4 shadow'>
            <div className='flex w-full items-center justify-between gap-x-4'>
                <div className='flex items-center gap-x-2.5'>
                    <Avatar
                        name={discussion.created_by}
                        src={discussion.image_user}
                        color='primary'
                        size='sm'
                        showFallback
                    />

                    <div>
                        <p className='font-semibold'>{discussion.created_by || 'User Name'}</p>

                        <p className='text-xs text-secondary'>{discussion.created_at || ''}</p>
                    </div>
                </div>

                <DiscussionSettingDropdown selectedDiscussion={discussion} />
            </div>

            <div className='space-y-4'>
                <div className='space-y-2'>
                    <div dangerouslySetInnerHTML={{ __html: discussion.konten }}></div>
                </div>

                <AddCommentModal discussion={discussion} />
            </div>
        </div>
    )
}
