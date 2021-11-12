<template>
	<div class="row">
		<div class="col-9">
			<form class="container mb-5">
				<textarea
					v-model="content"
					maxlength="280"
					class="form-control"
					rows="2"
					placeholder="Quelque chose à nous partager? (280 caractères max.)"
				></textarea>
				<!-- <input type="file" class="form-control" id="attachement" /> -->
				<div class="mar-top clearfix">
					<button
						@click="createPost()"
						class="btn btn-sm btn-share pull-right text-white"
					>
						<i class="fas fa-pencil-alt"></i> Partager
					</button>
				</div>
			</form>
		</div>

		<div class="col-12">
			<span class="font-weight-bold">Fil d'actualité</span><br /><br />
			<div v-for="post in posts" :key="post.id" class="post-content">
				<div class="post-container    align-items-center">
					<!-- FEATURE PICTURE -->
					<div>
						<div class="user-info mb-3">
							<h5>
								<!-- BINDER PROFIL USER -->
								<a class="profile-link">
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
						<div class="">------</div>

						<p class="text-muted">
							{{ dateFormat(post.createdAt) }}
						</p>
					</div>
					<button
						class="mr-5 p-1"
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
</template>

<script>
import UserService from '../services/user.service';
import axios from 'axios';
const API_URL = 'http://localhost:3000/groupomania';

export default {
	name: 'Posts',

	data() {
		return {
			posts: [],
			user: this.$store.state.auth.user,
			content: '',
		};
	},
	beforeMount() {
		this.getAllPosts();
	},

	methods: {
		createPost() {
			if (this.content != '') {
				try {
					axios.post(
						API_URL + '/post/create',
						{ content: this.content },
						{
							headers: {
								Authorization:
									'Bearer ' + this.$store.state.auth.user.tokenConnection,
							},
						}
					);
				} catch (error) {
					console.log(error);
				}
			}
		},

		async getAllPosts() {
			console.log();
			const response = await UserService.getAllPosts();
			return (this.posts = response.data);
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
	},
};
</script>

<style scoped>
body {
	margin-top: 20px;
	background: #ebeef0;
}
.btn-share {
	background-color: red;
	color: white;
}
.card {
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
		rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}
.bg-card-user {
	background-image: url('../assets/logo/icon.png');
	background-size: cover;
	background-position: center;
}
.img-sm {
	width: 46px;
	height: 46px;
}
.panel {
	box-shadow: 0 2px 0 rgba(0, 0, 0, 0.075);
	border-radius: 0;
	border: 0;
	margin-bottom: 15px;
}
.panel .panel-footer,
.panel > :last-child {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}
.panel .panel-heading,
.panel > :first-child {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
.panel-body {
	padding: 25px 20px;
}
.media-block .media-left {
	display: block;
	float: left;
}
.media-block .media-right {
	float: right;
}
.media-block .media-body {
	display: block;
	overflow: hidden;
	width: auto;
}
.middle .media-left,
.middle .media-right,
.middle .media-body {
	vertical-align: middle;
}
.thumbnail {
	border-radius: 0;
	border-color: #e9e9e9;
}
.tag.tag-sm,
.btn-group-sm > .tag {
	padding: 5px 10px;
}
.tag:not(.label) {
	background-color: #fff;
	padding: 6px 12px;
	border-radius: 2px;
	border: 1px solid #cdd6e1;
	font-size: 12px;
	line-height: 1.42857;
	vertical-align: middle;
	-webkit-transition: all 0.15s;
	transition: all 0.15s;
}
.text-muted,
a.text-muted:hover,
a.text-muted:focus {
	color: #acacac;
}
.text-sm {
	font-size: 0.9em;
}
.text-5x,
.text-4x,
.text-5x,
.text-2x,
.text-lg,
.text-sm,
.text-xs {
	line-height: 1.25;
}
.btn-trans {
	background-color: transparent;
	border-color: transparent;
	color: #929292;
}
.btn-icon {
	padding-left: 9px;
	padding-right: 9px;
}
.btn-sm,
.btn-group-sm > .btn,
.btn-icon.btn-sm {
	padding: 5px 10px !important;
}
.mar-top {
	margin-top: 15px;
}

body {
	margin-top: 20px;
}

/*==================================================
  Post Contents CSS
  ==================================================*/

.post-content {
	/* background: #f8f8f8; */
	border-radius: 4px;
	width: 100%;
	border: 1px solid #f1f2f2;
	box-shadow: #ccc 0px 5px 15px;
	margin-bottom: 20px;
	overflow: hidden;
	position: relative;
}

.post-content img.post-image,
video.post-video,
.google-maps {
	width: 100%;
	height: auto;
}

.post-content .google-maps .map {
	height: 300px;
}

.post-content .post-container {
	padding: 20px;
}

.post-content .post-container .post-detail {
	margin-left: 65px;
	position: relative;
}

.post-content .post-container .post-detail .post-text {
	line-height: 24px;
	margin: 0;
}

.post-content .post-container .post-detail .reaction {
	position: absolute;
	right: 0;
	top: 0;
}

.post-content .post-container .post-detail .post-comment {
	display: inline-flex;
	margin: 10px auto;
	width: 100%;
}

.post-content .post-container .post-detail .post-comment img.profile-photo-sm {
	margin-right: 10px;
}

.post-content .post-container .post-detail .post-comment .form-control {
	height: 30px;
	border: 1px solid #ccc;
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	margin: 7px 0;
	min-width: 0;
}

img.profile-photo-md {
	height: 50px;
	width: 50px;
	border-radius: 50%;
}

img.profile-photo-sm {
	height: 40px;
	width: 40px;
	border-radius: 50%;
}

.text-green {
	color: #8dc63f;
}

.text-red {
	color: #ef4136;
}

.btn-info {
	font-size: 13px;
	letter-spacing: 1px;
	line-height: 15px;
	border: 2px solid rgba(91, 192, 222, 0.75);
	border-radius: 40px;
	transition: all 0.3s ease 0s;
}

.btn-info:hover {
	color: black;
	background: white;
	border: 2px solid aqua;
}
</style>
