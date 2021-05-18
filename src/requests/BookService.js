import request from './Request';

const BookService = {
    filter: (params) => {
        return request({
            url: `/books`,
            params:params,
            method: 'GET',
        })
    }
}

export default BookService;