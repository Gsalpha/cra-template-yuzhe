import React from 'react'
import { Table as AntdTable } from 'antd'
import { TableProps } from 'antd/es/table'
import { Constants } from '@/store/constants'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@/store'
import { tableSlice } from '@/store/table'

export type Props<T> = Omit<TableProps<T>, 'pagination'> & {
    prefix: Constants
}

function Table<T extends object>(props: Props<T>) {
    const { prefix, ...rest } = props
    const dispatch = useDispatch()
    const pagination = useSelector((state: AppState) =>
        state.table[prefix] ? state.table[prefix]!.pagination : undefined
    )
    const handleChange = (page: number, pageSize: number | undefined) => {
        dispatch(
            tableSlice.actions.setPagination({
                prefix,
                pageSize: pageSize,
                current: page
            })
        )
    }
    return (
        <AntdTable<T>
            bordered
            {...rest}
            pagination={{
                ...pagination,
                showSizeChanger: true,
                onChange: handleChange,
                onShowSizeChange: handleChange
            }}
        />
    )
}

export default Table
