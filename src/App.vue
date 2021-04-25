<template>
	<component :is="component"></component>
</template>

<script>
import Constrained from './layouts/Constrained';
import Landing from './layouts/Landing'

export default {
	name: 'App',

	components: {
		Constrained,
		Landing
	},

	data: () => ({
		//
	}),
	computed: {
		component() {
			return this.$route?.meta?.layout ?? 'Landing';
		}
	}
};
</script>
