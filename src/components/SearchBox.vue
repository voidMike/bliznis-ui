<template>
	<v-row justify="center">
		<v-col cols="10">
			<v-row>
				<v-col class="pb-0 d-flex" cols="12">
					<v-text-field
						label="Pretraga"
						solo
						v-model="item.searchTerm"
						hide-details
						class="mb-3 rounded"
						v-on:keyup.enter="()=>$emit('search', item)"
					>
					</v-text-field>
					<v-btn @click="()=>$emit('search', item)" class="ml-1 white--text" color="#da0063" height="48"><v-icon>mdi-magnify</v-icon>Pretraži</v-btn>
				</v-col>
				<v-col class="pb-0" cols="6">
					<v-menu max-height="250px" offset-y>
						<template v-slot:activator="{on, attrs}">
							<v-text-field
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
					<v-select clearable v-model="locationSelection" :items="locationOpts" hide-details label="Lokacija" solo></v-select>
				</v-col>
			</v-row>
		</v-col>
		<v-slide-y-transition>
		<v-col v-if="locationSelection==='any'" cols="10" class="pb-2">
			<v-text-field
				append-icon="mdi-map-marker"
				solo
				hide-details
				label="Adresa"
				v-model="item.address"
				v-on:keyup.enter="()=>$emit('search', item)"
			></v-text-field>
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
				step="1"
				max="8"
			>
			</v-slider>
		</v-col>
		</v-slide-y-transition>
	</v-row>
</template>

<script>

export default {
	name: 'search-box',
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,

			rangeIndex: 0,
			activeCategory: [],
			searchTerm: null,
			catSearch: null,
			categories: [
			],
			rangeLabels: ['1km', '2km', '5km', '10km', '15km', '20km', '30km', '50km', '100km'],
			locationOpts: [{text:'Koristi moju lokaciju', value: 'own'}, {text: 'Unesi lokaciju', value: 'any'}],
			locationSelection: null,
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
			loaded: false
		};
	},
	created() {
		this.item = {...this.data};
		this.fetchCategories().then(() => {
			this.loaded = true;
			//this.item = this.data;
			this.activeCategory = this.findCat(this.categories, this.data.categoryId);
			this.$emit('catLoaded', this.item);
		});
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
		},
		'data.radius':{
			immediate:true,
			handler() {
				let ind = this.rangeLabels.findIndex((elem) => elem===this.data.radius+'km');
				this.rangeIndex = ind >=0 ? ind : 0;
			}
		},
		rangeIndex() {
			this.item.radius = this.rangeLabels[this.rangeIndex].split('km').shift();
		},
		locationSelection() {
			const ls = this.locationSelection;
			this.item.useLocation = ls !== null;
			this.item.useUserLocation = ls === 'own';
		},
		'data.useLocation':{
			immediate:true,
			handler() {
				if(this.data.useLocation==='true' || this.data.useLocation === true) {
					if(this.data.useUserLocation==='true' || this.data.useUserLocation===true) {
						this.locationSelection = 'own';
						return;
					}
					this.locationSelection = 'any';
				}
			}
		},
		item: {
			deep: true,
			handler() {
				//if(!this.loaded) return;
				//this.$emit('update:data', this.item);
			}
		},
		'data.categoryId':{
			immediate:true,
			handler(){
				this.activeCategory = this.findCat(this.categories, this.data.categoryId);
			}
		}
	},
	methods: {
		async fetchCategories() {
			return this.$http({
				url: '/values/categories'
			}).then(({data}) => {
				this.categories = data;
			})
		},
		setCatSearch() {
			this.catSearch = this.activeCategory[0]?.name ?? '';
			this.item.categoryId = this.activeCategory[0]?.id ?? null;
		},
		findCat(cats, id) {
			for(const cat of cats) {
				if (cat.id === Number(id))
					return [cat];
				let rcat = this.findCat(cat.children, id);
				if (rcat.length)
					return rcat;
			}
			return [];
		}
	}
}
</script>
