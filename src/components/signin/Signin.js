// react
import { useState, useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";

// react router
import { useHistory } from "react-router-dom";

// styles with styled components
import styled from "styled-components";

// utils
import { debounce } from "../../utils/utils";

// redux actions and selectors
import {
  getUsers,
  fetchUsersAsync,
  signedin,
  getSigninState,
} from "../../features/messages/messageSlice.js";

// components
import ButtonComponent from "../button/Button";

const Signin = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 24px;
`;

const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  background: #f7f7f7;
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
`;

const SignedInMessage = styled.div`
  margin-bottom: 16px;
`;

const SigninComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const users = useSelector(getUsers);
  const signedIn = useSelector(getSigninState);

  // instantiating dispatch
  const dispatch = useDispatch();

  // instantiating history
  const history = useHistory();

  const fetchData = async () => {
    await dispatch(fetchUsersAsync());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (email in users) {
      if (users[email].email === email && users[email].password) {
        history.push("/");
        dispatch(signedin(true));
      } else {
        alert("The password is incorrect, please enter the right one!");
      }
    } else {
      history.push("/register");
    }
  };

  const handleSignOut = () => {
    dispatch(signedin(false));
  };

  return (
    <Signin>
      {signedIn ? (
        <SigninContainer>
          <SignedInMessage>You are already signed in</SignedInMessage>
          <ButtonComponent
            type="cancel"
            label="Sign Out"
            handleClick={() => debounce(handleSignOut(), 500)}
          >
            <span>Sign Out</span>
          </ButtonComponent>
        </SigninContainer>
      ) : (
        <SigninContainer>
          <Email>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </Email>
          <Password>
            <label htmlFor="reply">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </Password>
          <ButtonComponent
            type="check"
            label="Submit"
            handleClick={() => debounce(handleSubmit(), 500)}
          >
            <span>Submit</span>
          </ButtonComponent>
        </SigninContainer>
      )}
    </Signin>
  );
};

export default SigninComponent;
