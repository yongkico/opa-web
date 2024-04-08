'use client'

import React from 'react'
import { useTranslation } from '@/i18n/client'
import { switchLocaleAction } from '@/actions/switch-locale'
import { Select, SelectItem } from '@nextui-org/react'
import { getCookie } from '@/utils'

// We removed the `locale` prop because we can get it from the hook
export default function ChangeLocale() {
    const { i18n } = useTranslation('common')
    // You can also use our custom hook instead of `i18n.resolvedLanguage`
    // const locale = useLocale();

    return (
        <div className='min-w-[5rem]'>
            <Select
                onChange={(e) => switchLocaleAction(e.target.value)}
                classNames={{
                    listbox: 'dark:text-light',
                    trigger: 'border apply-dark',
                }}
                radius='sm'
                variant='bordered'
                labelPlacement='outside'
                value={i18n.resolvedLanguage}
                defaultSelectedKeys={[getCookie('preferred_language') || 'id']}
            >
                <SelectItem key='id' value='id'>
                    Id
                </SelectItem>

                <SelectItem key='en' value='en'>
                    En
                </SelectItem>
            </Select>
        </div>
    )
}
