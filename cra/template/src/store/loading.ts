import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Constants } from './constants'

export type LoadingState = {
    [P in Constants]?: boolean
}
export type payload = [Constants, boolean]

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        login: false,
        authorize: true
    } as LoadingState,
    reducers: {
        set(state, action: PayloadAction<payload>) {
            const { payload } = action
            state[payload[0]] = payload[1]
        }
    }
})

export const setLoading = loadingSlice.actions.set
