<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-red mb-5">
		<div class="container">
			<a class="navbar-brand col-9" href="/dashboard">Groupomania</a>
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
					<a @click="getUser" class="mr-5 text-white pe-click">Mon profile</a>
					<div @click="logout" class="text-white pe-click">
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

	data() {
		return {
			user: {},
		};
	},
	methods: {
		logout() {
			this.$store.dispatch('auth/logout');
			this.$router.push('/');
		},
		getUser() {
			this.$router.push('/profile')
		},
	},
};
</script>

<style scoped>
.bg-red {
	background-color: #fd2d01;
}
.pe-click {
	cursor: pointer;
}
</style>
