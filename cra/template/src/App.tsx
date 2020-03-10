import React from 'react'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { Router, Switch, Route } from 'react-router-dom'
import { history } from '@/lib/history'
import { AppRoutes } from '@/config/routes'

function App() {
    return (
        <ConfigProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    {AppRoutes.map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            render={props => (
                                <route.layout
                                    {...props}
                                    routes={route.routes}
                                />
                            )}
                        />
                    ))}
                </Switch>
            </Router>
        </ConfigProvider>
    )
}

export default App
