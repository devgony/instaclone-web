import { useReactiveVar } from "@apollo/client";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

type isLoggedInState = false | true;
export type setIsLoggedInState = React.Dispatch<
  React.SetStateAction<isLoggedInState>
>;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            <NotFound />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
