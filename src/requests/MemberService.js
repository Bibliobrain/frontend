import request from './Request';

const MemberService = {
    register: (params) => {
        return request({
            url: `/members`,
            data:params,
            method: 'POST',
        })
    },
}

export default MemberService;