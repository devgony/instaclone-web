import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Photo from "../components/feed/Photo";
import { seeFeed } from "../__generated__/seeFeed";
import { toggleLike, toggleLikeVariables } from "../__generated__/toggleLike";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  return (
    <div>
      {data?.seeFeed?.map(
        photo => photo && <Photo key={photo.id} {...photo} />
      )}
      {/* <button onClick={() => logUserOut()}>Log out now!</button> */}
    </div>
  );
};
export default Home;
