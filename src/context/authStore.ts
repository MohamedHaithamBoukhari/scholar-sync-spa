import createStore from 'react-auth-kit/createStore';
import createRefresh from 'react-auth-kit/createRefresh';
import axios from 'axios';

const refreshApi = createRefresh({
    interval: 20, // secondes
    refreshApiCallback: async ({refreshToken}) => {
        try {
            const res = await axios.post(import.meta.env.VITE_SCHOLAR_SYNC_URL +'/auth/refresh-token', {
              headers: {'Authorization': `Bearer ${refreshToken}`}
            });
            console.log("Refreshing")
            return {
                isSuccess: true,
                newAuthToken: res.data.accessToken,
                newAuthTokenExpireIn: 10,
            };
        } catch (err) {
            console.log(err);
            return {
                isSuccess: false,
                newAuthToken: '',
            };
        }
    }
});


const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: refreshApi
});


export default store;