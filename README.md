# Researchly (MDM Work Sample)

Researchly is a Chrome Extension for users to bookmark websites in shared folders. This repository contains the 3 applications required to run the extension:

- Chrome Extension
- Server
- Web

## Orienting the code

This turborepo uses [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) as a package manager. It includes the following packages/apps (written in [TypeScript](https://www.typescriptlang.org/)):

- `extension`: [Chrome extension](https://developer.chrome.com/docs/extensions) built on Manifest v3 and ReactJS.
- `server`: This is a Node.js server built on [NestJS](https://nestjs.com).
- `web`: This is a [Next.js](https://nextjs.org) web app, primarily used to handle authentication.
- `ui`: a stub React component library shared by both `extension` and `web` applications.
- `scripts`: `jest` scripts and `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- `tsconfig`: `tsconfig.json`s used throughout the monorepo.

### Chrome Extension

The development code for the extension is placed in the `src` folder, including the extension manifest. Notable files consist of the following:

- `extension/src/manifest.json`: [The Manifest file](https://developer.chrome.com/docs/extensions/reference/manifest) lists important information about the structure and behavior of the extension. This is also the entrypoint for the extension.
- `extension/src/pages/Background/index.ts`: Source code for the extension's [service workers](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers).
- `extension/src/components/Dashboard/index.tsx`: Source code for the extension popup when the user has logged in. Most of the UI lies inside the `Application` function.
- `extension/src/components/Unauth.tsx`: Source code for the extension popup when the user isn't logged in.

### Server

The server performs the following functions:

- Manages real-time socket connections between users.
- Accesses the database for CRUD operations relating to:
  - Authentication.
  - Users data.
  - Collections data (akin to bookmarks folders).
  - Links data (akin to bookmarks).

The tech stack consists of [NestJS](https://nestjs.com) (the framework), [MongoDB](https://cloud.mongodb.com/) (database), and [Prisma](https://www.prisma.io/) (database ORM). Notable files include the following:

- `server/prisma/schema.prisma` - Contains the database schema.
- `server/src/sockets/sockets.gateway.ts` - Contains the socket event handlers.
- `server/src/<module>/<module>.controller.ts` - Contains the controller logic for that module.
- `server/src/<module>/<module>.service.ts` - Contains the business logic for that module. For database modules, this would contain Prisma ORM methods.

### Web

This ReactJS app is built on [Next.js](https://nextjs.org/docs) and follows its [Pages Router folder structure](https://nextjs.org/docs/getting-started/project-structure). I did not get around to building a Landing page at the time before discontinuing the project, so the main notable files can be found in `web/pages/login.tsx` and `web/pages/signup.tsx`. Both these page files use the same `AuthForm` component.

### Environment variables

For the purposes of the MDM 2024 application, I have git-included the environment variables in the following files:

- Chrome Extension: `app/extensions/secrets.development.js`
- Server: `app/server/.env`
- Website: `app/web/.env.local`

## Running the extension

I have submitted the extension to the Chrome Web Store. [Feel free to install it from this link](https://chromewebstore.google.com/detail/researchlyus/omhabljpdjjboigejhophhfejlhghgpl?hl=en).

Alternatively, if you wish to run the extension locally, please follow the instructions below:

### Prerequisites for running locally

- Node.js (v14 or later)
- Yarn (package manager)
- Google Chrome

### Starting local development

1. Run `yarn install` to install the dependencies.
2. Run `yarn extension:build` to generate the extension build folder.
3. Load the extension on Chrome:
   1. Access `chrome://extensions`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `apps/extension/build` folder.
4. Run `yarn dev` to concurrently start the server, extension and website.
5. Pin the Researchly Extension for easy access.
