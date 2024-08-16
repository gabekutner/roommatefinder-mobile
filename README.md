<div align="center">
  <img src=".github/dormparty-red-app.png" height="200" alt="Dorm Party Icon">
  <h1>Dorm Party</h1>
</div>

An app where incoming college freshmen can find dorm roommates.
<br>
<br>
**This is just the frontend of the app, if you're looking for the backend: https://github.com/gabekutner/roommatefinder-backend**

#### Table of Contents
* [Technologies Used](#technologies-used)
* [Local Development](#getting-started)
* [Features](#features)
* [Project Structure](#project-structure)

# Technologies Used
* ⚛️ React Native CLI https://reactnative.dev/
* 🐻 Zustand State Management https://github.com/pmndrs/zustand
* ⚡ Fast Image https://github.com/DylanVann/react-native-fast-image
* 🧭 React Navigation https://reactnavigation.org/
* 🖥️ Axios https://github.com/axios/axios
* 🚀 FontAwesome https://fontawesome.com/
* 🌐 React Native Paper https://reactnativepaper.com/
* 🖼️ React Native Image Picker https://www.npmjs.com/package/react-native-image-picker
* 🔒 React Native Encrypted Storage https://www.npmjs.com/package/react-native-encrypted-storage

> Check out what the app looks like here! https://gabekutner.github.io/roommatefinder-mobile/

# Getting Started
### 🍴 Fork and Clone the Repo

First, you need to fork the `roommatefinder-mobile` repo. You can do this by clicking the Fork button on the top right corner of the repo. If you are new to forking, please watch this [YouTube Guide](https://www.youtube.com/watch?v=h8suY-Osn8Q) to get started.

Once forked, you can clone the repo by clicking the `Clone or Download` button on the top right corner of the forked repo. 

Please change the directory after cloning the repository using the `cd <folder-name>` command.

### ⬇️ Running the Development Server
To run the development server, make sure you have the following dependencies set up on your computer:

1. Install `nvm` then `node` & `npm`: `brew install nvm && nvm install`
2. Install `watchman`: `brew install watchman`
* If you haven't already, install Xcode tools and make sure to install the optional "IOS-Platform" package as well. This could take awhile.
  * After installation, check in System Settings that there's no update for Xcode. Otherwise, you may encounter vague issues.
 
After, install package dependencies using `npm`.
```bash
npm i
```

Then run the CocoaPods install.
```bash
npx pod-install
```

Before you run the `npm start` you have to configure and run the backend api. Don't worry this is super easy and requires no knowledge of Python or Django Rest to get this going. I've already wrote about how to do that in the backend's README, so here's that repo again: https://github.com/gabekutner/roommatefinder-backend.

To connect to the backend api once you have it up and running go to the `src/constants/apiConstants.ts` file and change the `const ADDRESS = "10.0.0.49:8000";` to the ip address of you're computer. 

And finally, run the project!
```bash
npm start
```

These instructions should get you set up ready to work on Dorm Party 🎉

# Features
### 👀 Basic
- Login and registration with jwt token
- Create profile

### 👤 Your profile
- Update your personal information
- Add photos

### 💃 Swipe profiles
- Send message requests
- View profile details
- View roommate matching quiz

### 💬 Friends and chats
- Chat with your friends

### 🔗 Matchmaking algorithm
List based on
- Sex
- Your dorm building
- Common interests
- Your major
- State
- More of the algorithm in the backend!

# Project Structure
Most of the code is located in the `src/` folder. Here's a brief overview: 
* **assets** : Images, fonts, theme, and constant data.
* **components** : Reusable UI components.
* **constants** : Constants used throughout the app (mostly deprecated).
* **core** : Core functionalities (mostly deprecated).
* **libs** : Zustand state management (`store/`), util functions, api definition, device storage.
* **navigators** : Navigation configuration (Auth and App Navigation).
* **types** : Typescript types for the parts of the app that use typescript.
* **views** : Screen components organized in folders, with each folder containing an `index.js` file used for navigation.

# Contributing
To contribute code changes, please follow these steps:

1. **Fork the Repository:** Click the "Fork" button on the top right of this repository to create a copy under your GitHub account.

2. **Clone Your Fork:** Clone your forked repository to your local machine:

    ```bash
    git clone https://github.com/gabekutner/roommatefinder-mobile.git
    ```

3. **Create a Branch:** Create a new branch for your changes:

    ```bash
    git checkout -b your-branch-name
    ```

4. **Make Changes:** Implement your changes on this branch.
   
7. **Commit Changes:** Commit your changes with commit message letting me know what you did:

    ```bash
    git add .
    git commit -m "Add a descriptive message about the change"
    ```

8. **Push to Your Fork:** Push your branch to your forked repository:

    ```bash
    git push origin your-branch-name
    ```

9. **Create a Pull Request:** Open a pull request (PR) from your branch to the `main` branch of the original repository. Give a description of your changes and reference any related issues.

    - **Title:** A beautiful title for your PR.
    - **Description:** Explain what changes were made, why they were made, you get the gist.
      
11. **Celebrate:** Once your PR is merged, celebrate!! 🎉











