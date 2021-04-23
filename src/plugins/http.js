import axios from 'axios';

class Http {
	install(Vue) {
		//const vue = new Vue();
		Vue.prototype.$http = async function(options) {

			//axios.defaults.common['Authorization'] =
			return axios(options);
		}
	}
}

export default Http;