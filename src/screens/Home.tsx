import { isLoggedInVar, logUserOut } from "../apollo";
import { setIsLoggedInState } from "../App";

const Home = () => (
  <div>
    <h1>Home: Welcome w did it!</h1>
    <button onClick={() => logUserOut()}>Log out now!</button>
  </div>
);
export default Home;
