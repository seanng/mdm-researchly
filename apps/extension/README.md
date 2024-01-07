<img src="src/assets/img/logo-128.png" width="64"/>

# Chrome Extension Application

This Chrome Extension application uses webpack to bundle the build, load CSS easily and [automatic reload the browser on code changes](https://webpack.github.io/docs/webpack-dev-server.html#automatic-refresh).

The following technologies are used to build the extension:

- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)
- [React 17](https://reactjs.org)
- [Webpack 5](https://webpack.js.org/)
- [Webpack Dev Server 4](https://webpack.js.org/configuration/dev-server/)
- [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)

This repo was heavily inspired by [https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate), with additional support for React 17 features, Webpack 5, and Webpack Dev Server 4.

## Structure

All of the extension's development code is placed in the `src` folder. The development webpack config is in `bundler/webserver.js`, and the production webpack config is in `bundler/build.js`.

## Installing and Running

### Prerequisites

- Node.js (v14 or later)
- Yarn (package manager)
- Google Chrome

### Starting Local Development

1. Make sure you are in this package repository (extension)
1. Run `yarn install` to install the dependencies.
1. Run `yarn build` to generate the extension build folder.
1. Load the extension on Chrome:
   1. Access `chrome://extensions`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `apps/extension/build` folder.
1. Run `yarn dev` to start the development server.
1. Pin the Researchly Extension for easy access.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 yarn dev
```

## Packing

After development, run the command:

```
$ NODE_ENV=production yarn build
```

Afterwards, the content of `build` folder will be the extension ready to be submitted to the [Chrome Web Store](https://developer.chrome.com/webstore/publish).
