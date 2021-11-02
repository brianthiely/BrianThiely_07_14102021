<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-red mb-5">
		<div class="container">
			<a class="navbar-brand col-9" href="#">Groupomania</a>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse">
				<form class="form-inline my-2 my-md-0">
					<div class="mr-5 text-white">Mon profile</div>
					<div @click="logout" class="text-white">
						<i class="fas fa-sign-out-alt"></i>
					</div>
				</form>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'NavBar',

	methods: {
		logout: function() {
			this.$store.dispatch('auth/logout');
			this.$router.push('/');
		},
	},
};
</script>

<style scoped>
.bg-red {
    background-color: #00acee;
}
</style>
