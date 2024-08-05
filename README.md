<<div align="center">
  <img src=".github/dormparty-red-app.png" height="200" alt="Dorm Party Icon">
  <h1>Dorm Party</h1>
</div>

#### Table of Contents
* [Project Description](#project-description)
* [Local Development](#local-development)
* [Directory Structure](#directory-structure)
* [Contributing Workflows](#contributing)
* [Contact](#contact)
* [Important](#important)


# Project Description
This repository is the frontend repository for the Dorm Party mobile app. 
> Here's the link to the frontend repository: https://github.com/gabekutner/roommatefinder-backend

The Dorm Party app will be published in Spring 2025 for freshmen at the University of Utah. 

# Local Development
### 🍴 Fork and Clone the Repo

First, yu need to fork the `roommatefinder-mobile` repo. You can do this by clicking the Fork button on the top right corner of the repo. If you are new to forking, please watch this [YouTube Guide](https://www.youtube.com/watch?v=h8suY-Osn8Q) to get started.

Once forked, you can clone the repo by clicking the `Clone or Download` button on the top right corner of the forked repo. 

Please change the directory after cloning the repository using the `cd <folder-name>` command.

### ⬇️ Running the Development Server
To run the development server, make sure you have to have the following dependencies set up on your machine:

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

To connect to the backend api, which you should have running for easier development (see how [**here**](https://github.com/gabekutner/roommatefinder-backend/tree/main?tab=readme-ov-file#local-development), go to the `src/constants/apiConstants.ts` file and change the `const ADDRESS = "10.0.0.49:8000";` to whatever the address is of the api you're running.  

Finally, run the project.
```bash
npm start
```

These instructions should get you set up ready to work on Dorm Party 🎉

# Contributing
Thanks for taking the time, first of all! Second, contributing is really simple. Follow the installation steps and create a pull request. As far as finding issues to work on, issues with the `FirstIssue` label are good for starters. 

Find that here: https://github.com/gabekutner/roommatefinder-mobile/labels/FirstIssue
