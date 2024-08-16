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
* [Contributing](#contributing)

# Technologies Used
* ⚛️ [React Native CLI](https://reactnative.dev/)
* 🐻 [Zustand State Management](https://github.com/pmndrs/zustand)
* ⚡ [Fast Image](https://github.com/DylanVann/react-native-fast-image)
* 🧭 [React Navigation](https://reactnavigation.org/)
* 🖥️ [Axios](https://github.com/axios/axios)
* 🚀 [FontAwesome](https://fontawesome.com/)
* 🌐 [React Native Paper](https://reactnativepaper.com/)
* 🖼️ [React Native Image Picker](https://www.npmjs.com/package/react-native-image-picker)
* 🔒 [React Native Encrypted Storage](https://www.npmjs.com/package/react-native-encrypted-storage)

> Check out the live app! [Dorm Party Demo](https://gabekutner.github.io/roommatefinder-mobile/)

# Getting Started
### 🍴 Fork and Clone the Repo

1. **Fork the Repo:** Click the "Fork" button on the top right of this repository. If you're new to forking, check out this [YouTube Guide](https://www.youtube.com/watch?v=h8suY-Osn8Q).

2. **Clone Your Fork:** Click the Clone or Download button on the top right of your forked repo and clone it:

  ```bash
    git clone https://github.com/your-username/roommatefinder-mobile.git
  ```

3. **Navigate to the Directory**:
   
  ```bash
    cd roommatefinder-mobile
  ```
   
### ⬇️ Running the Development Server

1. **Install Dependencies:**
   
    * Install `nvm` then `node` & `npm`:
  
      ```bash
        brew install nvm && nvm install
      ```

   * Install `watchman`:

     ```bash
        brew install watchman
      ```

   * Install Xcode tools and make sure the optional "iOS Platform" package is installed.

2. **Install Project Dependencies**:

   ```bash
      npm install
    ```

3. **Install CocoaPods Dependencies**:

    ```bash
      npx pod-install
    ```

4. **Configure the Backend**:

    * Make sure the Django REST backend is running. Don't worry this is super easy, follow the instructions in that repository here: https://github.com/gabekutner/roommatefinder-backend.
  
    * Update the API address in `src/constants/apiConstants.ts`:

      ```typescript
        const ADDRESS = "http://<YOUR_IP_ADDRESS>:8000";
      ```

5. **Start the Project!**

  ```bash
    npm start
  ```

These instructions should get you set up ready to work on Dorm Party 🎉

# Features
### 👀 Basic
- Login and registration with JWT token
- Create profile

### 👤 Your profile
- Update personal information
- Add photos

### 💃 Swipe profiles
- Send message requests
- View profile details
- View roommate matching quiz

### 💬 Friends and chats
- Chat with friends

### 🔗 Matchmaking algorithm
- Based on sex, dorm building, common interests, major, state, and more (details in the backend).

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

1. **Fork the Repository:** Click the "Fork" button on the top right of this repository.

2. **Clone Your Fork:** Clone your forked repository to your local machine:

    ```bash
    git clone https://github.com/your-username/roommatefinder-mobile.git
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
