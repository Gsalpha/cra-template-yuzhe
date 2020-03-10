import React, { FC, useMemo } from 'react'
import { flatRoutes } from '@/lib/routes'
import { LayoutProps } from '@/config/routes'
import { Redirect, Route } from 'react-router-dom'
const BlankLayout: FC<LayoutProps> = ({ routes }) => {
    const renderRoutes = useMemo(
        () =>
            flatRoutes(routes).map(route => {
                if (route.redirect) {
                    return (
                        <Redirect
                            from={route.path}
                            to={route.redirect}
                            key={route.path}
                            exact
                        />
                    )
                }
                if (route.component) {
                    return (
                        <Route
                            path={route.path}
                            exact
                            key={route.path}
                            component={route.component}
                        />
                    )
                }
                return null
            }),
        [routes]
    )
    return <>{renderRoutes}</>
}
export default BlankLayout
