
![](serrurier-raw.svg)

# *Serrurier*, a declarative extension for methods access control in [jagi:astronomy](http://jagi.github.io/meteor-astronomy/) using decorators

> **ℹ** *Serrurier* and *cadenas* are french words that stands respectively for *locksmith* and *padlock*.  
> **✔** This library aims to write more secure, maintainable and readable code, by defining function access through properties, via decorators.  
> **✔** It integrates smoothly with [alanning:meteor-roles](https://github.com/alanning/meteor-roles).  
> **✔** Allows to easely report suspect activity and Errors through [builtin or custom reporters](#reporters).

``` bash
meteor add svein-serrurier
```

## &#x1f512; *`@cadenas`* decorator
### Basics

> **ℹ** A *`@cadenas`* is an assertion that will trigger a specific `Exception` when it fails.  
> **ℹ** This (or those) assertions are run both **client** side and **server** side.  
> **ℹ** Those Exceptions are handled [by reporters](#reporters).  
> **ℹ**  The general syntax for *`@cadenas`* is `@cadenas( cadenasName, ...params )`  
> **ℹ** *`@cadenas`*  can target any function inside a `methods` description block. `events` are supported as well as long as you don't provide an array of handlers.  
> **ℹ** It supports callbacks for `methods`.
> **ℹ** *Serrurier* is a very modular library and you can easely write your own *`@cadenas`* [within few lines of codes](#write-cadenas).   
> **⚠** To use decorators in your meteor project `@`), [follow those 2 straightforward steps](#decorators).  
> **⚠** To use `loggedUserInRole` *`@cadenas`*, you need to add `svein:serrurier-cadenas-roles` to your project.
> ```
> meteor add svein:serrurier-cadenas-roles
> ```

``` javascript
import { Serrurier, cadenas } from 'meteor/svein:serrurier';
import { Mongo } from 'meteor/mongo';

const Project = Serrurier.createClass({
  name: 'Project',
  collection: new Mongo.Collection( 'projects' ),
  methods: {
    // This is it
    @cadenas( 'loggedUserInRole', 'administrator' )
    updateSensitiveData() {
      // ...
      console.info( 'The assertion passed, user is administrator.' );
    }
  }
});
```
Then, if logged user is not in role 'administrator' and calls
``` javascript
(new Project()).updateSensitiveData();
```
This will output in the console :
![](img/log1.png)

Notice that the cadenas `'userIsLoggedIn'` has passed, because `'loggedUserInRole'` cadenas depends on it.

### List of available *`@cadenas`*

#### `@cadenas( 'userLoggedIn' )`

> **desc** Assert that the user is logged in, with `Meteor.userId`  
> **throws** `SecurityException`  

#### `@cadenas( 'loggedUserInRole', role_s, partition )`

**⚠** You need to use [alanning-roles](https://github.com/alanning/meteor-roles) in your project to use this one, and add the following plugin :

```
meteor add svein:serrurier-cadenas-roles
```

> **desc**  
> **throws** `SecurityException`  
> **params**
> > role_s dsfsd  
> > partition sdfsfd


#### `@cadenas( 'matchParams', paramsDescription )`

> **desc**  
> **throws** `ValidationError`  
> **params**  
> > paramsDescription  


#### `@cadenas( 'persisted' )`

> **throws** `StateException`  
> **desc** Assert that the instance it is being called upon has been persisted (with `_isNew` property)


## *`@server`* decorator

> ```
> meteor add svein:serrurier-decorator-server
> ```  
> **ℹ** Applies to `methods` only.  
> **ℹ** Performs server-side only, you must provide a callback as last argument.


<a name='decorators'>
## Adding legacy decorations (Meteor >= 1.3.4)
Follow those two simple steps :

> `meteor npm install -s babel-plugin-transform-decorators-legacy`

Then add at the root of your project a `.babelrc` file with the following content :
``` json
{
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```
That's all you have to do!
## In production

You can prevent `Serrurier` from outputting anything in the console with one single `Serrurier.silence()` at the beginning of your application.

``` javascript
import Serrurier from 'meteor/svein:serrurier';
import 'meteor/jboulhous:dev'; // adds `Meteor.isDevelopment` flag

if(!Meteor.isDevelopment) Serrurier.silence();

```
<a name="reporters">
## reporters

### Paranoid reporter

```
{
        createdAt: new Date('2016-07-07T05:46:25.005Z'),
        ip: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36',
        securityContext: {
                reason: 'User must be in  role : administrator, partition: GLOBAL',
                errorId: 'assert:logged-user-in-role',
                descriptor: 'updateSensitiveData',
                target: {
                        Project: {
                                _removed: false,
                        }
                },
                userId: 'JCwWgQZLExz5KrcDH'
        }
}
 _______________________________________________________________________________ 
```
//TODO write doc

<a name="write-cadenas">
## Write your own *`@cadenas`*
//TODO write doc
### From scratch

### Composition with `Assertor.partialFrom`

``` javascript

```
