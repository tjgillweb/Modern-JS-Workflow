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
"scripts": "node_modules/.bin/babel src/index.js -w -o dist/assets/bundle.js"
...
```

- Now, to run the coversion, we just need to type this command on the terminal once:
```
C:\...path> npm run babel
```

