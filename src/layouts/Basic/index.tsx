import React, { FC, memo } from 'react'
import { PageLoading } from '@/components/PageLoading'
import { useSelector } from 'react-redux'
import { AppState } from '@/store'
import { useAuthorize } from '@/hooks/useAuthorize'
import { RouteComponentProps, Link } from 'react-router-dom'
import { LayoutProps } from '@/config/routes'
import {
    BasicLayout as AntdBasicLayout,
    PageHeaderWrapper
} from '@ant-design/pro-layout'
type BasicLayoutProps = LayoutProps & RouteComponentProps

const BasicLayout: FC<BasicLayoutProps> = ({ routes }) => {
    const loading = useSelector((state: AppState) => state.loading.authorize!)
    const { renderRoutes, authMenus } = useAuthorize(routes)
    return (
        <PageLoading loading={loading}>
            <AntdBasicLayout
                menuDataRender={() => authMenus}
                menuItemRender={props => {
                    return (
                        <Link to={props.path!}>
                            {props.icon}
                            {props.name}
                        </Link>
                    )
                }}
            >
                <PageHeaderWrapper title={false}>
                    {renderRoutes}
                </PageHeaderWrapper>
            </AntdBasicLayout>
        </PageLoading>
    )
}
export default memo(BasicLayout)
