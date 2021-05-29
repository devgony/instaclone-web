import { MutationUpdaterFn, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";
import { FatText } from "../shared";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comment: React.FC<{
  username: string;
  payload: string;
  id?: number;
  isMine?: boolean;
  photoId?: number;
}> = ({ username, payload, id, isMine, photoId }) => {
  const updateDeleteComment: MutationUpdaterFn<deleteComment> = (
    cache,
    result
  ) => {
    if (result.data?.deleteComment.ok) {
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
    }
  };
  const [deleteCommentMutation] = useMutation<
    deleteComment,
    deleteCommentVariables
  >(DELETE_COMMENT_MUTATION, {
    ...(id && { variables: { id } }),
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      <Link to={`/users/${username}`}>
        <FatText>{username}</FatText>
      </Link>
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
      {isMine ? <button onClick={onDeleteClick}>🆇</button> : null}
    </CommentContainer>
  );
};

export default Comment;
