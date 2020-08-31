import { saveUserPasswordAPI } from "../models/saveUserPasswordTypes"
import { Reducer } from "redux"
import  * as _ from "lodash"

export const beginSaveUserPasswordActionReducer = (state, action):Reducer<saveUserPasswordAPI> => {
  let newState = _.assign({}, state)
  newState.callStatus = _.assign(_.assign({}, newState.callStatus), { loading: true })
  return newState
}

export const saveUserPasswordSuccessActionReducer = (state, action):Reducer<saveUserPasswordAPI> => {
  let _action = action
  let newState = _.assign(_.assign({}, state), { response: _.get(_action, 'payload')})
  newState.callStatus = _.assign(_.assign({}, newState.callStatus), { loading: false, success: true})
  return newState
}

export const saveUserPasswordFailureActionReducer = (state, action):Reducer<saveUserPasswordAPI> => {
  let _action = action
  let newState = _.assign({}, state)
  newState.callStatus = _.assign(_.assign({}, newState.callStatus), { loading: false, success: false, code: _.get(_action, 'payload.code'), message: _.get(_action, 'payload.message', _action.payload)})
  return newState
}
  