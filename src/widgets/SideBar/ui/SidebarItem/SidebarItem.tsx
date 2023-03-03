import cls from './SidebarItem.module.scss'
import {AppLink, AppLinkTheme} from 'shared/ui/AppLink/AppLink'
import React, {memo} from 'react'
import {useTranslation} from 'react-i18next'
import {SidebarItemType} from 'widgets/SideBar/model/items'
import {classNames} from 'shared/lib/classNames/classNames'

interface SidebarItemProps {
    item: SidebarItemType
	collapsed: boolean
}
export const SidebarItem = memo((props: SidebarItemProps) => {
	SidebarItem.displayName = 'SidebarItem'
	const {item, collapsed} = props
	const {t} = useTranslation()

	return (
		<AppLink theme={AppLinkTheme.INVERTED} to={item.path} className={classNames(cls.item, {[cls.collapsed]: collapsed})}>
			<item.Icon className={cls.icon}/>
			<span className={cls.linkName}>{t(item.text)}</span>
		</AppLink>
	)
})