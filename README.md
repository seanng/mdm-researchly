# Researchly (MDM Work Sample)

Researchly is a Chrome Extension for users to bookmark websites in shared folders.

This repository contains 3 applications:

- Chrome Extension
- Server
- Web

I have git-included `app/extensions/secrets.development.js`, `app/web/.env.local` and `app/server/.env` for the purposes of the MDM 2024 application.

## Prerequisites

- Node.js (v14 or later)
- Yarn (package manager)
- Google Chrome

## Running locally

1. Run `yarn install` to install the dependencies.
2. Run `yarn extension:build` to generate the extension build folder.
3. Load the extension on Chrome:
   1. Access `chrome://extensions`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `apps/extension/build` folder.
4. Copy the extension's ID as shown in `chrome://extensions` and paste it inside `apps/web/.env.local`, replacing <YOUR_EXTENSION_ID>.
5. Run `yarn dev` to simultaneously start the server, extension and website.
6. Pin the Researchly Extension for easy access.

## Tech Stack

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps (all written in [TypeScript](https://www.typescriptlang.org/)):

### Apps and Packages

- `extension`: [Chrome extension](https://developer.chrome.com/docs/extensions) built on Manifest v3 and ReactJS.
- `server`: This is a Node.js server built on [NestJS](https://nestjs.com). It is used to handle real-time socket connections between users, and is connected to a Cloud MongoDB database, which I have set up for the purposes of the MDM application.
- `web`: This is a [Next.js](https://nextjs.org) web app, primarily used to handle authentication.
- `ui`: a stub React component library shared by both `extension` and `web` applications.
- `scripts`: `jest` scripts and `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- `tsconfig`: `tsconfig.json`s used throughout the monorepo.
