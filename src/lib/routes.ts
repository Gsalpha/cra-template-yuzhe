import { Route, MenuDataItem } from '@ant-design/pro-layout/lib/typings'
import { AppAuthorityRoutesMap, AppRoutes } from '@/config/routes'

export const flatRoutes = (routes: Route[]) => {
    let result: Route[] = []
    routes.forEach(item => {
        result.push(item)
        if (item.children && item.children.length) {
            result = result.concat(flatRoutes(item.children))
        }
    })
    return result
}

export const getRoutesByAuthority = (authority: string[]): string[] => {
    let routes: string[] = []
    for (let route of authority) {
        if (AppAuthorityRoutesMap[route]) {
            routes = [...routes, ...AppAuthorityRoutesMap[route]]
        }
    }
    return Array.from(new Set(routes))
}

const formatMenu = (routes: Route[]) =>
    routes
        .filter(route => !route.hideInMenu)
        .map(route => formatSubMenu(route))
        .filter(route => route)

const formatSubMenu = (route: Route): Route => {
    if (route.children && route.children.length && !route.hideInMenu) {
        return {
            ...route,
            children: formatMenu(route.children)
        }
    }
    return route
}

const filterMatchedRoutes = (
    routes: Route[],
    mapping: { [propName: string]: true }
) => {
    let matches: Route[] = [...routes]
    let matchSpliceList: string[] = []

    if (mapping['**']) {
        return matches
    }
    matches.forEach(route => {
        const currentRoute = `${route.path}`
        if (mapping[currentRoute] && route) {
            if (route.children && route.children.length) {
                route.children = [
                    ...filterMatchedRoutes(route.children, mapping)
                ]
            }
        } else {
            if (route.children && route.children.length) {
                route.children = [
                    ...filterMatchedRoutes(route.children, mapping)
                ]
                if (!route.children.length) {
                    matchSpliceList.push(route.path!)
                }
            } else {
                matchSpliceList.push(route.path!)
            }
        }
    })
    matchSpliceList.forEach(l => {
        const index = matches.findIndex(re => re.path === l)
        if (index > -1) {
            matches.splice(index, 1)
        }
    })

    return matches
}

export const getMatchedMenusByAuthorityRoutes = (
    authorityRoutes: string[]
): MenuDataItem[] => {
    const mapping: { [propName: string]: true } = {}
    for (let route of authorityRoutes) {
        mapping[route] = true
    }
    const flatAllAppRoutes = () => {
        let ary: Route[] = []
        AppRoutes.forEach(route => {
            if (route.routes) {
                route.routes.forEach(_ => {
                    ary.push(_)
                })
            }
        })
        return ary
    }
    return filterMatchedRoutes(formatMenu(flatAllAppRoutes()), mapping)
}
