import { combineReducers, configureStore, Action } from '@reduxjs/toolkit'
import { globalSlice } from './global'
import { tableSlice } from './table'
import { dashboardSlice } from './dashboard'
import { ThunkAction } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { loadingSlice } from '@/store/loading'

const rootReducer = combineReducers({
    global: globalSlice.reducer,
    loading: loadingSlice.reducer,
    table: tableSlice.reducer,
    dashboard: dashboardSlice.reducer
})
export const store = configureStore({
    reducer: rootReducer
})
export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<T = void> = ThunkAction<T, AppState, null, Action<string>>
export const useThunkDispatch = () => useDispatch<AppDispatch>()
