<template>
	<div class="card">
		<h1 class="card__title">Espace Perso</h1>
		<p class="card__subtitle">Informations</p>
		<p>{{ user.firstName }} {{ user.lastName }} {{ user.email }}</p>
		<!-- <img :src="user.photo"/> -->
		
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'Profile',
	mounted: function() {
		console.log(this.$store.state.user);
		if (this.$store.state.user.id == -1) {
			this.$router.push('/');
			return;
		}
	},
	computed: {
		...mapState({
			user: 'userInfos',
		}),
	},
};
</script>

<style scoped></style>>
