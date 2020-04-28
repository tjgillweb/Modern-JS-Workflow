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
- `module.exports` means that we are going to export a webpack configuration object which then node.js is going to process when we run the webpack command later.

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
---------------------------------------------------------------------------------------------------------------------------------------

### Production and Development Modes
- So, we have our Webpack Dev Server all setup and running now.
- But its only good when we're in development mode because at the minute, its only serving up these virtual files and its not spitting any real code out into bundle.js
- So, if we want to build this for production, we need to actually create the resulting bundle.js file so that then we can upload it to a server somewhere.

- So, inside `package.json`, we have the 'serve' script to run our webpack server. This is our development script which is good for when we're working on our site.
- But now, we're going to make another script which is actully going to produce our final bundle and spit out the real code.
- To do this we can simply use the webpack script we created before but without the watch flag because we want to build it only once when we build for production.
- For now, we will delete the babel script because we don't need it at the moment. We will eventually incorporate babel into our webpack 
```Javascript
"build": "node_modules/.bin/webpack",
"serve": "webpack-dev-server"
```
Now when we run the 'build' script, we can see all the code in bundle.js. Also, now if we want we can upload the dist folder to a server somewhere.
```Javascript
$npm run build
```
One thing to note here is whenever we run any webpack command, we get a warning message like so:
> WARNING in configuration  
  The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or     'production' to enable defaults for each environment.
  You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

- This is saying we've not set a mode for our script that we're running here. So, setting a mode for webpack tells you whether you're building for development or for production. 
- A `development mode` would make the webpack process and build much quicker. But the output files are not going to be optimized as much.
- The `production mode` will make the webpack process slower to run. However, it does much more to the code and makes the output file more efficient and smaller in file size which is what we want for production, when we upload the file.

To specify the modes:
```Javascript
"build": "node_modules/.bin/webpack --mode production",
"serve": "webpack-dev-server --mode development"
```
So, now we have one script for production and one script for development and we don't get the warning message.

---------------------------------------------------------------------------------------------------------------------------------------

### Babel and Webpack Together
- Currently the resulting code that we're serving to the browser has not been converted to older syntax that every browser understands.
- Although Webpack is now enabling us to use modules and bundle everything together, its also currently skipping out Babel which converts our code to older syntax.

- To introduce Babel back into our workflow, we edit the `webpack.config` file.
- **Loaders** in Webpack are like tasks that we can run on our code when its loaded via the module system i.e. loaded via some kind of import statement. And at that moment, when its loaded, we can run loaders or tasks on that code.
- So, we run a Babel Loader to convert that code to widely suppported syntax.

#### Configure the Babel Loader in `webpack.config` file
##### 1. Install babel-loader
```
$ npm install babel-loader --save-dev
```

##### 2. Create a Module Property
- The module property allows us to setup how module system works in webpack.
- We want to use a Babel Loader when our code is imported using webpack's module system.
- So any js file we write inside the src folder, we want to run through the Babel Loader.

- Inside rules object, we are basically doing two things:  
1) we're going to test for certain files because we want to run the Babel Webpack on certain files only(the .js files and not inside node_modules folder).  
2) which loader we want to run on those files.
```Javascript
 module:{
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
```
- This code is going to do the transformation everytime the Webpack bundles our code(everytime we run the build command).
- Not only can we now use modules, but we can also use Babel now to convert our modern JS code into wiidely supported older syntax.
