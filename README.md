<div align="center">
  <h1> 
    UofU RoommateFinder
  </h1>
</div>

#### Table of Contents
* [Local Development](#local-development)

# Local Development
These instructions should get you setup ready to work on RoommateFinder 🚀

## Getting Started 
1. Install `nvm` then `node` & `npm`: `brew install nvm && nvm install`
2. Install `watchman`: `brew install watchman`
3. Install dependencies: `npm install`
4. `npx pod-install ios`

> I use npm for everything, not yarn

> The current build is made for IOS, I have no idea what'll happen when you run this app on Android

## Running the IOS app 📱
* If you haven't already install Xcode tools and make sure to install the optional "IOS-Platform" package as well. This could take awhile.
  * After installation, check in System Settings that there's no update for Xcode. Otherwise, you may encounter issues later that don't explain that you solve them by updating Xcode.
* To install the iOS dependencies, run: `npm install && npm run pod-install`
* To run on a **Development Simulator**: `npm run ios`