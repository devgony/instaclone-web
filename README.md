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
npm i styled-components react-hook-form@6.15.1 react-router-dom @apollo/client graphql react-helmet-async
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
// styles.ts
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

- Centralize routes with routes.ts

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
touch src/components/shared.tsx
touch src/components/auth/Button.tsx
touch src/components/auth/Separator.tsx
touch src/components/auth/Input.tsx
touch src/components/auth/FormBox.tsx
touch src/components/auth/BottomBox.tsx
```

# #10.4 Sign Up UI

## Don't need React.FC to pass props.. just export style component.

```js
// src/components/auth/Button.tsx
// src/components/auth/Input.tsx
```

## Creat FatLink at `shared.tsx`

## Copy from Login.tsx to SignUp.tsx

```js
// src/screens/SignUp.tsx
```

# #10.6 Helmet Component

```js
// src/App.tsx
return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
```

```js
// touch src/components/PageTtitle.tsx
const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
};

// src/screens/Login.tsx
<PageTitle title="Login" />
// src/screens/SignUp.tsx
<PageTitle title="Sign up" />
```

# #10.7 React Hook Form

```js
// src/screens/Login.tsx
const { register } = useForm();
```

## 1. Should give ref and name for sure

## 2. Validation - use register validation instead of html required

- custom validate

```js
<Input
  ref={register({
    required: "Username is required.",
    minLength: {
      value: 5,
      message: "Username should be more than 5 chars.",
      validate: currentValue => currentValue.includes("potato"),
    },
  })}
  name="username"
  type="text"
  placeholder="Username"
  hasError={Boolean(errors?.username?.message)}
/>
```

## 3. handleSubmit

```js
<form onSubmit={handleSubmit(onSubmitValid, onSubmitInValid)}>
```

## 4. formState - mode: onChange, onBlur: when de-focused

## 5. shared `FormError.tsx`

```js
// touch src/components/auth/FormError.tsx
```

## 6. Define type at StyledComponent and use custom props

```js
// src/components/auth/input.tsx
const Input = styled.input<{ hasError?: boolean }>`
...
    ${props => (props.hasError ? "tomato" : props.theme.borderColor)};
```

# #10.9 Apollo Client

## Add apollo with Cache

```js
// apollo.ts
export const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});
```

## Cover with apolloProvider

```js
/// App.tsx
return (
    <ApolloProvider client={client}>
```

# #10.10 Login part One

## configure `apollo:codegen`

## This project doesn't have globalTypes => `--globalTypesFile false`

```js
// touch apollo.config.js
module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "instaclone-backend",
      url: "http://localhost:4001/graphql",
    },
  },
};

// package.json
"apollo:codegen": "rimraf src/**generated** && apollo client:codegen src/**generated** --target=typescript --outputFlat --globalTypesFile false",
"start": "npm run apollo:codegen & react-scripts start",
```

# #10.11 Login part Two

## `clearErrors` onChange

## save token to localStorage at `Login.tsx`

## `logUserIn, logUserOut` at `apollo.ts`

# #10.12 Create Account (`SignUp.tsx`)

# #10.13 Redirecting Users

## Send parameter when push history

```js
history.push(routes.home, {
  message: "Account created. Please log in.",
  username,
  password,
});
```

### Get colors: `https://flatuicolors.com/palette/defo`

## DefaultValues - at ts, need to define all

```js
useForm({
  mode: "onChange",
  defaultValues: {
    username: location?.state?.username || "",
    password: location?.state?.password || "",
    result: undefined,
    message: undefined,
  },
});
```

## Homework: Why only 2nd push way works?

# #10.14 Dark Mode

## 1. darkModeVar at `apollo.ts`

```js
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};
```

## 2. `DarkModeBtn` at Footer of `AuthLayout.tsx`

```js
const darkMode = useReactiveVar(darkModeVar);
...
<Footer>
  <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
  </DarkModeBtn>
</Footer>
```

## 3. props.theme to `styles.ts`

```js
background-color: ${props => props.theme.bgColor};
color: ${props => props.theme.fontColor};
```

