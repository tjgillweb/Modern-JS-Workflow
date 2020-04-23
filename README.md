# Modern Javascript Workflow

### Using Babel
#### 1. Install [Node.js](https://nodejs.org/en/download/) (and npm) on your computer.
#### 2. **Initialize package.json**   
Use `npm init` to create a `package.json` file in the project directory
```
C:\...path> npm init
```

#### 3. Use npm to install babel/core and babel/cli packages
```
C:\...path> npm install @babel/core @babel/cli --save-dev
```

#### 4. Install the Babel preset(env) and register it in .babelrc
```
C:\...path> npm install @babel/preset-env --save-dev
```

**`.babelrc`**
```
{
    "presets": ["@babel/preset-env"]
}
```
### Using Babel CLI (Command Line Interface)
- The babel CLI is located inside node_modules folder and inside the bin folder
- To convert the source file to the babel converted source file we need to use the following command:
```
C:\...path> node_modules/.bin/babel src/index.js -o dist/assets/bundle.js
```
### npm scripts and Watch Flag
- To avoid typing the babel CLI command everytime we want to convert the files, we use the "scripts" property in the `package.json` file and also a -w watch flag.  

**`package.json`**
```
...
"scripts": {
    "babel": "node_modules/.bin/babel src/index.js -w -o dist/assets/bundle.js"
}
...
```

- Now, to run the coversion, we just need to type this command on the terminal once:
```
C:\...path> npm run babel
```
---------------------------------------------------------------------------------------------------------------------------------------

### Setup Webpack Configuration File
- Create a file named `webpack.config.js` in the root directory of the Project Folder.  

**webpack.config.js**
```Javascript
const path = require('path'); //'path' is a built-in module in the nodeJs core library.
module.exports = {
    entry: './src/index.js'
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: 'bundle.js';
    }
};
```
- Inside `webpack.config.js`, we add options and configuration on how webpack is going to run.
- `module.exports` means that we are going to export a webpack configuratuion object which then node.js is going to process when we run the webpack command later.

> module.exports is available only when we're running node on our computer, it does not execute on the browser.

- Inside the module.exports object, we need to specify two main properties: 
    - an entry propery and 
    - an output property.  

- The **entry property** is a path to a file which our initial input file is living. Its a relative URL in the current directory.
- The **output property** describes where we want the resulting JS bundle file to be output.

- output is not a single string value, its going to be an object, because we need to specify a couple of things.
- First we define path: its not a relative URL its an absolute URL, but its not appropriate if someone downloads the code from github, they will have to update the absolute URL. So, we use another node only feature i.e. the dirname property

**`__dirname:`** gives the absolute path up untill the root directory of the project, where the webpack file is sitting

### Using Webpack CLI

To run Webpack, we need to install two things: 
- webpack core package
- webpack CLI
```
npm install webpack webpack-cli --save-dev
```
- Webpack CLI is stored inside node_modules/.bin/webpack

```
...path> node_modules/.bin/webpack
```

**package.json**
```
...
"scripts": {
"babel": "node_modules/.bin/babel src/index.js -w -o dist/assets/bundle.js",
"webpack": "node_modules/.bin/webpack -w"
}
...
```
To run the webpack we use: 
```
...path> npm run webpack
```
----------------------------------------------------------------------------------------------------------------------------------------

### Import and Export Modules
- We can use functions, strings, arrays, objects etc. defined in one file in another file by exporting them. 

Create a file named `dom.js` in the src
```Javascript
console.log('dom file');
const body = document.querySelector('body');

export const styleBody = () => {
    body.style.background = "#BADA55";
};

export const addTitle = (text) => {
    const title = document.createElement('h1');
    title.textContent = text;
    body.appendChild(title);
}
export const contact = "tjgillweb@gmail.com";
```
Add the following code in `index.js`
```javascript
import {styleBody, addTitle, contact} from './dom';

console.log('index file');
addTitle('Hello');
styleBody();
console.log(contact); 
```

- To export many items in one go we omit the `export` keyword in front of each function/string and use the following syntax:
```javascript
export{ styleBody, addTitle, contact }; 
```

#### Default Export
- Create a file named `data.js` inside the src folder.
```javascript
const users = [
    { name: 'John', premium: true },
    { name: 'Elie', premium: false },
    { name: 'Adam', premium: true },
    { name: 'Eric', premium: true },
    { name: 'Caty', premium: false },
    { name: 'Sarah', premium: true }
];
//default value that we export from this file
export default users;

export const getPremiumUsers= (users) => {
    return users.filter(user => user.premium);
}
```
- To export both named and default export, omit the `export` keyword in front of them and use the following syntax:
```javascript
export {getPremiumUsers, users as default}; 
```

- To import a default export in the `index.js` file we can use any name to import the default data e.g. `test`. But we use `users`
```javascript
//import test from './data'
import users from './data';

const premUsers = getPremiumUsers(users);
console.log(users, premUsers);
```
- To import both named and default export use the following
```javascript
import users, { getPremiumUsers } from './data';
```
---------------------------------------------------------------------------------------------------------------------------------------

### Webpack Dev Server
- To run our code, we have to open our VS Code package called Live Server to spin up a Local Development service so we can preview the project in a browser. And then we also manually enter the webpack command with a watch flag in the terminal to capture any changes and rebundle our code.
- It would be better if we combine both of these tasks into one. We can do this using the Webpack Dev Server.

#### 1. Install the Webpack Dev Server
```
$ npm install webpack-dev-server@3.2.1
```

#### 2. Configure the webpack dev server inside the webpack config file
**webpack.config.js**
```Javascript
const path = require('path');
module.exports = {
    ...
    devServer : {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/'
    }
};
```
- Inside the devServer object we have 2 properties:
    - `contentBase`: absolute path which is gonna tell webpack dev server where the base directory is that we want to serve to the browser.
    - `publicPath`: this tells webpack where the actual assets are either javascript are being served of from.

- We need to tell this to the webpack server because when it serves up our files inside the publicPath to the browser, it doesn't actually serve up the real physical files inside it. Instead, it serves the virtual files that are stored in memory.and it uses the publicPath to serve this. bcause it the path that is linked from the index.html.

### Make a new script inside package.json
**package.json**
```
"serve": "webpack-dev-server"
```
Now we just need to run this command: 
```
$ npm run serve
```
