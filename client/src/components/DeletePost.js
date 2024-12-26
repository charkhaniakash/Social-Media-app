// @ts-nocheck
import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Confirm, Icon } from "semantic-ui-react";

const DeletePost = ({ postId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate()
  const [deletePost, error] = useMutation(DELETE_POST_MUTATION, {
    update(cache , {data :{deletePost}}) {

      setConfirmOpen(false);
      const existingPosts = cache.readQuery({ query: GET_POSTS_DATA });

      const updatePosts = existingPosts.getPosts.filter(post =>post.id !== postId)

      // Add the new post to the list
      cache.writeQuery({
        query: GET_POSTS_DATA,
        data: {
          getPosts: updatePosts
        },
      });
      navigate('/')

    },
    variables: { postId },
    onError(err) {
      console.log("err", err);
    },
  });

  return (
    <>
      <Button
        as="div"
        labelPosition="right"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" />
      </Button>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;


const GET_POSTS_DATA = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      comments {
        id
        createdAt
        body
      }
    }
  }
`;

export default DeletePost;
