<template>
	<v-row justify="center">
		<v-col cols="auto">
			<v-sheet
				color="white lighten-4"
				min-height="80vh"
				width="1200px"
				rounded="lg"
				class="overflow-hidden font-weight-bold"
				elevation="24"
			>
			<v-row class="mt-10 pa-4" justify="center">
				<v-col cols="12">
					<div class="text-h1 text-center font-weight-bold"><span style="color:#da0063;">BLIZ</span>NIS</div>
				</v-col>
			</v-row>
			<search-box :data="item" @search="search"/>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
import SearchBox from '../components/SearchBox';

export default {
	name: 'landing-search',
	components: {SearchBox},
	data() {
		return {
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
			loading: false,
			rangeIndex: 0,
			activeCategory: [],
			searchTerm: null,
			catSearch: null,
			businesses: [
			],
			categories: [
			],
			rangeLabels: ['1km', '2km', '5km', '10km', '15km', '20km', '30km', '50km', '100km'],
			locationOpts: [{text:'Koristi moju lokaciju', value: 'own'},{text: 'Unesi lokaciju', value: 'any'}],
			locationSelection: null
		};
	},
	methods: {
		search(item) {
			this.$router.push({name: 'Pretraga', query: item});
		}
	}
}
</script>
