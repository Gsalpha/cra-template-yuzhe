import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '@/store/index'
import { globalApi, LoginReq } from '@/api/global'
import { setLoading } from '@/store/loading'
import { Constants } from '@/store/constants'

export interface GlobalState {
    authority: string[]
    username: string | null
    uid: string | null
}

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        authority: [],
        uid: null,
        username: null
    } as GlobalState,
    reducers: {
        set(state, action: PayloadAction<GlobalState>) {
            const { payload } = action
            state.authority = payload.authority
            state.uid = payload.uid
            state.username = payload.username
        }
    }
})

export const globalEffects = {
    login: (payload: LoginReq): AppThunk<Promise<void>> => async dispatch => {
        dispatch(setLoading([Constants.login, true]))
        try {
            const {
                data: { token }
            } = await globalApi.login(payload)
            localStorage.setItem('token', token)
            dispatch(setLoading([Constants.login, false]))
            window.location.href = '/'
        } catch (e) {
            dispatch(setLoading([Constants.login, false]))
        }
    },
    authorize: (): AppThunk<Promise<void>> => async dispatch => {
        dispatch(setLoading([Constants.authorize, true]))
        try {
            const { data } = await globalApi.authorize()
            dispatch(globalSlice.actions.set(data))
            dispatch(setLoading([Constants.authorize, false]))
        } catch (e) {
            dispatch(
                globalSlice.actions.set({
                    username: null,
                    uid: '',
                    authority: ['test']
                })
            )
            localStorage.removeItem('token')
            dispatch(setLoading([Constants.authorize, false]))
            throw e
        }
    }
}
