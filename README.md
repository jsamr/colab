# CoLab


## Conventions

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Stack

L'application est construite avec [Meteor v1.3](https://www.meteor.com/), en implémentant les [spécifications de l'architecture Mantra](https://kadirahq.github.io/mantra/#sec-Overview), qui oblige à un fort découplage.

 
### Object Model Layer

Le modèle est implémenté avec [Astronomy v2](http://jagi.github.io/meteor-astronomy/) + [Serrurier](https://github.com/sveinburne/serrurier)

### Roles management

La gestion des rôles est implémentée avec [Meteor Roles v2](https://github.com/alanning/meteor-roles)

### View Model 

Les composants graphiques sont implémentés avec [React v15](https://facebook.github.io/react/) + [React Komposer](https://github.com/kadirahq/react-komposer)

### States management

Les états internes sont gérés avec [redux v3](http://redux.js.org/)


# Testing

To launch tests, run at root 
```
meteor npm tests
```
or if you have npm installed 
```
 npm tests
```