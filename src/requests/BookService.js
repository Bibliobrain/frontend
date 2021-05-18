import request from './Request';

const BookService = {
    filter: (pageNumber, language, binding) => {
        return request({
            url: `/api/books?pageNumber=${pageNumber}&language=${language}&bindingType=${binding}`,
            method: 'GET',
        })
    }
}

export default BookService;