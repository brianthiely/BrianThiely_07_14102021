<template>
	<div class="container">
		<form @submit.prevent="register()">
			<img alt="Groupomania Logo" src="../assets/logo/icon-above-font.svg" />
			<nav>
				<router-link to="/login">Se connecter</router-link> |
				<router-link to="/register" class="active">S'inscrire</router-link>
			</nav>

			<label for="email"> Email:</label>
			<input
				id="email"
				types="email"
				name="email"
				placeholder="Email"
				required
			/>

			<label for="password"> Mot de passe:</label>
			<input
				id="password"
				types="password"
				name="password"
				placeholder="Mot de passe"
				required
			/>

			<label for="firstName"> Prénom:</label>
			<input
				id="firstName"
				types="text"
				name="firstName"
				placeholder="Prénoms"
				required
			/>

			<label for="lastName"> Nom:</label>
			<input
				id="lastName"
				types="text"
				name="lastName"
				placeholder="Noms"
				required
			/>

			<label for="role"> Poste dans l'entreprise:</label>
			<input
				id="role"
				types="text"
				name="role"
				placeholder="Chargé de communication"
				required
			/>

			<label for="picture"> Choisissez une photo de profil:</label>
			<input
				id="picture"
				types="file"
				name="picture"
				accept="image/png, image/jpeg"
			/>

			<div class="error-message">{{ message }}</div>

			<button id="register-btn" type="submit">S'inscrire</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'RegisterForm',

	data() {
		return {
			message: '',
		};
	},

	methods: {
		async register(req, res) {
			const email = document.getElementById('email').value;
			const password = document.getElementById('password').value;
			const firstName = document.getElementById('firstName').value;
			const lastName = document.getElementById('lastName').value;
			const role = document.getElementById('role').value;

			try {
				if (!email || !password || !firstName || !lastName || !role) {
					throw new Error('Veuillez renseigner tout les champs');
				}

                const userRegister = await fetch.post(`${this.$apiUrl}/auth/register`)

                if(!userRegister) {
                    throw new Error("Création de compte impossible")
                }
				res.status(201).json({message: "Compte créé !"})


			} catch (error) {
				res.status(400).json({ error: error.message });
			}
		},
	},
};
</script>

<style>
img {
width: 100%;


}
</style>
