import React, { FC, ReactNode, useState } from 'react'
import { Input } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { InputProps } from 'antd/es/input'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AppState } from '@/store'
import { Constants } from '@/store/constants'
import { tableSlice } from '@/store/table'

export interface FilterProps {
    name: string
    dataIndex: string
    render?: () => ReactNode
    sortable?: boolean
    prefix: Constants
}

export enum sortDirections {
    ascend = 'ascend',
    descend = 'descend'
}

export type sortDirectionsType = sortDirections | '' | undefined

export const InputFilter: FC<Omit<InputProps, 'prefix'> & {
    prefix: Constants
    name: string
}> = ({ prefix, name, ...rest }) => {
    const initialValue = useSelector(
        (state: AppState) => state.table[prefix]!.filter[name],
        shallowEqual
    )
    const [value, setValue] = useState(initialValue)
    const dispatch = useDispatch()
    return (
        <Input
            {...rest}
            size={'small'}
            value={value}
            onChange={ev => {
                setValue(ev.target.value)
            }}
            onPressEnter={() => {
                dispatch(
                    tableSlice.actions.setPagination({
                        prefix,
                        current: 1
                    })
                )
                dispatch(
                    tableSlice.actions.setFilter({
                        prefix,
                        key: name,
                        value
                    })
                )
            }}
        />
    )
}

export const Filter: FC<FilterProps> = ({
    name,
    prefix,
    dataIndex,
    render,
    sortable = false
}) => {
    const sortValue = useSelector(
        (state: AppState) => state.table[prefix]!.sort[dataIndex]
    )
    const dispatch = useDispatch()
    const handleChangeSort = (sortValue: sortDirectionsType) => {
        dispatch(
            tableSlice.actions.setSort({
                prefix,
                key: dataIndex,
                value: sortValue
            })
        )
    }
    return (
        <div style={{ minWidth: 140 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{name}</span>
                {sortable && (
                    <span
                        style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            marginLeft: '0.4em',
                            marginTop: '-0.4em'
                        }}
                    >
                        <CaretUpOutlined
                            onClick={() =>
                                handleChangeSort(sortDirections.ascend)
                            }
                            style={{
                                fontSize: 13,
                                color: '#bfbfbf',
                                height: '0.5em',
                                cursor: 'pointer',
                                ...(sortValue &&
                                sortValue === sortDirections.ascend
                                    ? {
                                          color: '#3f51b5'
                                      }
                                    : {})
                            }}
                        />
                        <CaretDownOutlined
                            onClick={() =>
                                handleChangeSort(sortDirections.descend)
                            }
                            style={{
                                fontSize: 13,
                                color: '#bfbfbf',
                                height: '0.5em',
                                cursor: 'pointer',
                                marginTop: '0.125em',
                                ...(sortValue &&
                                sortValue === sortDirections.descend
                                    ? {
                                          color: '#3f51b5'
                                      }
                                    : {})
                            }}
                        />
                    </span>
                )}
            </div>
            {render && <div style={{ marginTop: '0.3em' }}>{render()}</div>}
        </div>
    )
}
