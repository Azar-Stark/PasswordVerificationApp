import { Action, Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { saveUserPasswordAPI } from '../models/saveUserPasswordTypes'

export const BEGIN_SAVE_USER_PASSWORD = "VerificationPasswordApp/BEGIN_SAVE_USER_PASSWORD"
export const SUCCESS_SAVE_USER_PASSWORD = "VerificationPasswordApp/SUCCESS_SAVE_USER_PASSWORD"
export const FAILURE_SAVE_USER_PASSWORD = "VerificationPasswordApp/FAILURE_SAVE_USER_PASSWORD"

export const beginSaveUserPasswordAction: Action = {
    type: BEGIN_SAVE_USER_PASSWORD
}

export interface saveUserPasswordSuccessAction extends Action {
    payload?: saveUserPasswordAPI;
}

export interface saveUserPasswordFailureAction extends Action {
    payload?: saveUserPasswordAPI;
}

export const saveUserPasswordSuccessAction = (data?: saveUserPasswordAPI | undefined): saveUserPasswordSuccessAction => {
    return {
        type: SUCCESS_SAVE_USER_PASSWORD,
        payload: data
    } as saveUserPasswordSuccessAction
}

export const saveUserPasswordFailureAction = (data: saveUserPasswordAPI): saveUserPasswordFailureAction => {
    return {
        type: FAILURE_SAVE_USER_PASSWORD,
        payload: data
    } as saveUserPasswordFailureAction
}


export const saveUserPassword = (dispatch: Dispatch<any>, username: string, requestPayload: string): Promise<AxiosResponse> => {
    const url = `http://localhost:8081/saveUserPassword/users/update/${username}`
    const data = { password: requestPayload }

    dispatch(beginSaveUserPasswordAction)
    return axios.put(url, data).then(
        response => {
            let saveUserPasswordResponse = response.data
            dispatch(saveUserPasswordSuccessAction(saveUserPasswordResponse))
            return response
        }
    )
        .catch(
            error => {
                dispatch(saveUserPasswordFailureAction(error.response ? error.response.data ? error.response.data : { message: error.response } : { message: error }))
                return new Promise((resolve, reject) => reject(error))
            }
        )
}