## 4. BaseBox of `shared.ts`

```js
export const BaseBox = styled.div`
  background-color: ${props => props.theme.bgColor};
  border: 1px solid ${props => props.theme.borderColor};
```

# #9.1 React Hook Form

```ts
// just example.
interface IForm {
  name: string;
  lastName?: string;
}

const { register, handleSubmit, getValues } = useForm<IForm>();
```

## case#1. onSubmitValid with `SubmitHandler<IForm>` - too verbose

```js
const onSubmitValid: SubmitHandler<IForm> = data => {
  const { name, lastName } = data;
};
```

## case#2. onSubmitValid with `getValues()`

```js
const onSubmitValid = () => {
  const { name, lastName } = getValues();
};
```

## Homework: how to handle `result`, `message` at `Login.tsx`?

# #9.2 GraphQL

## install apollo globally

```js
npm install -g apollo

// package.json
"apollo:codegen": "rimraf src/__generated__ && apollo client:codegen src/__generated__ --target=typescript --outputFlat --globalTypesFile false",

// Login.tsx
const [login, { loading, data }] = useMutation<login, loginVariables>(
```

## If onComplete is used with anonymous callback, don't need additaional type

# #11.0 Header and Layout

## enclose with Layout.tsx

```js
touch src/components/Header.tsx
touch src/components/Layout.tsx

// App.tsx
{isLoggedIn ? (<Layout><Home /></Layout>) : (<Login />)}
```

# #11.1 Header part Two

## enclose `Header.tsx` with isLoggedInVar for security just in case

```js
// Header.tsx
isLoggedIn ? ...
: (<Link to={routes.home}><Button>Login</Button></Link>)
```

## Backend: Add me resolver

## me should be shared

```js
mkdir src/hooks
touch src/hooks/useUser.ts
```

# #11.2 Header part Three

## For protected resolver like `me`, should concat token to httpHeader

```js
// apollo.ts
const httpLink = createHttpLink({
  uri: "http://localhost:4001/graphql",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

## login => corrupt token => redirect to login => login doesn't work => use `fetchPolicy: "no-cache"`

# #11.3 Avatar

## useUse return user data => if data, show avatar at `Header.tsx

## create Avatar component

```js
touch src/components/Avatar.tsx
```

## Extend with partial type + intersection

```js
React.FC<Partial<me_me> & lg>
```

# #11.4 Photo Component part One

## The main course of frontend

## seeFeed at `Home.tsx`

## FatText at `shared.tsx`

# #11.6 isLiked

## add isLiked to backend and Home.tsx

## Use SolidHeart

```js
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
```

# #11.7 Liking Photos

## Separate photo from `Home.tsx` to `Photo.tsx`

```js
mkdir src/components/feed/
touch src/components/feed/Photo.tsx
```

## TS onClick should be enclosed by `()=>{}`

```js
<PhotoAction onClick={() => toggleLikeMutation()}>
```

# #11.8 Refetching Queries ~ #11.9

- why serve variables at definition?

## 1. apollo cache indirect mode: refetch? => only when it is tiny or it is too burden

```js
// Photo.tsx
refetchQueries: [{ query: FEED_QUERY }],
```

## 2. by fragment manually

### Use type MutationUpdaterFn<toggleLike>

### fragment name can be any

```js
const updateToggleLike: MutationUpdaterFn<toggleLike> = (cache, result) => {
  if (result.data?.toggleLike.ok) {
    cache.writeFragment({
      id: `Photo:${id}`,
      fragment: gql`
        fragment BullshitNAME on Photo {
          isLiked
        }
      `,
      data: {
        isLiked: !isLiked,
      },
    });
  }
};
```

# #11.10 readFragment

## readFragment: What if we don't have info from React props

```js
// Photo.tsx
const updateToggleLike: MutationUpdaterFn<toggleLike> = (cache, result) => {
  if (result.data?.toggleLike.ok) {
    const fragmentId = `Photo:${id}`;
    const fragment = gql`
      fragment BullshitNAME on Photo {
        isLiked
        likes
      }
    `;
    const dataFromFragment =
      cache.readFragment <
      seeFeed_seeFeed >
      {
        id: fragmentId,
        fragment,
      };
    if (
      dataFromFragment &&
      "isLiked" in dataFromFragment &&
      "likes" in dataFromFragment
    ) {
      const { isLiked, likes } = dataFromFragment; // just in case if no data at props
      cache.writeFragment({
        id: fragmentId,
        fragment,
        data: {
          isLiked: !isLiked,
          likes: isLiked ? likes - 1 : likes + 1,
        },
      });
    }
  }
};
```

# #11.11 Comments part One (11:31)

## BACKEND: modify comments => commentNumber

## BACKEND: add comments: comment[]

## Comments, Comment, CommentCaption to Photo.tsx

# #11.12 Comments part Two (10:30)

## add `comment?.payload`

## separate Comment from `Photo.tsx` to `Comments.tsx`

## Use Pick Utility Type

```js
// touch src/components/feed/Comments.tsx
  Pick<seeFeed_seeFeed, "user" | "caption" | "commentNumber" | "comments">
```

## Homework: How to change type's key name? from user to author?

## separate Comment from `Comments.tsx` to `Comment.tsx`

```js
touch src/components/feed/Comment.tsx
```

# #11.13 Parsing Hashtags (12:02)

## sanitize-html: clean dangerous HTML

## dangerouslySetInnerHTML: escape from React's HTML protection

```js
npm i sanitize-html
npm i --save-dev @types/sanitize-html
// Comment.tsx
const cleanedPayload = sanitizeHtml(
    payload.replace(/#[\w]+/g, "<mark>$&</mark>"),
    {
      allowedTags: ["mark"],
    }
  );
  return (
    <CommentContainer>
      <FatText>{username}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
    </CommentContainer>
  );
```

# #11.14 Parsing Hashtags part Two (12:18)

## To use Link, change from sanitize-html to maped component

```js
<CommentCaption>
  {payload.split(" ").map((word, index) =>
    /#[\w]+/.test(word) ? (
      <React.Fragment key={index}>
        <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
      </React.Fragment>
    ) : (
      <React.Fragment key={index}>{word} </React.Fragment>
    )
  )}
</CommentCaption>
```

## Homework: parse @\w

# #11.15 cache Modify (05:10)

## Easier way to edit cache: modify of Apollo 3

```ts
// Photo.tsx
// remove readFragment, writeFragment
const updateToggleLike: MutationUpdaterFn<toggleLike> = (cache, result) => {
  if (result.data?.toggleLike.ok) {
    const photoId = `Photo:${id}`;
    cache.modify({
      id: photoId,
      fields: {
        isLiked(prev) {
          return !prev;
        },
        likes(prev) {
          if (isLiked) {
            return prev - 1;
          }
          return prev + 1;
        },
      },
    });
  }
};
```

# #11.16 Create Comment part One (06:44)

## useForm

## CREATE_COMMENT_MUTATION

## onSubmitValid, clean input with setValue

# #11.17 Create Comment part Two (12:22)

## BACKEND: add id to MutationResponse

## Fake new comment at cache

### get userData from `useUser()`

```ts
// Comments.tsx
if (ok && userData?.me) {
  const newComment = {
    __typename: "Comment",
    createdAt: Date.now() + "",
    id,
    isMine: true,
    payload,
    user: {
      ...userData.me,
    },
  };
  cache.modify({
    id: `Photo:${photoId}`,
    fields: {
      comments(prev) {
        return [...prev, newComment];
      },
      commentNumber(prev) {
        return prev + 1;
      },
    },
  });
}
```

# #11.18 Create Comment part Three (07:59)

## To add `__ref:"Comment:$n"`, have to write to fragment eventually.

```js
// Comments.tsx
const newCacheComment = cache.writeFragment({ // has __ref:"Comment:$n
  data: newComment,
  fragment: gql`
    fragment BSName on Comment {
      id
      createdAt
      isMine
      payload
      user {
        username
        avatar
      }
    }
  `,
});
...
              return [...prev, newCacheComment];
```

# #11.19 Delete Comment (12:17)

- minus
- button

## mutation at `Comment.tsx`

## delete from cache => `evict()`

## decrease `commentNumber` from `Photo`

```js
cache.evict({ id: `Comment:${id}` });
cache.modify({
  id: `Photo:${photoId}`,
  fields: {
    commentNumber(prev) {
      console.log(prev);
      return prev - 1;
    },
  },
});
```

# #12.0 useParams (08:40)

## Link to `Header.tsx`, `Photo.tsx`, `Comment.tsx`

## inherit color

```js
// styles.ts
a {
      ...
      color: inherit;
    }
```

## create Profile.tsx

```js
// touch src/screens/Profile.tsx

// App.tsx
...
<Route path={`/users/:username`}>
  <Profile />
</Route>
...
```

## `useParams` instead of useLocation

```js
// Profile.tsx
  const { username } = useParams<{ username: string }>();
```

# #12.1 Queries and Fragments (11:26)

## apollo convention review: 1st line for F.E, 2nd for B.E

## fragment

```js
touch src/fragments.ts
```

## same username but why at rootQuery? => Query need id? => try keyFields from id to username

# #12.2 keyFields (08:42)

## new cache config: userDefined keyFields

- it removes redundant data at root query and leave `__ref: $username` only

```ts
// apollo.ts
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: obj => `User:${obj.username}`,
      },
    },
  }),
});
```

# #12.3 Follow Unfollow part One (04:49)

## Profile, Grid, Icon.. at `Profile.tsx`

## Cover Profile with Layout at `App.tsx`

## Cover faHome with Link at `Header.tsx`

# #12.4 Follow Unfollow part Two (12:33)

### Ternary hell more than 2 ? => separate callback and use if case

```js
// Profile.tsx
const getButton = (seeProfile: seeProfile_seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return <ProfileBtn>Unfollow</ProfileBtn>;
    } else {
      return <ProfileBtn>Follow</ProfileBtn>;
    }
  };
...
    {data?.seeProfile ? getButton(data.seeProfile) : null}
```

### Styled as: extends property but change element type

### Helmet with loading

```
// index.html
<title>Instaclone</title>
```

### FOLLOW_USER_MUTATION, FOLLOW_USER_MUTATION at `Profile.tsx`

# #12.5 Follow Unfollow part Three (08:56)

## useMutation at 'Profile.tsx`

## Simple query? just try refetch, expensive or pagination? direct update with cache.modify

- add `totalFollowing, totalFollowers` to ME query and export

```js
const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
  variables: {
    username,
  },
  refetchQueries: [
    { query: SEE_PROFILE_QUERY, variables: { username } },
    { query: ME_QUERY },
  ],
});
```

## Homework: avatar default needed

## But refetch query need to refetch others as well..

# #12.6 Follow Unfollow part Four (09:49)

## update cache

### opt1. update function gives cache, result

### opt2. onCompleted but does not cache: just import apolloClient

```js
// Profile.tsx
const client = useApolloClient();
...
const followUserCompleted = (data: followUser) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      ...
```

## Homework: what is the case that has to be with writeFragement?

# #12.7 Follow Unfollow part Five (04:39)

## Even though there is no totalFollowing and totalFollower at me Query, if variable is added on cache, it works

```js
// Profile.tsx
cache.modify({
  id: `User:${userData?.me?.username}`,
  fields: {
    totalFollowing(prev) {
      return prev + 1;
    },
  },
});
```

# #12.8 Web Conclusions (02:42)

- reactive variable
- react hook form: editProfile
- styled extend, props, theme: darkmode
- apollo cache: a substitute of redux

# #19.5 Deploy Frontend (09:28)

## NODE_ENV ternary

```js
// apollo.ts
const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://instaclone-backend-henry.herokuapp.com/graphql"
      : "http://localhost:4001/graphql",
});
```

## `_redirects`

```js
// touch public/_redirects
/* /index.html 200
```
