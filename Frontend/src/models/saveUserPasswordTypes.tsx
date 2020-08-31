export interface CallStatus {
    loading?: boolean
    success?: boolean
    code?: number
}

export interface User {
    username: string
    password: string
}

export interface saveUserPasswordAPI {
    callStatus?: CallStatus
    response?: User
}