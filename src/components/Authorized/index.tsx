import React, { FC, memo } from 'react'
import {
    Redirect,
    Route,
    RouteComponentProps,
    RouteProps
} from 'react-router-dom'
import { hasToken } from '@/lib'

export interface AuthorizedProps extends RouteProps {
    isAuthorized: boolean
    loading: boolean
}

const Authorized: FC<AuthorizedProps> = ({
    isAuthorized,
    component,
    loading,
    ...rest
}) => {
    const Component = component as
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) => {
                if (!hasToken()) {
                    return <Redirect to="/login" />
                }
                if (loading) {
                    return null
                }
                if (props.location.pathname.indexOf('exception') > -1) {
                    return <Component {...props} />
                }
                return isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/exception/403" />
                )
            }}
        />
    )
}
export default memo(Authorized)
