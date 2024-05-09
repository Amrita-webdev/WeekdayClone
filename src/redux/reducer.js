import { createSlice, createAction } from '@reduxjs/toolkit'
import { call, all, put } from 'redux-saga/effects'

const prefix = 'jobs'

export const initialState = {
    loading: true,
    jobs: [],
    page: 0
}

const jobsSlice = createSlice ({
    name: prefix,
    initialState,
    reducers: {
        setLoading(state, action){
            state.loading = action.payload
        },
        setJobs(state, action){
            state.jobs = action.payload
        },
        setPage(state, action){
            state.page = action.payload
        }
    }
})

export const actions = jobsSlice.actions

export default jobsSlice.reducer

export function* jobsFlow() {
}

export function* jobsSaga() {
    yield all({
        jobsFlow
    })
}