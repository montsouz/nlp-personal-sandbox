import axios from 'axios';

const instance = axios.create({
    baseURL: "http://api.datumbox.com/1.0/",
    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': '*/*'
    }
});

export default instance