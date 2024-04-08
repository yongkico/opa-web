import { News } from '@/@types/News'
import {
    Avatar,
    Button,
    Link,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react'
import { JSX } from 'react'
import DeleteNewsModal from '../../Modals/News/DeleteNewsModal'
import { newsStore } from '@/store/backoffice/newsStore'
import { DataResponse } from '@/@types'

type Props = {
    list: DataResponse<News[]>
}

export default function NewsTable({ list }: Props): JSX.Element {
    // global states
    const { isFetching, news } = newsStore()

    return (
        <Table
            aria-label='Harvest Table'
            classNames={{
                wrapper: 'p-4 lg:p-8 rounded-lg shadow-none apply-dark',
                th: 'bg-primary text-white text-base',
                td: 'text-base py-4',
                sortIcon: 'text-white',
            }}
        >
            <TableHeader>
                <TableColumn>No</TableColumn>

                <TableColumn key='thumbnail_image_url'>Thumbnail</TableColumn>

                <TableColumn key='title' allowsSorting>
                    Title
                </TableColumn>

                <TableColumn>Aksi</TableColumn>
            </TableHeader>

            <TableBody
                emptyContent='Tidak ada data'
                items={list.data}
                isLoading={isFetching}
                loadingContent={<Spinner />}
            >
                {list.data?.map((singleNews: News, index: number) => (
                    <TableRow key={`news-${index}`}>
                        <TableCell>{news.pagination?.from! + index}</TableCell>

                        <TableCell>
                            <Avatar src={singleNews.thumbnail_image_url} radius='sm' />
                        </TableCell>

                        <TableCell>{singleNews.title}</TableCell>

                        <TableCell>
                            <div className='flex gap-x-2'>
                                <Button
                                    href={`/author/news/edit/${singleNews.id}`}
                                    as={Link}
                                    color='secondary'
                                    radius='sm'
                                    size='sm'
                                >
                                    Edit
                                </Button>

                                <DeleteNewsModal news={singleNews} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
