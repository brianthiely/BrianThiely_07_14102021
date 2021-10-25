<template>
	<div class="container h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-lg-12 col-xl-11">
				<div class="card text-black" style="border-radius: 25px;">
					<div class="card-body p-md-5">
						<div class="row justify-content-center">
							<div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
								<p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
									Créer mon compte
								</p>

								<form class="mx-1 mx-md-4">
									<div class="d-flex flex-row align-items-center mb-4">
										<i class="fas fa-user fa-lg me-3 fa-fw"></i>
										<div class="form-outline flex-fill mb-0">
											<label class="form-label" for="email">Adresse mail</label>
											<input
												v-model="form.email"
												type="email"
												name="email"
												id="email"
												class="form-control"
												required
											/>
										</div>
									</div>

									<div class="d-flex flex-row align-items-center mb-4">
										<i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
										<div class="form-outline flex-fill mb-0">
											<label class="form-label" for="password"
												>Mot de passe</label
											>
											<input
												v-model="form.password"
												type="password"
												name="password"
												id="password"
												class="form-control"
												required
											/>
										</div>
									</div>

									<div class="d-flex flex-row align-items-center mb-4">
										<i class="fas fa-lock fa-lg me-3 fa-fw"></i>
										<div class="form-outline flex-fill mb-0">
											<label class="form-label" for="firstName">Prénom</label>
											<input
												v-model="form.firstName"
												type="text"
												id="firstName"
												name="firstName"
												class="form-control"
												required
											/>
										</div>
									</div>

									<div class="d-flex flex-row align-items-center mb-4">
										<i class="fas fa-key fa-lg me-3 fa-fw"></i>
										<div class="form-outline flex-fill mb-0">
											<label class="form-label" for="lastName">Nom</label>
											<input
												v-model="form.lastName"
												type="text"
												id="lastName"
												name="lastName"
												class="form-control"
												required
											/>
										</div>
									</div>

									<div class="form-check d-flex justify-content-center mb-5">
										<input
											class="form-check-input me-2"
											type="checkbox"
											value=""
											id="checkValidation"
											required
										/>
										<label class="form-check-label" for="checkValidation">
											J'accepte toutes les
											<a href="#!">Conditions d'utilisation</a>
										</label>
									</div>

									<div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
										<button
											@click.prevent="signup()"
											class="btn btn-primary btn-lg"
										>
											Je m'inscris
										</button>
									</div>

									<p class="text-center text-muted mt-5 mb-0">
										Vous avez déjà un compte ?
										<router-link to="/login">Se connecter</router-link>
									</p>
								</form>
							</div>
							<div
								class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
							>
								<img
									src="../assets/logo/icon-above-font.svg"
									class="img-fluid"
									alt="Groupomania Logo"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted } from 'vue';
import axios from 'axios';
import { apiUrl } from './../settings';
export default {
	name: 'Signup',
	setup() {
		// mounted
		onMounted(() => {
			console.log('apiUrl');
			console.log(apiUrl);
		});
	},
	data() {
		return {
			form: {
				email: '',
				password: '',
				firstName: '',
				lastName: '',
			},
		};
	},
	methods: {
		signup() {
			axios
				.post(`${apiUrl}/auth/signup/`, this.form)
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

<style></style>
