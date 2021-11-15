<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-group mb-5">
		<div class="container">
			<a class="navbar-brand" href="/dashboard">
				<img
					width="200"
					class="imglogo"
					src="../assets/logo/icon-left-font-monochrome-white.png"
					alt="Logo Groupomania"
				/>
			</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a @click="getUser" class="nav-link text-white pe-click" href="#">Mon profile</a>
					</li>
					<li class="nav-tem">
						<a @click="logout" class="nav-link text-white pe-click" href="#">Déconnexion</a>
					</li>
			
				</ul>
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
			this.$router.push('/profile');
		},
	},
};
</script>

<style scoped>
.bg-group {
	background-color: #fd2d01;
}
.pe-click {
	cursor: pointer;
}
</style>
