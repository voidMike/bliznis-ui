<template>
	<v-card>
		<v-row class="pa-0" no-gutters>
			<v-col cols="12" md="4">
				<v-img
					class="rounded ma-2"
					height="250"
					src="https://picsum.photos/374/250"
				></v-img>
			</v-col>
			<v-col>
				<router-link class="custom-link" tag="div" :to="{name:'Kompanija', params:{id:id}}">
					<v-card-title style="max-width:80%; word-break:break-word;" class="text-h4">{{title}}</v-card-title>
					<v-divider/>
					<v-card-subtitle class="pt-2 pb-0 text-subtitle-1">{{category}}</v-card-subtitle>
				</router-link>
				<v-card-text class="">
					<v-row
						align="center"
						class="mx-0 mb-0"
					>
						<v-rating
							:value="5"
							color="#da0063"
							background-color="#da0063"
							dense
							half-increments
							readonly
							size="22"
						></v-rating>
					</v-row>
					<v-row
						align="center"
						class="mx-0 mb-0 pb-0 text-body-1">
						{{description}}
					</v-row>
				</v-card-text>
				<v-card-actions style="height:0; padding:0">
					<div class="biz-actions">
						<v-icon color="#da0063" size="32" class="mx-1">mdi-cellphone</v-icon>
						<v-icon color="#da0063" size="32" class="mx-1">mdi-chat</v-icon>
						<v-icon color="#da0063" size="32" class="mx-1">mdi-email</v-icon>
					</div>
				</v-card-actions>
			</v-col>
		</v-row>
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
			default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et arcu cursus, volutpat odio id, dictum massa.'
		}
	}
}
</script>

<style>
.view-button {
	position:absolute;
	bottom: 0;
	right: 0;
	margin: 12px;
}
.custom-link {
	cursor: pointer;
}
.biz-actions {
	position:absolute;
	top: 18px;
	right: 0;
	margin: 12px;
}
</style>