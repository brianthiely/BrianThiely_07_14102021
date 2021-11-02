<template>
	<NavBar />
	<div class="row p-3">
		<div class="col-9">
			<form class="container">
				<textarea
					v-model="content"
					maxlength="280"
					class="form-control"
					rows="2"
					placeholder="Quelque chose à nous partager? (280 caractères max.)"
				></textarea>
				<input
					@change="onFileChange(e)"
					type="file"
					class="form-control"
					id="attachement"
				/>
				<div class="mar-top clearfix">
					<button
						@click="createPost()"
						class="btn btn-sm btn-primary pull-right"
						type="submit"
					>
						<i class="fas fa-pencil-alt"></i> Partager
					</button>
				</div>
			</form>

			<ul>
				<li v-for="post in posts" :key="post.id">
					{{ post.content }} 	{{ post.attachement }}
				</li>
			</ul>
			
		</div>

		<div class="col-3">
			Liste des membres
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import UserService from '../services/user.service';

export default {
	name: 'Dashboard',
	components: {
		NavBar,
	},
	data() {
		return {
			posts: [],
			content: '',
			attachement: '',
		};
	},
	mounted() {
		// if (!this.currentUser) {
		// }
		this.getAllPosts();

	},
	computed: {
		// currentUser() {
		// 	return this.$store.state.auth.user;
		// },
	},
	methods: {
		// onFileChange: function(e) {
		// 	const files = e.target.files;
		// 	// let filename = files[0].name;
		// 	const fileReader = new FileReader();
		// 	fileReader.addEventListener('load', () => {
		// 		this.attachement = fileReader.result;
		// 	});
		// 	fileReader.readAsDataURL(files[0]);
		// 	this.image = files[0];
		// },

		// createPost: function() {
		// 	this.$store
		// 		.dispatch('dashboard/createPost', {
		// 			content: this.content,
		// 			attachement: this.attachement,
		// 		})
		// 		.then(
		// 			() => {
		// 				this.$store.dispatch('dashboard/getAllPosts');
		// 			},
		// 			function(error) {
		// 				console.log(error);
		// 			}
		// 		);
		// },
		async getAllPosts() {
			const response = await UserService.getAllPosts();
			return this.posts = response.data;
		},
	},
};
</script>

<style scoped>
body {
	margin-top: 20px;
	background: #ebeef0;
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
</style>
