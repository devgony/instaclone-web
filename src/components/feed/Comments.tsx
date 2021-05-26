import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { FatText } from "../shared";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

const Comments: React.FC<
  Pick<seeFeed_seeFeed, "user" | "caption" | "commentNumber" | "comments">
> = ({ user: { username }, caption, commentNumber, comments }) => {
  return (
    <CommentsContainer>
      {caption && <Comment username={username} payload={caption} />}
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map(
        comment =>
          comment && (
            <Comment
              key={comment.id}
              username={comment.user.username}
              payload={comment.payload}
            />
          )
      )}
    </CommentsContainer>
  );
};

export default Comments;
