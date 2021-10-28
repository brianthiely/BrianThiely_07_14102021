<template>
	<h1>Tout mes posts</h1>
</template>

<script>
import axios from 'axios';
import { apiUrl } from './../settings';
export default {
	data() {
		return {
			posts: [],
		};
	},

	methods: {
		getAllPosts() {
			axios.post(`${apiUrl}/`)
				.then(() => {
					this.$router.replace({
						name: 'Home',
					});
				})
				.catch((err) => {
					console.log('err.response');
					console.log(err.response);
				});
		},
	},
};
</script>
