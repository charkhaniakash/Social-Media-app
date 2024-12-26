import { createContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem('jwtToken')) {
  const decodeToken = jwtDecode(localStorage.getItem('jwtToken'));
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodeToken;
  }
}
const AuthContext = createContext({
  user: null,
  // @ts-ignore
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    // @ts-ignore
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  function logout() {
    localStorage.removeItem("jwtToken");
    // @ts-ignore
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
