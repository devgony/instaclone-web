import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTtitle";
import { seeFeed } from "../__generated__/seeFeed";

export const FEED_QUERY = gql`
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
      commentNumber
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
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
      <PageTitle title="Home" />
      {data?.seeFeed?.map(
        photo => photo && <Photo key={photo.id} {...photo} />
      )}
      {/* <button onClick={() => logUserOut()}>Log out now!</button> */}
    </div>
  );
};
export default Home;
