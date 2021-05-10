import { isLoggedInVar } from "../apollo";
import { setIsLoggedInState } from "../App";

const Home = () => (
  <div>
    <h1>Home</h1>
    <button onClick={() => isLoggedInVar(false)}>Log out now!</button>
  </div>
);
export default Home;
