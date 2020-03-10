import React, { FC, ReactElement } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export interface PageLoadingProps {
    loading: boolean
    children: ReactElement
}

export const PageLoading: FC<PageLoadingProps> = ({ loading, children }) => {
    return loading ? (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                zIndex: 999,
            }}
        >
            <LoadingOutlined style={{ fontSize: 60 }} />
        </div>
    ) : (
        children
    )
}
