# Parkin

Projet de développement d'application mobile.

L'application Parkin' permet d'afficher les parkings de Nantes ainsi que la localisation de l'appareil de l'utilisateur.

L'application en version mobile est disponible dans le dossier android. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Mise à jour et génération android

Si le code de la webApp est mis à jour, suivre les étapes suivantes pour obtenir la version android correspondantes : 
```
npm run build
npx cap copy
```

### Librairies utilisées : 

Les commandes spécifiées ne sont pas à effectuer, le npm install doit être suffisant. Toutefois, si vous rencontrez des problèmes de dépendances ou si le dossier nodes_modules n'est pas présent, elles permettent d'installer les librairies nécessaires.

* Axios pour les Appels REST
```
npm install axios
```
* leaflet pour les maps
```
npm install @vue-leaflet/vue-leaflet --save
npm i leaflet
```
* router pour les routes
```
npm install vue-router@4
```
* capacitor pour plugins
```
npm install @capacitor/core @capacitor/cli
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
