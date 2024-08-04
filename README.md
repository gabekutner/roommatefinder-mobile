<<div align="center">
  <img src=".github/dormparty-red-app.png" height="200" alt="Dorm Party Icon">
  <h1>Dorm Party</h1>
</div>

#### Table of Contents

- [Local Development](#local-development)
- [Directory Structure](#directory-structure)

# Local Development

These instructions should get you setup ready to work on DormParty 🚀

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