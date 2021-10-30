<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
      </span>
      <span v-else>Menu </span>
    </h1>

    <SidebarLink to="/posts" icon="fas fa-home">Accueil</SidebarLink>
    <SidebarLink to="/posts" icon="fas fa-home">Accueil</SidebarLink>
    <SidebarLink to="/profile" icon="fas fa-user">Mon profil</SidebarLink>
    <SidebarLink to="/settings" icon="fas fa-cogs">Paramètres</SidebarLink>
    <SidebarLink @click="logout()" to="/" icon="fas fa-sign-out-alt">Deconnexion</SidebarLink>
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth}
  },
  methods: {
		logout: function() {
			this.$store.commit('logout');
			this.$router.push('/');
		},
	},
}
</script>

<style>
:root {
  --sidebar-bg-color: #3b5998 ;
  --sidebar-item-hover: #fd2d01;
  --sidebar-item-active: #fd2d01;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>