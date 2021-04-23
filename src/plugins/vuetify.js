import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@fontsource/roboto/latin.css';
import '@mdi/font/scss/materialdesignicons.scss';
import colors from 'vuetify/lib/util/colors';
//import colors from 'vuetify/lib/util/colors';
Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: colors.blue.lighten1
			}
		}
	}
});
