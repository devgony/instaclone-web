# instaclone-web

# #8.1 Installing All (06:08)

```
npx create-react-app instaclone-web --template typescript
find src/ -type f -not \( -name App.tsx -or -name index.tsx \) -delete
```

## Ingredient

- styled component
- react hook form
- react router
- apollo client
- react helmet
- react-fontawesome

```
npm i styled-components react-hook-form react-router-dom @apollo/client graphql react-helmet-async
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
npm install --save @fortawesome/free-brands-svg-icons
npm install --save @fortawesome/free-regular-svg-icons
```

# #8.2 What Does Setup Mean?

## : Not only downloadg files and installing but also drawing the blueprint

- Router
- Authentication
- Architecture (where to put)
- Styles

# #8.3~4 Router Setup

## HashRouter VS BrowserRouter

- HashRouter: route with # but way easier to deploy
- BrowserRouter: no # but difficult to deploy
- Switch: rendere only one Route
- Exact: pattern match exatly

```js
mkdir src/screens
touch src/screens/Home.tsx
touch src/screens/Login.tsx
touch src/screens/NotFound.tsx
```

1. NotFound way

```js
<Route>
  <NotFound />
</Route>
```

2. Redirect

```js
<Redirect to="/" />
```

# #8.5 Auth POC

## state sample => bad for dependency => Use apollo client & local cache

## typescript for useState

```ts
type isLoggedInState = false | true;
export type setIsLoggedInState = React.Dispatch<
  React.SetStateAction<isLoggedInState>
>;
```

# #8.6 Reactive Variables

```ts
touch src/apollo.ts
export const isLoggedInVar = makeVar(false);

// App.tsx
const isLoggedIn = useReactiveVar(isLoggedInVar);

// Login.tsx
<button onClick={() => isLoggedInVar(true)}>Log in now!</button>
```
