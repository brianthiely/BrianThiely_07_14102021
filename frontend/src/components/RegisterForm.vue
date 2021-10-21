<template>
	<div class="container">
		<form>
			<img alt="Groupomania Logo" src="../assets/logo/icon-above-font.png" />
			<nav>
				<router-link to="/login">Se connecter</router-link> |
				<router-link to="/register" class="active">S'inscrire</router-link>
			</nav>

			<label for="email"> Email:</label>
			<input id="email" types="email" name="email" placeholder="Email" required> 

			<label for="password"> Mot de passe:</label>
			<input id="password" types="password" name="password" placeholder="Mot de passe" required> 

			<label for="firstName"> Prénom:</label>
			<input id="firstName" types="text" name="firstName" placeholder="Prénoms" required> 

			<label for="lastName"> Nom:</label>
			<input id="lastName" types="text" name="lastName" placeholder="Noms" required> 

			<label for="role"> Poste dans l'entreprise:</label>
			<input id="role" types="text" name="role" placeholder="Chargé de communication" required> 
		</form>
	</div>
</template>
