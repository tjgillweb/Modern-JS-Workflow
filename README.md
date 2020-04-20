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
"webpack": "node_modules/.bin/webpack"
}
...
```
To run the webpack we use: 
```
...path> npm run webpack
```


