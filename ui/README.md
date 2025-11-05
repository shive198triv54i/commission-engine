# Avalpha Technologies — Commission Calculator (Frontend)

This is the React frontend for the Commission Calculator app.

## Overview

- Built with Create React App (JavaScript)
- Provides a simple UI to send sales data to the backend and display commission results.

## Prerequisites

- Node.js (LTS) and npm installed: https://nodejs.org/

## Install & Run (Windows PowerShell)

Open PowerShell and run:

```powershell
Set-Location -Path 'd:\assignment3\Assesment-1\ui'
npm install
npm start
```

The dev server defaults to `http://localhost:3000`.

## Environment / API base URL

The frontend reads `API_BASE_URL` from `process.env.REACT_APP_API_BASE_URL`. The default in the code is `https://localhost:5000/api`.

To override in PowerShell for a single run:

```powershell
$env:REACT_APP_API_BASE_URL = 'https://localhost:5000/api'
npm start
```

Or create a `.env` file in the `ui` folder with:

```text
REACT_APP_API_BASE_URL=https://localhost:5000/api
```

## What the app calls

- POST `${API_BASE_URL}/Commision` with JSON payload:

```json
{
  "localSalesCount": 10,
  "foreignSalesCount": 5,
  "averageSaleAmount": 100
}
```

Backend response expected (current API):

```json
{
  "avalphaTechnologiesCommissionAmount": 550,
  "competitorCommissionAmount": 95.5
}
```

The Redux slice normalizes those keys to `avalphaTechnologiesCommission` and `competitorCommission` so the UI displays the values directly.

## Troubleshooting

- CORS 405 errors: ensure the backend CORS policy includes `http://localhost:3000` (scheme + host + port) and that the API is running on the configured `API_BASE_URL`.
- If the API is hosted with HTTPS and uses a dev/self-signed certificate, the browser may block requests; either install the cert or run the frontend to call the API via a matching origin or use the browser's dev certificate trust flow.

## Testing

1. Start the backend (see `api/README.md`).
2. Start the frontend (`npm start`).
3. Open `http://localhost:3000`, fill the form and click Calculate.
4. Inspect DevTools → Network to see the OPTIONS (preflight) and POST requests.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
