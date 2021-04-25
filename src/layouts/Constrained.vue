<template>
	<v-app id="inspire">
		<v-app-bar
			app
			color="#da0063"
			flat
		>
			<router-link tag="div" to="/"><div class="logo"><div class="text-h5 font-weight-bold"><span style="color:#da0063;">BLIZ</span>NIS</div></div></router-link>
			<v-container class="py-0 fill-height" style="max-width:1200px">

				<v-btn
					v-for="link in links"
					:key="link.name"
					:to="link.path"
					text
					color="white"
				>
					{{ link.name }}
				</v-btn>

				<v-spacer></v-spacer>
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

<style>
	div.logo {
		position:absolute;
		left:0;
		top:0;
		padding:0 36px;
		display: flex;
		align-items: center;
		height: 64px;
		background: white;
		cursor: pointer;
	}
	.v-toolbar__content {
		padding: 0 !important;
	}
</style>