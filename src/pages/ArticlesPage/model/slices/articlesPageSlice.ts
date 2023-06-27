import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit'

import {StateSchema} from 'app/providers/StoreProvider'
import {Article, ArticleSortField, ArticleView} from 'entities/Article'
import {ArticlesPageSchema} from '../types/articlesPageSchema'
import {fetchArticlesList} from '../../model/services/fetchArticlesList/fetchArticlesList'
import {VIEW_LOCALSTORAGE_KEY} from 'shared/const/localStorage'
import {SortOrder} from 'shared/types'
import {ArticleType} from 'entities/Article/model/consts/articleConsts'


const articlesAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState(),
)

const articlesPageSlice = createSlice({
	name: 'articlesPage',
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: true,
		error: undefined,
		ids: [],
		entities: {},
		view: ArticleView.BIG,
		page: 1,
		hasMore: true,
		_inited: false,
		search: '',
		limit: 9,
		order: 'desc',
		sort: ArticleSortField.CREATED,
		type: ArticleType.ALL
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload
			localStorage.setItem(VIEW_LOCALSTORAGE_KEY, action.payload)
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		setOrder: (state, action: PayloadAction<SortOrder>) => {
			state.order = action.payload
		},
		setSort: (state, action: PayloadAction<ArticleSortField>) => {
			state.sort = action.payload
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},
		setType: (state, action: PayloadAction<ArticleType>) => {
			state.type = action.payload
		},
		initState: (state) => {
			const view = localStorage.getItem(VIEW_LOCALSTORAGE_KEY) as ArticleView
			state.view = view
			state.limit = view === ArticleView.BIG ? 4 : 9
			state._inited = true
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticlesList.pending, (state, action) => {
				state.error = undefined
				state.isLoading = true
				if (action.meta.arg.replace) {
					articlesAdapter.removeAll(state)
				}
			})
			.addCase(fetchArticlesList.fulfilled, (
				state,
				action,
			) => {
				state.isLoading = false
				state.hasMore = action.payload.length >= state.limit

				if (action.meta.arg.replace) {
					articlesAdapter.setAll(state, action.payload)
				} else {
					articlesAdapter.addMany(state, action.payload)
				}
			})
			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	},
})

export const { reducer: articlesPageReducer, actions: articlesPageActions } = articlesPageSlice
