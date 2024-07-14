# Coding Standards

## Table of Contents

- [Introduction](#introduction)

## Introduction

For almost all of our code style rules, refer to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

When writing ES6 or React code, please also refer to the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react).

## Component Folders

So far, we write our component with its business logic, UI, style, and types in one file. This will change now. We’ll split our components into the following:

- index.js: The index file contains the business logic of the component such as data fetching, as well as the connection to the global application state. It only renders the following .view component.
  
- [component].view.jsx: The view file contains the UI. It doesn’t hold its own state nor does it connect directly to the global application state. It only renders the props it gets from the index file.
  
- [component].styles.jsx: The styles file contains the React Native StyleSheet or the styled-components, depending on which approach you chose. Refer to the `contributing/STYLING.md` file.

Example folder component structure:
```bash
├── component
│   ├── components│   
│   │  ├── component
│   │  │  ├── component
│   │  │  └── index.js
│   │  │  └── component.view.js
│   ├── index.js
│   └── component.styles.js
│   └── component.view.js
```

With this separation, we enable two things. First, it is much easier to have one developer work on the business logic and one on the UI, without creating merge conflicts or other problems. Second, our components now have much better support for automated testing.

We can use any component testing framework to render and test the views without having to mock our global state or our component state. And in addition to that, it’s much easier to integrate tools such as Storybook with this approach.


