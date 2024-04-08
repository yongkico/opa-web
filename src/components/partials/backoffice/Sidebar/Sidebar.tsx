import { Dispatch, JSX, SetStateAction } from 'react'
import { Roles } from '@/enums'
import AdminSidebar from './AdminSidebar'
import MemberSidebar from './MemberSidebar'
import AuthorSidebar from './AuthorSidebar'
import { userStore } from '@/store/userStore'

export default function Sidebar({
    isSidebarOpen,
    setIsSideBarOpen,
}: {
    isSidebarOpen: boolean
    setIsSideBarOpen: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
    // global states
    const { loggedInUser } = userStore()

    return (
        <>
            {loggedInUser.data?.role_name === Roles.ADMIN && (
                <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} />
            )}

            {loggedInUser.data?.role_name === Roles.MEMBER && (
                <MemberSidebar isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} />
            )}

            {loggedInUser.data?.role_name === Roles.AUTHOR && (
                <AuthorSidebar isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} />
            )}
        </>
    )
}
