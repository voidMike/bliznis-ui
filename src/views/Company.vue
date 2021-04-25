<template>
	<v-row justify="center">
		<v-col cols="auto">
			<v-sheet
				min-height="70vh"
				max-width="1200"
				rounded="lg"
				class="overflow-hidden"
			>
			<v-progress-linear indeterminate :active="loading" height="8"/>
			<v-row class="pa-4">
				<v-col cols="12">
					<v-img
						class="rounded"
						height="320"
						width="1184"
						src="https://picsum.photos/1184/320"
					></v-img>
				</v-col>
				<v-card-actions>
					<div class="biz-actions">
					</div>
				</v-card-actions>
				<v-col class="ml-4" cols="12">
					<div class="text-h2 text-left">{{item.name}}</div>
					<v-rating
						:value="5"
						color="#da0063"
						background-color="#da0063"
						half-increments
						readonly
						size="42"
					></v-rating>
				</v-col>
				<v-col class="ml-4" cols="6">
					<div class="text-subtitle-1"><v-chip outlined color="#da0063">{{item.categoryName}}</v-chip></div>
					<div class="text-h5 my-2 text-left">{{item.description}}</div>
					<div class="text-subtitle-2 my-2 font-weight-bold"><v-icon>mdi-map-marker</v-icon>{{item.address}}</div>
					<div>
						<v-icon v-if="item.phoneNumber" color="#da0063" size="36" class="mx-1">mdi-cellphone</v-icon><span v-if="item.phoneNumber" class="text-subtitle-2">Telefon: {{item.phoneNumber}}</span><br>
						<v-icon color="#da0063" size="36" class="mx-1">mdi-chat</v-icon><span class="text-subtitle-2">Poruke</span><br>
						<v-icon color="#da0063" size="36" class="mx-1">mdi-email</v-icon><span class="text-subtitle-2">Email: {{item.companyMail}}</span><br>
					</div>
				</v-col>
				<v-divider vertical inset></v-divider>
				<v-col cols="5" class="ml-4">
					<v-img class="rounded-lg" src="/img/mockmap.png"/>
				</v-col>
				<v-col cols="12" class="pb-12">
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
			loading: false,
			item: {
				name: null,
				categoryName: null,
				description: null,
				companyMail: null,
				address: null,
				phoneNumber: null
			}
		};
	},
	created() {
		this.fetch();
	},
	computed: {
		id() {
			return this.$route.params.id;
		}
	},
	methods: {
		fetch() {
			this.loading = true;
			this.$http({
				url:`/companies/${this.id}`,
				method: 'get'
			}).then(({data}) => {
				this.item = data;
			}).finally(() => {
				this.loading = false;
			})
		}
	}
}
</script>

<style>

.biz-actions {
	position:absolute;
	top: 18px;
	right: 0;
	margin: 12px;
}
</style>