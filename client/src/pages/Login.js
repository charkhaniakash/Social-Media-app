// @ts-ignore
import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";

const Login = () => {
  const { onChange, values, onSubmit } = useForm(logingUser, {
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log("???/",result);
      navigate("/")
    },
    variables: values,
    onError(err) {
      console.log("err.graphQLErrors", err.graphQLErrors);
      setErrors(err.graphQLErrors[0]?.extensions?.errors);
    },
  });

  function logingUser() {
    loginUser()
  }

  return (
    <div className="form_container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values?.username}
          // @ts-ignore
          error={errors?.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values?.password}
          // @ts-ignore
          error={errors?.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary className={loading ? "loading" : ""}>
          Login
        </Button>
      </Form>

      {Object.keys(errors || {}).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors || {}).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
