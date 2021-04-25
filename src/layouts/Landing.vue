<template>
	<v-app style="overflow:hidden" id="inspire">
		<div class="bg"></div>
		<v-main>
			<v-container fluid fill-height>
				<router-view></router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		data: () => ({
		}),
		created() {
		}
	}
</script>

<style>
.bg {
	width:200%;
	height:200%;
	position:absolute;
	left:-2%;
	top:-35%;
	filter: blur(8px);
	background-size: 100%;
	background-image: url('/img/veg.jpg');
}
</style>