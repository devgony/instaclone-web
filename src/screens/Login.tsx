import { ReactNode } from "react";
import { isLoggedInVar } from "../apollo";
import { setIsLoggedInState } from "../App";

const Login = () => (
  <div>
    <h1>Login</h1>
    <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
  </div>
);
export default Login;
