export default [
	{
		path: '/search',
		name: 'Pretraga',
		component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
	},
	{
		path: '/categories',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
]