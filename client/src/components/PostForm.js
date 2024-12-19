import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { gql, useMutation } from "@apollo/client";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(callBack, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(_, result) {
      values.body = "";
    },
    variables: values,
  });

  function callBack() {
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
          value={values?.user}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Create a new 
        </Button>
      </Form>
    </div>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
    id
    body
    user
    createdAt
    }
  }
`;

export default PostForm;
