# Development Workflow

## Table of Contents

- [Introduction](#introduction)
- [Development Workflow](#workflow)
  - [Development Workflow Example Process](#process)
- [Automated Testing](#testing)

## Introduction

## Workflow

1. **Single point of information**: (Github issue tracker) - all app changes show up here as an issue.
2. **Code management**: (github repository)
3. **Workflow automation**: Where the app gets tested and built. (Github Actions)
4. **Stability Monitor**: Track information about the apps stability. Crashes or other problems should be made an issue in the **single point of information**. (Bugsnag, Sentry, Rollbar, Crashlytics)

## Process

1. When a new branch is created, the **single point of information** is updated with branch status.
2. Next, commits are made to the branch.
3. Commits are checked by the workflow automation tool.
4. If no errors and the work is done, make a pull request.
5. The pull request is checked again by workflow automation + more extensive checks (E2E tests).
6. If everything passes, update the **single point of information** issue for review.
7. If review decideds changes need to be made, go back to Step 1, else merge the code with the main branch.
8. Update the **single point of information** with featuret status. This should mostly be about closing the issue.

## Testing

1. **Unit tests**: Cover small parts of the business logic, ex. single functions
2. **Integration tests**: Similar to unit tests, but covers how multiple pieces of code integrate with each other.
3. **Component tests**: Native UI component testing
4. **E2E tests**: Simulates end user behavior and checks whether the whole application runs as expected.

> **Code Coverage** - should be high, (percentage of the code that is covered by automated testing)

> On top of automated testing, use StoryBook for manual component tests.
