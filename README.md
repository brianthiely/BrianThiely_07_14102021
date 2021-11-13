
# Réseau social - Groupomania

## Prise en main

#### Clonez le repository
```js
 git clone https://github.com/brianthiely/BrianThiely_07_14102021.git     
```

#### Après avoir récupérer le projet il faut installer les dépendances

```js
  cd frontend
  npm install  
  npm run serve 
```

```js
  cd backend
  npm install  
  npm run start
```

### Maintenant récupérez la BDD
##### Assurez vous d'avoir SQL 👉 [MySQL](https://www.mysql.com/fr/)

##### Créez un dossier config dans le backend avec un fichier config.json et copier collez ceci en mettant vos données.
```json
{
	"development": {
		"username": "root",
		"password": "",
		"database": "groupomania",
		"host": "localhost",
		"dialect": "mysql"
	}
}
```
##### Créez un fichier ".env" et collez les données ci-dessous en renseignant votre passMysql si vous en avez.

```
PASSMYSQL = ""
SECRET_TOKEN = "kgIGIYTG87669GGJF"
SECRET_CRYPTOJS_TOKEN = "ihiughoiT7697GIgigi96"
PASSWORD_ADMIN = "i7s5barPG@jEHBdc"
```

## Vous pouvez dès à présent utiliser Groupomania
### Connectez-vous en tant que admin avec "chargedecom@gmail.com" et le PASSWORD_ADMIN
