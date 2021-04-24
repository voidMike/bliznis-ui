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
			<v-row class="pa-4" justify="start">
				<v-col cols="7">
					<v-text-field
						dense
						label="Pretraga"
						outlined
						append-icon="mdi-magnify"
						v-model="searchTerm"
						hide-details
						class="mb-3 rounded"
						v-on:keyup.enter="search"
						@click:append="search"
					>
					</v-text-field>
				</v-col>
				<v-col cols="7">
					<v-menu max-height="250px" offset-y>
						<template v-slot:activator="{on, attrs}">
							<v-text-field
								dense
								label="Kategorija"
								outlined
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
				<v-col cols="7">
					<v-slider
						v-model="rangeIndex"
						:tick-labels="rangeLabels"
						step="10"
						max="80"
					>
					</v-slider>
				</v-col>
				<v-col cols="12">
					<v-btn width="200" color="primary" @click="search"><v-icon>mdi-refresh</v-icon>Osvježi</v-btn>
				</v-col>
				<v-col class="my-1" cols="12">
					<v-divider/>
				</v-col>
				<v-col class="my-2" cols="12" v-for="(biz, index) in businesses" :key="index">
					<biz-card :id="biz.id" :title="biz.name" :category="biz.categoryName"></biz-card>
				</v-col>
			</v-row>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script>
import BizCard from '../components/BizCard';

export default {
	name: 'search',
	components: {BizCard},
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
			rangeLabels: ['1km', '2km', '5km', '10km', '15km', '20km', '30km', '50km', '100km']
		};
	},
	async created() {
		await this.fetchCategories();
		const query = this.$route.query;
		this.searchTerm = query.searchTerm ?? null;
		this.rangeIndex = this.rangeLabels.findIndex((elem) => elem===query.radius+'km')*10 ?? 0;
		this.activeCategory = this.findCat(this.categories, query.categoryId);
		this.search();
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
			this.$router.replace({name: 'Pretraga', query: data});
			this.$http({
				url: '/companies',
				method: 'get',
				params: data
			}).then(({data}) => {
				this.businesses = data;
			});
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
		},
		findCat(cats, id) {
			for(const cat of cats) {
				if (cat.id === Number(id))
					return [cat];
				let rcat = this.findCat(cat.children, id);
				if (rcat.length)
					return [rcat];
			}
			return [];
		}
	}
}
</script>