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
						<h5 class="mb-5">Derniers posts</h5>
					</div>
					<div class="row d-flex flex-column">
						<div v-for="post in posts" :key="post.id" class="post-content">
							<div class="post-container mb-5   align-items-center">
								<!-- FEATURE PICTURE -->
								<div>
									<div class="user-info mb-3">
										<h5>
											<!-- BINDER PROFIL USER -->
											<a class="profile-link text-decoration-none text-dark">
												{{ post.User.firstName }} {{ post.User.lastName }}</a
											>
										</h5>
									</div>
									<p class="font-weight-bold">A publiée:</p>
								</div>
								<div class="post-detail">
									<div class="post-text">
										<p>
											{{ post.content }}
										</p>
									</div>
									<div class="text-muted">Publiée le:</div>

									<p class="text-muted">
										{{ dateFormat(post.createdAt) }}
									</p>
								</div>
								<button
									class="me-5 p-1"
									v-if="user.admin === true || user.id === post.userId"
									@click="deletePost(post.id)"
								>
									Supprimer
								</button>
								<button
									class="p-1 mb-4"
									v-if="user.id === post.userId"
									@click="showarea()"
								>
									Modifier
								</button>
								<textarea
									v-model="content"
									class="mb-3"
									style="display:none"
									id="textarea"
									cols="30"
									rows="2"
								></textarea>
								<button
									@click="modifyPost(post.id)"
									id="btn-textarea"
									style="display:none"
								>
									Confirmer
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
import axios from 'axios';
const API_URL = 'http://localhost:3000/groupomania';

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
			console.log('response DELETE ACCOUNT');
			console.log(response);
			this.$router.push('/');
		},

		async deletePost(data) {
			const response = await UserService.deletePost(data);
			this.$router.go();
			console.log(response);
		},

		async showarea(data) {
			try {
				const textarea = document.getElementById('textarea');
				const btnTextArea = document.getElementById('btn-textarea');
				if (
					textarea.style.display == 'none' &&
					btnTextArea.style.display == 'none'
				) {
					textarea.style.display = 'block';
					btnTextArea.style.display = 'block';
				}
			} catch (error) {
				console.log(error);
			}
			console.log(data);
		},

		modifyPost(data) {
			try {
				axios.put(
					API_URL + '/post/update/' + data,
					{ content: this.content },
					{
						headers: {
							Authorization:
								'Bearer ' + this.$store.state.auth.user.tokenConnection,
						},
					}
				);
				this.$router.go();
			} catch (error) {
				console.log(error);
			}
			console.log(data);
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
