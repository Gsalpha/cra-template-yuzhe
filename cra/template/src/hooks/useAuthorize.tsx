import React, { useEffect, useMemo } from 'react'
import {
    flatRoutes,
    getMatchedMenusByAuthorityRoutes,
    getRoutesByAuthority
} from '@/lib/routes'
import { Redirect, Switch } from 'react-router-dom'
import Authorized from '@/components/Authorized'
import { shallowEqual, useSelector } from 'react-redux'
import { globalEffects } from '@/store/global'
import { AppState, useThunkDispatch } from '@/store'
import { Route } from '@ant-design/pro-layout/lib/typings'

export const useAuthorize = (routes: Route[]) => {
    const thunkDispatch = useThunkDispatch()
    const { loading, authority } = useSelector(
        (state: AppState) => ({
            loading: state.loading.authorize!,
            authority: state.global.authority
        }),
        shallowEqual
    )
    useEffect(() => {
        thunkDispatch(globalEffects.authorize()).catch(() => {})
    }, [thunkDispatch])
    const authRoutes = useMemo(() => getRoutesByAuthority(authority), [
        authority
    ])
    const authMenus = useMemo(
        () => getMatchedMenusByAuthorityRoutes(authRoutes),
        [authRoutes]
    )
    const renderRoutes = useMemo(() => {
        return (
            <Switch>
                {flatRoutes(routes)
                    .map(route => {
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
                                <Authorized
                                    isAuthorized={authRoutes.includes(
                                        route.path!
                                    )}
                                    component={route.component}
                                    path={route.path}
                                    key={route.path}
                                    loading={loading}
                                    exact
                                />
                            )
                        }

                        return null
                    })
                    .concat(
                        <Redirect to="/exception/404" key={`origin-redirect`} />
                    )}
            </Switch>
        )
    }, [authRoutes, loading, routes])
    return {
        renderRoutes, authMenus
    }
}
