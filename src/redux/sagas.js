import { jobsFlow } from "./reducer";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([jobsFlow])
}