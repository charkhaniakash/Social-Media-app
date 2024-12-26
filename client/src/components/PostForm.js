import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { gql, useMutation } from "@apollo/client";

const PostForm = () => {
  const { values, onChange, onSubmit , setValues } = useForm(callBack, {
    body: "",
  });

  const [createPost, { error , loading }] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      // Read existing posts from cache
      const existingPosts = cache.readQuery({ query: GET_POSTS_DATA });

      // Add the new post to the list
      cache.writeQuery({
        query: GET_POSTS_DATA,
        data: {
          getPosts: [createPost, ...existingPosts.getPosts], // Add the new post at the beginning
        },
      });

      // Clear the form input
      values.body = "";
    },
    variables: values,
  });

  function callBack() {
    if(values.body === ""){
      alert("Please enter a post.")
      return;
    }
    createPost();
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h1>Create Form</h1>
        <Form.Input
          placeholder="Hi Akash .."
          name="body"
          type="text"
          value={values?.body}
          onChange={onChange}
          error={error ? true : false}
        />

        <Button type="submit" primary className={loading ? "loading" : ""}>
          Create a new 
        </Button>
      </Form>

      {error && (
        <div className="ui error message">
          <ul>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

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

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
