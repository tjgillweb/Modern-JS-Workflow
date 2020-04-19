# Modern Javascript Workflow

## Using Babel
#### 1. Install [Node.js](https://nodejs.org/en/download/) (and npm) on your computer.
#### 2. **Initialize package.json**   
Use `npm init` to create a `package.json` file in the project directory
```
C:\...path\npm init
```

#### 3. Use npm to install babel/core and babel/cli packages
```
C:\...path\npm install @babel/core @babel/cli --save-dev
```

#### 4. Install the Babel preset(env) and register it in .babelrc
```
C:\...path\npm install @babel/preset-env --save-dev
```

**`.babelrc`**
```
{
    "presets": ["@babel/preset-env"]
}
```
