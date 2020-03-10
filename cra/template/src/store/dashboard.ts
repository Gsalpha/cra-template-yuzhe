import { createSlice } from '@reduxjs/toolkit'

export interface LogUnit {
    id: number
    operator: number
    operatorName: string
    ip: string
    category: 1 | 2
    content: string
    created: string
}
export interface DashboardState {
    list: LogUnit[]
}
export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        list: []
    } as DashboardState,
    reducers: {}
})
