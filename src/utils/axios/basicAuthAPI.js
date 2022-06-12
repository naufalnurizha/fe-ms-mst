import axios from 'axios';

const basicAuthAPI = axios.create({
    auth: {
        username: 'fJsBhQPQ66Vfjy1a',
        password: '5XPxm8vsZpxXJtrJ'
    },
    config: {
        headers: {
            'Content-Type': 'application/json'
        }
    },
    timeout: 30000
});

export default basicAuthAPI;