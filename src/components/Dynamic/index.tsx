import React, { useEffect, FC } from 'react'
import nprogress from 'nprogress'
import Loadable, { LoadingComponentProps } from 'react-loadable'

const Loading: FC<LoadingComponentProps> = () => {
    useEffect((): any => {
        nprogress.start()
        return nprogress.done
    }, [])
    return <></>
}
export const Dynamic = (loader: any) =>
    Loadable({
        loader,
        loading: Loading
    })
