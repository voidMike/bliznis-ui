<template>
	<v-card>
		<div class="d-flex flex-no-wrap justify-space-between">
			<v-col cols="4">
				<v-img
					class="rounded"
					height="250"
					src="https://picsum.photos/374/250"
				></v-img>
			</v-col>
			<v-col>
				<v-card-title>{{title}}</v-card-title>
				<v-card-subtitle>{{category}}</v-card-subtitle>
				<v-card-text>
					<v-row
						align="center"
						class="mx-0 mb-0"
					>
						<v-rating
							:value="rating"
							color="amber"
							dense
							half-increments
							readonly
							size="14"
						></v-rating>
					</v-row>
					<v-row
						align="center"
						class="mx-0 mb-0">
						{{description}}
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-btn
						text
					>
						Pogledaj
					</v-btn>
				</v-card-actions>
			</v-col>
		</div>
	</v-card>
</template>

<script>
export default {
	name: 'biz-card',
	props: {
		id: {
			type: Number,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		category: {
			type: String
		},
		rating: {
			type: Number
		},
		description: {
			type: String,
			default: 'Opis kompanije'
		}
	}
}
</script>