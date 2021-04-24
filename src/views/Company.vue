<template>
	<v-row justify="center">
		<v-col cols="auto">
			<v-sheet
				min-height="70vh"
				max-width="1200px"
				rounded="lg"
				class="overflow-hidden"
			>
			<v-progress-linear indeterminate :active="loading" height="8"/>
			<v-row no-gutters class="pa-4" justify="center">
				<v-col cols="6">
				</v-col>
			</v-row>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>

export default {
	name: 'company',
	data() {
		return {
			loading: false
		};
	},
	created() {
	},
	watch: {

	},
	methods: {
	}
}
</script>