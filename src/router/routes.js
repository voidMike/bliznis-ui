export default [
	{
		path: '/',
		name: 'Landing',
		component: () => import(/* webpackChunkName: "landing" */ '../views/LandingSearch'),
		meta: {
			nav: false,
			layout: 'Landing'
		}
	},
	{
		path: '/search',
		name: 'Pretraga',
		component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
		meta: {
			nav: true
		}
	},
	{
		path: '/categories',
		name: 'Kategorije',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
		meta: {
			nav: true
		}
	},
	{
		path: '/company/',
		name: 'Kompanija',
		component: () => import(/* webpackChunkName: "about" */ '../views/Company')
	}
]