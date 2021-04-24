<template>
	<v-row justify="center">
		<v-col cols="auto">
			<v-sheet
				color="grey lighten-4"
				min-height="70vh"
				width="800px"
				rounded="lg"
				class="overflow-hidden"
			>
			<v-row class="pa-4" justify="center">
				<v-col cols="12" style="text">
					<div class="text-h2 text-center font-weight-bold"><span style="color:#da0063;">BLIZ</span>NIS</div>
				</v-col>
				<v-col cols="10">
					<v-row>
						<v-col class="pb-0 d-flex" cols="12">
							<v-text-field
								dense
								label="Pretraga"
								solo
								v-model="searchTerm"
								hide-details
								class="mb-3 rounded search-custom no-round"
								@enter="search"
							>
							</v-text-field>
							<v-btn @click="search" class="ml-1 white--text search-custom no-round" color="#da0063" height="38"><v-icon>mdi-magnify</v-icon>Pretraži</v-btn>
						</v-col>
						<v-col class="pb-0" cols="6">
							<v-menu max-height="250px" offset-y>
								<template v-slot:activator="{on, attrs}">
									<v-text-field
										dense
										label="Kategorija"
										solo
										append-icon="mdi-playlist-star"
										v-model="catSearch"
										hide-details
										class="mb-3 rounded"
										v-bind="attrs"
										v-on="on"
									>
									</v-text-field>
								</template>
								<v-treeview
									transition
									style="background:white;"
									activatable
									hoverable
									:items="categories"
									:search="catSearch"
									:filter="filter"
									:active.sync="activeCategory"
									return-object
								></v-treeview>
							</v-menu>
						</v-col>
						<v-col class="pb-0" cols="6">
							<v-select clearable v-model="locationSelection" :items="locationOpts" dense hide-details label="Lokacija" solo></v-select>
						</v-col>
					</v-row>
				</v-col>
				<v-slide-y-transition>
				<v-col v-if="locationSelection===1" cols="10" class="pb-2">
					<v-text-field append-icon="mdi-map-marker" solo dense hide-details label="Adresa"></v-text-field>
				</v-col>
				</v-slide-y-transition>
				<v-slide-y-transition>
				<v-col v-if="locationSelection!==null" cols="10">
					<v-slider
						color="#da0063"
						tick-size="0"
						track-color="#da0063"
						v-model="rangeIndex"
						:tick-labels="rangeLabels"
						step="10"
						max="80"
					>
					</v-slider>
				</v-col>
				</v-slide-y-transition>
			</v-row>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>

export default {
	name: 'landing-search',
	data() {
		return {
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
			locationOpts: [{text:'Koristi moju lokaciju', value: 0},{text: 'Unesi lokaciju', value: 1}],
			locationSelection: null
		};
	},
	created() {
		this.fetchCategories();
	},
	computed: {
		filter () {
			return this.caseSensitive
				? (item, search, textKey) => item[textKey].indexOf(search) > -1
				: undefined;
		}
	},
	watch: {
		activeCategory() {
			this.setCatSearch();
		}
	},
	methods: {
		search() {
			const radius = this.rangeLabels[this.rangeIndex/10].split('km').shift();
			let data = {
				Lat: 45,
				Long: 17,
				radius: radius,
				categoryId: this.activeCategory[0]?.id,
				searchTerm: this.searchTerm
			}
			this.$router.push({name: 'Pretraga', query: data});
		},
		async fetchCategories() {
			return this.$http({
				url: '/values/categories'
			}).then(({data}) => {
				this.categories = data;
			})
		},
		setCatSearch() {
			this.catSearch = this.activeCategory[0]?.name ?? '';
		}
	}
}
</script>
