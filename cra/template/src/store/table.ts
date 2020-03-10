import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Constants } from '@/store/constants'
import { AppThunk } from '@/store'
import { globalApi } from '@/api/global'
import { setLoading } from '@/store/loading'

export interface Pagination {
    total: number
    pageSize: number
    current: number
}

export type TableState = {
    [P in Constants]?: {
        list: any
        pagination: Pagination
        filter: {
            [propName: string]: any
        }
        sort: {
            [propName: string]: any
        }
    }
}
const init = () => ({
    list: [],
    pagination: {
        pageSize: 10,
        total: 0,
        current: 1
    },
    filter: {},
    sort: {}
})
export const tableSlice = createSlice({
    name: 'table',
    initialState: {
        dashboard: init()
    } as TableState,
    reducers: {
        setList: <T extends unknown>(
            state: TableState,
            action: PayloadAction<{ prefix: Constants; list: T[] }>
        ) => {
            const { payload } = action
            if (state[payload.prefix]) {
                state[payload.prefix]!.list = payload.list
            }
        },
        setFilter(
            state,
            action: PayloadAction<{
                key: string
                value: any
                prefix: Constants
            }>
        ) {
            const { payload } = action
            if (!payload.value) {
                delete state[payload.prefix]!.filter[payload.key]
            } else {
                state[payload.prefix]!.filter = {
                    ...state[payload.prefix]!.filter,
                    [payload.key]: payload.value
                }
            }
        },
        setSort(
            state,
            action: PayloadAction<{
                key: string
                value: any
                prefix: Constants
            }>
        ) {
            const { payload } = action
            state[payload.prefix]!.sort = { [payload.key]: payload.value }
        },
        setPagination(
            state,
            action: PayloadAction<Partial<Pagination> & { prefix: Constants }>
        ) {
            const {
                payload: { pageSize, current, total, prefix }
            } = action
            if (state[prefix]) {
                if (pageSize) {
                    state[prefix]!.pagination.pageSize = pageSize
                }
                if (current) {
                    state[prefix]!.pagination.current = current
                }
                if (typeof total !== 'undefined') {
                    state[prefix]!.pagination.total = total
                }
            }
        }
    }
})

export const tableEffect = {
    fetchList: <T extends unknown>(
        url: string,
        prefix: Constants
    ): AppThunk => async (dispatch, getState) => {
        const state = getState()
        const { pageSize, current } = state.table[prefix]!.pagination
        const filter = state.table[prefix]!.filter
        const sort = state.table[prefix]!.sort
        const sortKeys = Object.keys(sort)

        dispatch(setLoading([prefix, true]))
        try {
            const { data } = await globalApi.fetchTableDataSource<T>(url, {
                pageSize,
                current,
                ...(filter || {}),
                ...(sortKeys.length
                    ? {
                          sortKey: sortKeys[0],
                          sortValue: sort[sortKeys[0]]
                      }
                    : {})
            })
            dispatch(
                tableSlice.actions.setPagination({
                    prefix,
                    total: data.total
                })
            )
            dispatch(
                tableSlice.actions.setList({
                    prefix,
                    list: data.data
                })
            )
            dispatch(setLoading([prefix, false]))
        } catch (e) {
            dispatch(setLoading([prefix, false]))
        }
    }
}
