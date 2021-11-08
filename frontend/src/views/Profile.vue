<template>
	<NavBar />
	<div class="row py-5 px-4">
		<div class="col-md-5 mx-auto">
			<!-- Profile widget -->
			<div class="bg-white shadow rounded overflow-hidden">
				<div class="px-4 pt-0 pb-4 cover">
					<div
						v-for="userFind in user"
						:key="userFind.id"
						class="media align-items-end profile-head"
					>
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
						<div class="media-body mb-5 text-white">
							<h4 class="mt-0 mb-0">
								{{ userFind.firstName }} {{ userFind.lastName }}
							</h4>
							<!-- feature role -->
							<p class="small mb-4">
								{{ userFind.role }}
							</p>
						</div>
					</div>
				</div>

				<div class="py-4 px-4 mt-5">
					<div class="justify-content-between mb-3">
						<h5 class="mb-3">Derniers posts</h5>
					</div>
					<div class="row d-flex flex-column">
						<div v-for="post in filterPostID" :key="post.id" class="mb-5">
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
								<button  @click="deletePost()">
									Supprimer le post 
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import UserService from '../services/user.service';
import NavBar from '../components/NavBar.vue';
// import axios from 'axios';
// import authHeader from '../services/auth-header';
// const API_URL = 'http://localhost:3000/groupomania';
export default {
	name: 'Profile',
	components: {
		NavBar,
	},
	data() {
		return {
			user: {},
			posts: [],
		};
	},
	mounted() {
		this.getUser();
		this.getPostsUser();
		this.deletePost();
	},
	computed: {
		filterPostID() {
			return this.posts.filter((post) => {
				return post.id;
			});
		},
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
			const response = await UserService.getUser();
			return (this.user = response.data);
		},

		async getPostsUser() {
			const response = await UserService.getPostsUser();
			return (this.posts = response.data);
		},

		deleteAccount() {
			// UserService.deleteAccount();
			// this.$router.push('/')
		},
		deletePost() {
			// console.log(tpost.id);
		},
	},
};
</script>

<style scoped>
.profile-head {
	transform: translateY(5rem);
}

.cover {
	background-image: url(https://images.unsplash.com/photo-1530305408560-82d13781b33a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80);
	background-size: cover;
	background-repeat: no-repeat;
}
</style>
