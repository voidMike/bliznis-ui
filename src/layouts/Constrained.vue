<template>
	<v-app id="inspire">
		<v-app-bar
			app
			color="primary"
			flat
		>
			<v-container class="py-0 fill-height" style="max-width:1200px">
				<v-avatar
					class="mr-10"
					color="grey darken-1"
					size="32"
				></v-avatar>

				<v-btn
					v-for="link in links"
					:key="link.name"
					:to="link.path"
					text
				>
					{{ link.name }}
				</v-btn>

				<v-spacer></v-spacer>

				<v-responsive max-width="260">
					<v-text-field
						dense
						flat
						hide-details
						rounded
						solo-inverted
					></v-text-field>
				</v-responsive>
			</v-container>
		</v-app-bar>

		<v-main class="grey lighten-3">
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import routes from '../router/routes'
	export default {
		data: () => ({
			links: [],
		}),
		created() {
			for (const route of routes) {
				if (route?.meta?.nav)
					this.links.push(route);
			}
		}
	}
</script>