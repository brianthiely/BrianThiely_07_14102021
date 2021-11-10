<template>
	<NavBar />
	<div class="container">
		<Posts />
	</div>
	<Footer />
</template>

<script>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import Posts from '../components/Posts.vue';

export default {
	name: 'Dashboard',
	components: {
		NavBar,
		Posts,
		Footer,
	},
};
</script>