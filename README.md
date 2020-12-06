# AntiRacistPlaylist

Project for HackDuke2020 - Inequality Track

Alex Chao, Priya Rathinavelu, Katherine Barbano

## Overview

This app, titled Diversify Your Spotify, serves to help users discover more underrepresented artists, which is especially difficult given the current xenophobia and discrimination within the music industry. This web app allows a user to create a playlist with a friend by logging into their spotify account, entering a specific artist, and sending it to their friend. The friend can see who sent them the request to finish a playlist, but they won’t be able to see who the artist was. Once the friend enters in their own artist, the app generates a playlist that slowly transitions between the two songs while inserting in underrepresented artists. 

This app is based on the design of Boil the Frog, which can create a playlist transitioning between two different artists. We expanded on this to allow friend collaboration and to spotlight underrepresented artists. We used React to build the web app, as well as MongoDB for storing information in the database. This app also utilizes the Spotify web developer API for account authentication and to save playlists. 

## Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm install`
To install the dependencies package.

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Sources

The template used for the React app was pulled from Open: https://github.com/cruip/open-react-template

The playlist generation idea and design had inspiration drawn from Boil the Frog https://github.com/Roon/boilthefrog


