import { MutationUpdaterFn, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import {
  createComment,
  createCommentVariables,
} from "../../__generated__/createComment";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${props => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;
const Comments: React.FC<
  Pick<seeFeed_seeFeed, "user" | "caption" | "commentNumber" | "comments"> & {
    photoId: number;
  }
> = ({ photoId, user: { username }, caption, commentNumber, comments }) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdate: MutationUpdaterFn<createComment> = (
    cache,
    result
  ) => {
    const { payload } = getValues();
    setValue("payload", "");
    if (result.data?.createComment) {
      const {
        data: {
          createComment: { ok, id },
        },
      } = result;
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
        const newCacheComment = cache.writeFragment({
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
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments(prev) {
              return [...prev, newCacheComment];
            },
            commentNumber(prev) {
              return prev + 1;
            },
          },
        });
      }
    }
  };
  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: createCommentUpdate,
  });
  const onValid = () => {
    const { payload } = getValues();
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };
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
              id={comment.id}
              isMine={comment.isMine}
              photoId={photoId}
            />
          )
      )}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            name="payload"
            ref={register({ required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default Comments;
