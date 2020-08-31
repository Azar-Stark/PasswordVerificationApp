import * as a from '../actions/saveUserPasswordActions'
import * as r from './saveUserPasswordReducers'
import { Action } from "redux";
import { saveUserPasswordAPI } from '../models/saveUserPasswordTypes';

export interface AppState {
    saveUserPasswordAPI: saveUserPasswordAPI
}

let initialAppState: AppState = {
    saveUserPasswordAPI: undefined
}

const AppStateReducersMapping = {
    [a.BEGIN_SAVE_USER_PASSWORD]: r.beginSaveUserPasswordActionReducer,
    [a.FAILURE_SAVE_USER_PASSWORD]: r.saveUserPasswordFailureActionReducer,
    [a.SUCCESS_SAVE_USER_PASSWORD]: r.saveUserPasswordSuccessActionReducer
}

const saveUserPasswordAPI = (state = initialAppState, action: Action) => {
    const reducer = AppStateReducersMapping[action.type]
    if(reducer) {
        return reducer(state, action)
    }
    return state
  }

  export default saveUserPasswordAPI