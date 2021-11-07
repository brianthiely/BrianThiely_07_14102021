<template>
	<NavBar />
	<div class="container">
		<Posts />
	</div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import Posts from '../components/Posts.vue';

export default {
	name: 'Dashboard',
	components: {
		NavBar,
		Posts,
	},
	data() {
		return {
		};
	},
	mounted(
		
	) {
		
	},
	computed: {},
	methods: {
	},
};
</script>