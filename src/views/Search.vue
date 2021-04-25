<template>
	<v-row justify="center">
		<v-col cols="auto">
			<v-sheet
				min-height="70vh"
				width="1200px"
				rounded="lg"
				class="overflow-hidden"
			>
			<v-progress-linear indeterminate :active="loading" height="8"/>
			<search-box class="mt-8" :data.sync="item" @search="search" @catLoaded="search"/>
			<v-row class="pa-4" justify="start">
				<v-col class="my-1" cols="12">
					<v-divider/>
				</v-col>
				<v-col class="my-2" cols="12" v-for="(biz, index) in businesses" :key="index">
					<biz-card class="mx-16" :id="biz.id" :title="biz.name" :category="biz.categoryName"></biz-card>
				</v-col>
			</v-row>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
import BizCard from '../components/BizCard';
import SearchBox from '../components/SearchBox.vue';

export default {
	name: 'search',
	components: {BizCard,SearchBox},
	data() {
		return {
			loading: false,
			item: {
				categoryId: null,
				useLocation: null,
				useUserLocation: null,
				Lat: 45, // Let's keep this like that.
				Long: 17,
				address: null,
				radius: null,
				searchTerm: null
			},
			catSearch: null,
			businesses: [
			],
			rangeLabels: ['1km', '2km', '5km', '10km', '15km', '20km', '30km', '50km', '100km']
		};
	},
	async created() {
		for(const k of Object.keys(this.$route.query))
		{
			this.item[k] = this.$route.query[k];
		}
	},
	methods: {
		search(item) {
			this.loading = true;
			this.$router.replace({name: 'Pretraga', query: item});
			this.$http({
				url: '/companies',
				method: 'get',
				params: item
			}).then(({data}) => {
				this.businesses = data;
			}).finally(() => {
				this.loading = false;
			});
		}
	}
}
</script>