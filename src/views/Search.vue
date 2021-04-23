<template>
	<v-row>
		<v-col cols="2">
			<v-sheet rounded="lg">
				<v-expansion-panels flat accordion multiple>
					<v-expansion-panel>
						<v-expansion-panel-header>
							Kategorije
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-treeview
								activatable
								:items="categories"
								class="overflow-x-auto"
								:active.sync="activeCategory"
							></v-treeview>
						</v-expansion-panel-content>
					</v-expansion-panel>
					<v-expansion-panel>
						<v-expansion-panel-header>
							Dodatno
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-list color="transparent">
								<v-list-item
									v-for="n in 5"
									:key="n"
									link
								>
									<v-list-item-content>
										<v-list-item-title>
											List Item {{ n }}
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider class="my-2"></v-divider>

								<v-list-item
									link
									color="grey lighten-4"
								>
									<v-list-item-content>
										<v-list-item-title>
											Refresh
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</v-sheet>
		</v-col>

		<v-col>
			<v-sheet
				min-height="70vh"
				rounded="lg"
				class="overflow-hidden"
			>
			<v-progress-linear indeterminate :active="loading" height="8"/>
			<v-row no-gutters class="pa-4" justify="center">
				<v-col cols="6">
					<v-text-field
						dense
						label="Pretraga"
						outlined
						rounded
						append-icon="mdi-magnify"
						v-model="searchTerm"
						@click:append="search"
					>
					</v-text-field>
				</v-col>
				<v-col cols="6"></v-col>
				<v-col class="mx-1 my-2" cols="auto" v-for="(biz, index) in businesses" :key="index"><biz-card :title="biz.title" :category="biz.category"></biz-card></v-col>
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
			activeCategory: [],
			searchTerm: null,
			businesses: [
				{
					title: 'Abc',
					category: 'Sirac'
				},
				{
					title: 'Abc',
					category: 'Sirac'
				},
				{
					title: 'Abc',
					category: 'Sirac'
				},
				{
					title: 'Abc',
					category: 'Sirac'
				},
				{
					title: 'Abc',
					category: 'Sirac'
				},
				{
					title: 'Abc',
					category: 'Sirac'
				},
				{
					title: 'Abc',
					category: 'Sirac'
				},
				{
					title: 'Abc',
					category: 'Sirac'
				},
				{
					title: 'Abc',
					category: 'Sirac'
				}
			],
			categories: [
				{
					id: 1,
					name: 'Usluge',
					children: [
						{
							id: 2,
							name: 'Posudjivanje novca',
							children: [
								{
									id: 5,
									name: 'Banka',
									children: [
										{
											id: 6,
											name: 'Banka 2',
											children: [
												{
													id: 7,
													name: 'Banka 3333333'
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{
					id: 3,
					name: 'Proizvodi',
					children: [
						{
							id: 4,
							name: 'Konci'
						}
					]
				}
			]
		};
	},
	created() {
		this.fetchCategories();
	},
	watch: {

	},
	methods: {
		search() {
			this.$router.replace({name: 'Pretraga', query: {term: this.searchTerm, cat: this.activeCategory[0]}});
		},
		fetchCategories() {
		}
	}
}
</script>