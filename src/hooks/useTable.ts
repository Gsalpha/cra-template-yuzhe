import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { tableEffect } from '@/store/table'
import { Constants } from '@/store/constants'
import { AppState } from '@/store'
export const useTable = <T extends unknown>(url: string, prefix: Constants) => {
    const dispatch = useDispatch()
    const [selectedUnit, setSelectedUnit] = useState<T | undefined>(undefined)
    const { current, pageSize, loading, filter, sort } = useSelector(
        (state: AppState) => ({
            current: state.table[prefix]!.pagination.current,
            pageSize: state.table[prefix]!.pagination.pageSize,
            loading: state.loading[prefix],
            filter: state.table[prefix]!.filter,
            sort: state.table[prefix]!.sort
        }),
        shallowEqual
    )

    useEffect(() => {
        dispatch(tableEffect.fetchList<T>(url, prefix))
    }, [dispatch, prefix, url, current, pageSize, filter, sort])
    const list = useSelector(
        (state: AppState) => state.table[prefix]!.list as T[]
    )
    const handleEdit = (payload: { key: keyof T; value: any }) => {
        const { key, value } = payload
        const target = list.find(item => item[key] === value)
        setSelectedUnit(target)
    }
    return {
        list,
        selectedUnit,
        handleEdit,
        loading
    }
}
