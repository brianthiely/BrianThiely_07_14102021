<template>
	<NavBar />
	<div class="row py-5 px-4">
		<div class="col-md-5 mx-auto">
			<!-- Profile widget -->
			<div class="bg-white shadow rounded overflow-hidden">
				<div class="px-4 pt-0 pb-4 cover">
					<div class="media align-items-end profile-head">
						<div class="profile mr-3">
							<img
								src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
								alt="..."
								width="130"
								class="rounded mb-2 img-thumbnail"
							/>
							<button
								@click="deleteAccount()"
								class="btn btn-outline-dark btn-sm btn-block"
							>
								Supprimer mon compte
							</button>
						</div>
						<div class="media-body mb-5 text-dark">
							<h4 class="mt-0 mb-0">
								{{ user.firstName }} {{ user.lastName }}
							</h4>
							<!-- feature role -->
							<p class="small mb-4">
								{{ user.role }}
							</p>
						</div>
					</div>
				</div>

				<div class="py-4 px-4 mt-5">
					<div class="justify-content-between mb-3">
						<h5 class="mb-3">Derniers posts</h5>
					</div>
					<div class="row d-flex flex-column">
						<div v-for="post in posts" :key="post.id" class="mb-5">
							<div class="post-container">
								<div class="post-detail">
									<div class="user-info">
										<h5>
											<!-- BINDER PROFIL USER -->
											<a class="profile-link">
												{{ post.User.firstName }} {{ post.User.lastName }}</a
											>
										</h5>
									</div>

									<div class="post-text">
										<p>
											{{ post.content }}
										</p>
									</div>

									<p class="text-muted">
										{{ dateFormat(post.createdAt) }}
									</p>
									<div class="divider py-1 bg-dark mb-5"></div>
								</div>
								<button @click="deletePost(post.id)">
									Supprimer le post
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</template>

<script>
import UserService from '../services/user.service';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';

export default {
	name: 'Profile',
	components: {
		NavBar,
		Footer,
	},

	data() {
		return {
			user: this.$store.state.auth.user,
			posts: [],
			post: {},
		};
	},
	mounted() {
		this.getUser();
		this.getPostsUser();
	},

	methods: {
		dateFormat(date) {
			const event = new Date(date);
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			};
			return event.toLocaleDateString('fr-FR', options);
		},
		async getUser() {
			const response = await UserService.getUser(this.user.id);
			console.log('response GETUSER');
			console.log(response);
		},

		async getPostsUser() {
			console.log('GET POST THIS.POST');
			console.log(this.post);
			const response = await UserService.getPostsUser(this.user.id);
			return (this.posts = response.data);
		},

		async deleteAccount() {
			const response = await UserService.deleteAccount(this.user.id);
			console.log("response DELETE ACCOUNT");
			console.log(response);
			this.$router.push('/');
		},

		async deletePost(data) {
			console.log('data');
			console.log(data);
			const response = await UserService.deletePost(data);
			this.$router.go();
			console.log(response);
		},
	},
};
</script>

<style scoped>
.profile-head {
	transform: translateY(5rem);
}

.cover {
	background-image: url(../assets/logo/icon.svg);
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
}
</style>
