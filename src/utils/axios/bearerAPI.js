import axios from 'axios';
import jwt from 'jsonwebtoken';
import { parseInteger } from 'utils/common';
import basicAuthAPI from 'utils/axios/basicAuthAPI';
import { ACCESS_TOKEN_EXPIRY_TIME, IDLE_TIME_LIMIT } from 'utils/constans'
import { BE_MS_AUTH } from 'constants/deps';
import store from '../../store';
// import { setNewToken, setIdleTime } from 'store/modules/token/actions'

const bearerAPI = axios.create({
    timeout: 30000
});

/**
 * @param {*} config - axios request config
 * @returns {Promise<>} resolved promise
 */
bearerAPI.interceptors.request.use(async config => {
    const startTime = new Date();

    const callRefreshToken = async () => {
        // Call refresh token
        return await basicAuthAPI({
            method: 'POST',
            url: BE_MS_AUTH + '/v1/oauth2/token',
            data: {
                grant_type: 'refresh_token',
                refresh_token: store.getState().token.refreshToken,
                scope: config.url.match(/healthcheck/g) ? undefined : 'web offline_access'
            }
        }).then(response => {
            const accessToken = response.data.access_token;
            const newRefreshToken = response.data.refresh_token;
            const decodedToken = jwt.decode(accessToken);
            const exp = decodedToken.exp;
            store.dispatch(setNewToken({ accessToken, refreshToken: newRefreshToken, exp }));

            const endTime = new Date();

            let idleTime = config.url.match(/healthcheck/g) ? parseInteger(store.getState().token.idleTime) + endTime.getTime() - startTime.getTime() + parseInteger(ACCESS_TOKEN_EXPIRY_TIME) : 0;
            console.log(idleTime);
            store.dispatch(setIdleTime(idleTime));

            config.headers.authorization = `bearer ${accessToken}`;
            return config;
        }).catch(error => {
            console.error(error.message);
            if (error.response) {
                if (error.response.status === 403) {
                    window.alert('Anda telah idle selama lebih dari 30 menit, harap login kembali');
                    return Promise.reject(new Error('Session expired'));
                }
                return Promise.reject(new Error('Session expired'));
            }

            return Promise.reject(new Error(error.message));
        })
    }

    if (!store.getState().token.accessToken) {
        return Promise.reject(new Error('Invalid session'))
    }

    if (store.getState().token.idleTime > parseInteger(IDLE_TIME_LIMIT) && !config.url.match(/healthcheck/g)) {
        return await callRefreshToken();
    };

    if (new Date() - (parseInteger(store.getState().token.exp) * 1000) > 0) { // Convert jwt expiry time to miliseconds since epoch
        return await callRefreshToken();
    }

    const endTime = new Date();

    let idleTime = config.url.match(/healthcheck/g) ? parseInteger(store.getState().token.idleTime) + endTime.getTime() - startTime.getTime() + parseInteger(ACCESS_TOKEN_EXPIRY_TIME) : 0;
    store.dispatch(setIdleTime(idleTime));

    config.headers.authorization = `bearer ${store.getState().token.accessToken}`;
    return config;
})

export default bearerAPI;