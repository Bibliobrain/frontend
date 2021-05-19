import axios from 'axios';

const request = async function (options, isHeader = true) {

    let authHeader = null;
    if (isHeader) {
        authHeader = JSON.parse(localStorage.getItem('userData'));
    }

    // const url = 'http://bibliobrain.herokuapp.com'
    const url = "http://localhost:1433"

    const client = axios.create({
        baseURL: url,
        headers: { 'Authorization': "Bearer " + authHeader?.token }
    });

    const onSuccess = function (response) {
        //console.debug('Request Successful!', response);
        return response.data;
    }

    const onError = function (error) {
        console.debug('Request Failed:', error.config);

        if (error.response) {
            // console.debug('Status:', error.response.status);
            // console.debug('Data:', error.response.data);
            // console.debug('Headers:', error.response.headers);
        } else {
            // console.debug('Error Message:', error.message);
        }
        return Promise.reject(error.response?.data || error.message);
    }

    return client(options)
        .then(onSuccess)
        .catch(onError);
}

export default request;