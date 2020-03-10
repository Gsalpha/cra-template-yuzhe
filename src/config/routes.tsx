import { Route } from '@ant-design/pro-layout/lib/typings'
import { Dynamic } from '@/components/Dynamic'
import { DashboardOutlined } from '@ant-design/icons'
import React from 'react'
export interface AppRoute {
    path: string
    layout: any
    routes: Route[]
}
export interface LayoutProps {
    routes: Route[]
}

export const AppRoutes: AppRoute[] = [
    {
        path: '/login',
        layout: Dynamic(() => import('@/layouts/Blank')),
        routes: [
            {
                path: '/login',
                component: Dynamic(() => import('@/views/Login'))
            }
        ]
    },
    {
        path: '/',
        layout: Dynamic(() => import('@/layouts/Basic')),
        routes: [
            {
                path: '/',
                redirect: '/dashboard',
                hideInMenu: true
            },
            {
                name: '控制面板',
                icon: <DashboardOutlined />,
                path: '/dashboard',
                redirect: '/dashboard/table',
                children: [
                    {
                        name: '表单',
                        icon: <DashboardOutlined />,
                        path: '/dashboard/table',
                        component: Dynamic(() => import('@/views/Dashboard'))
                    }
                ]
            },
            {
                path: '/exception/403',
                component: Dynamic(() => import('@/views/Error/403'))
            },
            {
                path: '/exception/404',
                component: Dynamic(() => import('@/views/Error/404')),
                hideInMenu: true
            }
        ]
    }
]

export const AppAuthorityRoutesMap: { [propName: string]: string[] } = {
    test: ['/', '/dashboard', '/dashboard/table']
}
