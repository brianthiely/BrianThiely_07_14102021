<script>
import NavLink from './components/NavLink.vue'

export default {
	name: 'App',
	components: {
		NavLink
	}
}
</script>

<template>
	<div id="app">
		<nav>
			<NavLink url="/" text="Accueil" />
			<NavLink url="/about" text="À propos" />
			<NavLink url="/contact" text="Contact" />
		</nav>
	</div>
</template>