## Faire une API REST sur des films
​
Construire une API qui peut créer, modifier, afficher, effacer un film.
​
Il sera possible de requêter sur les routes suivantes:
​
- GET localhost:3000/movies -- Affiche tout les films
- GET localhost:3000/movies/:id -- Affiche un film via son id
- PUT localhost:3000/movies/ -- Ajoute un film via son nom
- POST localhost:3000/movies/:id -- Update un film via son id
- DELETE localhost:3000/movies/:id -- Efface un film via son id
​

La donnée sera sous forme d'un tableau d'objets JSON.
​
Chaque film aura à la fin la structure suivante:
​
```js
 {
  id: String,
  movie: String,
  yearOfRelease: Number,
  duration: Number // en minutes,
  actors: [String, String],
  poster: String // lien vers une image d'affiche,
  boxOffice: Number // en USD$,
  rottenTomatoesScore: Number
 }
```
​
Afin de récupérer ces informations vous utiliserez l'api suivante http://www.omdbapi.com/
​

**Vous devrez tester vos requêtes à l'aide de POSTMAN**

​
### STEP 1: Get started
​
Utilisez express-generator pour initier votre tp
​
### STEP 2: Requêtes CRUD


1. Créer un nouveau fichier dans le repertoire routes
2. Déclarez votre nouvelle route dans le fichier app.js
3. Dans votre nouveau fichier de route, créer les routes CRUD.
4. Pour l'instant nous gerons la base de donnée en utilisant uniquement un ID et le nom du film.
​
### Step 3: Requêtes API Externe
​
**Pré-requis:**
​
1. Creer une clé API: http://bit.ly/2GOS5Tc
​
2. Tester votre clé: http://www.omdbapi.com/?t=inception&apikey=VOTRECLEAPI

**Remplir la base de donnée avec des données supplémentaires**

Dans cette étape vous aurez à appeler l'API omdb pour retrouver les informations d'un film grâce à son nom.

Faites le avec la librairie axios :
​
```shell
$ npm i -s axios
```
​
Documentation axios : https://github.com/axios/axios

Récuperer les champs voulus et les inserer dans votre "DB" à chaque requête PUT/POST.


### Step 3 - Creer une documentation de votre API
​
Plusieurs solutions:
​
- Utiliser POSTMAN: https://medium.com/@olotintemitope/how-to-generate-your-api-documentation-in-20-minutes-4e0072f08b94
​
- Utiliser API Doc: http://apidocjs.com/
​
- Utiliser Swagger: https://github.com/swagger-api/swagger-node
​
### Step 4 - BONUS
​
Créer un site à l'aide de React qui n'aura qu'une seule fonctionnalité, afficher tous les films:
​
- Créer un composant Film
- Créer un container ListeFilms
- Récuperer la liste des films lorsque le container ListeFilms est monté
- Parcourir cette liste pour 'render' des composants films
​
Vous devrez faire fonctionner en même votre projet react et votre projet api dans deux consoles pour pouvoir interagir entre les deux.
