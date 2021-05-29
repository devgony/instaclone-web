import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTtitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
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
