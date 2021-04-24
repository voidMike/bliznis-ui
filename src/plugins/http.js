import axios from 'axios';

class Http {
	install(Vue) {
		//const vue = new Vue();
		axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
		Vue.prototype.$http = async function(options) {

			//axios.defaults.common['Authorization'] =
			return axios(options);
		}
	}
}

export default Http;