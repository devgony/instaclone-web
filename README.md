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
npm i --save-dev @types/styled-components
npm i --save-dev @types/react-router-dom
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

# #8.7 Introduction to Styled Components

1. styled is just component => can use props
2. can even use `css` with props ternary
3. use props with ${() => {}} callback
4. use ts like `styled.h1<{ potato: potatoState }>`

```ts
const Title = styled.h1<{ potato: potatoState }>`
  color: ${props => (props.potato ? "palevioletred" : "beige")};
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  ${props =>
    props.potato
      ? css`
          font-size: 49px;
        `
      : css`
          text-decoration: underline;
        `}
`;

const Container = styled.div`
  background-color: tomato;
`;

const TogglePotato = styled.button`
  color: red;
`;

type potatoState = false | true;

const Login = () => {
  const [potato, setPotato] = useState<potatoState>(false);
  const togglePotato = () => setPotato(current => !current);

  return (
    <Container>
      <Title potato={potato}>Login</Title>
      <TogglePotato onClick={togglePotato}>Toggle Potato</TogglePotato>
    </Container>
  );
};
```

# #8.8 Themes on Styled Components

- ThemeProvider

```js
const lightTheme = { fontColor: "#2c2c2c", bgColor: "lightgray" };
const darkTheme = { fontColor: "lightgray", bgColor: "#2c2c2c" };
<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>...</ThemeProvider>;
```

# #8.9 GlobalStyles on Styled Components

1. GlobalStyles get access to props of parent(ThemeProvider) which is props.theme.bgColor
2. Move ternary from Component(Login) to GlobalStyles
3. Best way to unify type and variable?

```js
npm i styled-reset

//touch src/styles.ts
enum Color {
  LIGHT = "lightgray",
  DARK = "#2c2c2c",
}
...
export const GlobalStyles = createGlobalStyle<{
  theme: { bgColor: Color.LIGHT | Color.DARK };
}>`
    ${reset}
    body {
        background-color: ${props => props.theme.bgColor};
    }
`;

// App.tsx
...
return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
```

# #9.0 Styled Components with TS setup

1.  Create interface module at `'d'`eclaration file => override `DefaultTheme`
    - Props can be recognized by overridden `DefaultTheme`

```js
// touch src/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
  }
}
```

2. Use interfate

```js
export const lightTheme: DefaultTheme = {
  fontColor: "2c2c2c",
  bgColor: "lightgray",
};
```

# #10.1 Login UI Clone

1. extending styled component: `styled(WhiteBox)`

```js
const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
`;
const BottomBox = styled(WhiteBox)`
  padding: 10px 0px;
  text-align: center;
`;
```

2. targeting html child (nested)

```js
const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
```

## Add google font

```html
<!-- public/index.html -->
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

# #10.2 Cleaning Login Code

```js
touch src/screens/SignUp.tsx
```

- Add <SignUP /> to App.tsx
- Use react-fontawesome
- Reset more than styled-reset

```js
// styles.ts
export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:rgb(38, 38, 38);
    }
    a {
      text-decoration: none;
    }
`;
```

# #10.3 Shared Components

- centralize routes with routes.ts

```js
mkdir -p src/components/auth

// src/routes.ts
const routes = {
  home: "/",
  signUp: "/sign-up",
};
export default routes;
```

```js
touch src/components/auth/AuthLayout.tsx
touch src/shared.tsx
touch src/components/auth/Button.tsx
touch src/components/auth/Separator.tsx
touch src/components/auth/Input.tsx
touch src/components/auth/FormBox.tsx
touch src/components/auth/BottomBox.tsx
```
