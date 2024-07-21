<div align="center">
  <h1> 
    UofU RoommateFinder
  </h1>
</div>

#### Table of Contents

- [Local Development](#local-development)

# Local Development

These instructions should get you setup ready to work on RoommateFinder 🚀

## Getting Started

1. Install `nvm` then `node` & `npm`: `brew install nvm && nvm install`
2. Install `watchman`: `brew install watchman`
3. Install dependencies: `npm install`
4. Run iOS Pod Install: `npx pod-install ios`

> The current build is made for IOS, Android compatibility is being worked on.

## Running the IOS app 📱

- If you haven't already, install Xcode tools and make sure to install the optional "IOS-Platform" package as well. This could take awhile.
  - After installation, check in System Settings that there's no update for Xcode. Otherwise, you may encounter vague issues.
- To install the iOS dependencies, run: `npm install && npm run pod-install`.
- To run on a **Development Simulator**: `npm run ios`.

> In development, I've been using the `iPhone SE` and/or `iPhone 15 Pro Max`. There's no difference between which one you choose other than size.
