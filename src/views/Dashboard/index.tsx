import React from 'react'
import { LogUnit } from '@/store/dashboard'
import { Constants } from '@/store/constants'
import { ColumnProps } from 'antd/es/table'
import Table from '@/components/Table'
import { useTable } from '@/hooks/useTable'
import { Button } from 'antd'
import { Filter, InputFilter } from '@/components/Table/Filter'

const Page = () => {
    const { list, loading, handleEdit } = useTable<LogUnit>(
        '/operation/logs',
        Constants.dashboard
    )
    const columns: ColumnProps<LogUnit>[] = [
        {
            dataIndex: 'created',
            title: '操作时间'
        },
        {
            dataIndex: 'operatorName',
            title: 'sd'
        },
        {
            dataIndex: 'ip',
            title: '操作IP'
        },
        {
            dataIndex: 'category',
            title: 'sd'
        },
        {
            dataIndex: 'content',
            title: (
                <Filter
                    prefix={Constants.dashboard}
                    sortable
                    name="内容"
                    dataIndex="content"
                    render={() => (
                        <InputFilter
                            prefix={Constants.dashboard}
                            name="content"
                        />
                    )}
                />
            )
        },
        {
            dataIndex: '操作',
            title: '操作',
            render(text, raw) {
                return (
                    <Button
                        onClick={() =>
                            handleEdit({
                                key: 'id',
                                value: raw.id
                            })
                        }
                    >
                        编辑
                    </Button>
                )
            }
        }
    ]
    return (
        <>
            <Table<LogUnit>
                prefix={Constants.dashboard}
                columns={columns}
                dataSource={list}
                loading={loading}
                rowKey={unit => '' + unit.id}
            />
        </>
    )
}
export default Page
