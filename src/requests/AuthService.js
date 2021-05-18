import request from './Request';

const AuthService = {

    login: (ssn, password) => {
        return request({
            url: `/auth/login`,
            method: 'POST',
            data: { ssn, password }
        })
    },
    refreshToken: (refreshToken) => {
        return request({
            url: `/auth/token`,
            method: 'POST',
            data: { refreshToken }
        })
    }
}

export default AuthService;