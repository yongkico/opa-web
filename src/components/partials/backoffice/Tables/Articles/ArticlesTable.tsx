import { Article } from '@/@types/Article'
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
import DeleteArticleModal from '../../Modals/Articles/DeleteArticleModal'
import { articleStore } from '@/store/backoffice/articleStore'
import { DataResponse } from '@/@types'

type Props = {
    list: DataResponse<Article[]>
}

export default function ArticlesTable({ list }: Props): JSX.Element {
    // global states
    const { isFetching, articles } = articleStore()

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

                <TableColumn key='title'>Title</TableColumn>

                <TableColumn>Aksi</TableColumn>
            </TableHeader>

            <TableBody
                emptyContent='Tidak ada data'
                items={list.data}
                isLoading={isFetching}
                loadingContent={<Spinner />}
            >
                {list.data?.map((article: Article, index: number) => (
                    <TableRow key={`article-${index}`}>
                        <TableCell>{articles.pagination?.from! + index}</TableCell>

                        <TableCell>
                            <Avatar src={article.thumbnail_image_url} radius='sm' />
                        </TableCell>

                        <TableCell>{article.title}</TableCell>

                        <TableCell>
                            <div className='flex gap-x-2'>
                                <Button
                                    href={`/author/articles/edit/${article.id}`}
                                    as={Link}
                                    color='secondary'
                                    radius='sm'
                                    size='sm'
                                >
                                    Edit
                                </Button>

                                <DeleteArticleModal article={article} />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
