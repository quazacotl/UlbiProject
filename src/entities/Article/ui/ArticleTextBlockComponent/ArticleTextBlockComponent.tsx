import { memo } from 'react'
import { ArticleTextBlock } from '../../model/types/article'
import cls from './ArticleTextBlockComponent.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
	ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent'
	const { className, block } = props

	return (
		<div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
			{block.title && (
				<Text title={block.title} className={cls.title} />
			)}
			{block.paragraphs.map((paragraph) => (
				<Text key={paragraph} text={paragraph} className={cls.paragraph} />
			))}
		</div>
	)
})
