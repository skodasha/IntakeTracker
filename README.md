# Nozomi Full Stack Tech Task \[React Native\]

Project documentation can be found in `docs` folder

## Prerequisites

- Node.js @20.x or higher
- Yarn package manager

## Installation

```
cp .env.example .env
yarn
```

## How to run

```
yarn ios
yarn android
```

## Project renaming

After installing dependencies run 
```
yarn rename <NewProjectName> <BundleIdForAndroid>
```
BundleIdForAndroid is custom Bundle Identifier like com.reactnativetemplate

After the script has finished running search in your IDE old project`s name and replace to new one manually. There are a few places where script cannot replace namings automatically. Red ones should be on lowercase and match your BundleIdForAndroid and yellow ones should match your NewProjectName
