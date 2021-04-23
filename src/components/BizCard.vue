<template>
	<v-card max-width="374">
		<v-img
			height="250"
			src="https://picsum.photos/374/250"
		></v-img>

		<v-card-title>{{title}}</v-card-title>
		<v-card-subtitle>{{category}}</v-card-subtitle>
		<v-card-text>
			<v-row
				align="center"
				class="mx-0 mb-0"
			>
				<v-rating
					:value="4.5"
					color="amber"
					dense
					half-increments
					readonly
					size="14"
				></v-rating>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: 'biz-card',
	props: {
		title: {
			type: String,
			required: true
		},
		category: {
			type: String
		}
	}
}
</script>