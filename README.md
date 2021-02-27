# Project Instructions - News Article App

The goal of this project is to practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

## Setting up the Project

cd  project directory
-  npm install
Choose the required installation for the development mode
- npm i -D @babel/core @babel/preset-env babel-loader
- npm i -D style-loader node-sass css-loader sass-loader
- npm i -D clean-webpack-plugin
- npm i -D html-webpack-plugin
- npm i -D mini-css-extract-plugin
- npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin

## Setting up the API

I have used the MeaningCloud Sentiment Analysis API for this project. Sign up [here] : [https://www.meaningcloud.com/developer/sentiment-analysis] to get your API key.

### API: Environment Variables
Next we need to declare our API keys, but there's a problem with this. We are going to put our personal API keys in a file and when we push, this file will be available publicly on Github. Showing private keys publicly is not a good thing. So, we have to find out a way to make sure it's not publicly visible. We can achieve this by using the environment variables. Environment variables are pretty much like normal variables.

- [ ] Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:
API_KEY=**************************
```
- [ ] Add this code to the very top of your server/index.js file:
```
const dotenv = require('dotenv');
dotenv.config();
```
- [ ] Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:
```
console.log(`Your API key is ${process.env.API_KEY}`);