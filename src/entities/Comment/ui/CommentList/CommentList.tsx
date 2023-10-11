import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Comment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

import { classNames } from '@/shared/lib/classNames/classNames'
import {VStack} from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
	CommentList.displayName = 'CommentList'
	const { className, isLoading, comments } = props
	const { t } = useTranslation()

	if (isLoading) {
		return (
			<VStack gap={'16'} max className={classNames('', {}, [className])}>
				<CommentCard isLoading/>
				<CommentCard isLoading/>
				<CommentCard isLoading/>
			</VStack>
		)
	}

	return (
		<VStack gap={'16'} max className={classNames('', {}, [className])}>
			{comments?.length
				? comments.map((comment) => (
					<CommentCard
						key={comment.id}
						isLoading={isLoading}
						comment={comment}
					/>
				))
				: <Text text={t('Комментарии отсутствуют')} />}
		</VStack>
	)
})
