<template>
	<component :is="component"></component>
</template>

<script>
import Constrained from './layouts/Constrained';

export default {
	name: 'App',

	components: {
		Constrained,
	},

	data: () => ({
		//
	}),
	computed: {
		component() {
			return 'Constrained';
		}
	}
};
</script>
