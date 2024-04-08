'use client'

import { JSX } from 'react'
import { Editor, IAllProps } from '@tinymce/tinymce-react'

export default function TinyMceEditor(props: IAllProps): JSX.Element {
    return (
        <Editor
            apiKey='e97e248ffovhrrdmfnlnnwp80vhjgd1pjx3yfcpaxh65aagz'
            init={{
                branding: false,
                min_height: 420,
                skin: 'oxide-dark',
                content_style: `
                body { background-color: #EFEFEF; 
                    color: #1E1E1E;}
                `,
            }}
            plugins={[
                // 'a11ychecker',
                // 'advcode',
                // 'advtable',
                // 'checklist',
                // 'export',
                // 'powerpaste',
                // 'formatpainter',
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
            ]}
            {...props}
        />
    )
}
