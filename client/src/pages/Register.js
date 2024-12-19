// @ts-ignore
import { useMutation, gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/authContext";

const Register = (props) => {
  const { onChange, values, onSubmit } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const context = useContext(AuthContext);

  const navigate = useNavigate();

  const [addUserToDb, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      navigate("/");
    },
    variables: values,
    onError(err) {
      console.log("err.graphQLErrors", err.graphQLErrors);
      setErrors(err.graphQLErrors[0]?.extensions?.errors);
    },
  });

  function registerUser() {
    addUserToDb();
  }

  return (
    <div className="form_container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values?.email}
          // @ts-ignore
          error={errors?.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values?.confirmPassword}
          // @ts-ignore
          error={errors?.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary className={loading ? "loading" : ""}>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
