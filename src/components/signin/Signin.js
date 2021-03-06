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
  signedinUser,
  getSigninState,
} from "../../features/messages/messageSlice.js";

// components
import ButtonComponent from "../button/Button";
import { toast } from "react-toastify";

// css with styled components
const Signin = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: inherit;
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

  & input {
    padding: 12px;
    border: none;
    border-radius: 4px;
    :focus {
      border: 0.5px solid #e74c3c;
    }
  }
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  & input {
    padding: 12px;
    border: none;
    border-radius: 4px;
    :focus {
      border: 0.5px solid #e74c3c;
    }
  }
`;

const SignedInMessage = styled.div`
  margin-bottom: 16px;
`;

const SigninComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // gets the states from the store
  const users = useSelector(getUsers);
  const signedIn = useSelector(getSigninState);

  // instantiating dispatch
  const dispatch = useDispatch();

  // instantiating history
  const history = useHistory();

  /**
   * @name fetchData
   * @description is used to trigger the fetchUsersAsync dispatch to fetches the users from fake server
   * @returns none
   */
  const fetchData = async () => {
    await dispatch(fetchUsersAsync());
  };

  /**
   * @name useEffect
   * @description runs only for the first time on re-render
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * @name handleSubmit
   * @desciption based on the email, password input redirects the user to dashboard or register page
   * @returns none
   */
  const handleSubmit = () => {
    if (email in users) {
      if (users[email].email === email && users[email].password) {
        history.push("/");
        dispatch(signedin(true));
        dispatch(
          signedinUser({
            author: email,
          })
        );
        toast.success("Signed in, Welcome to message board!");
      } else {
        toast.error("The password is incorrect, please enter the right one!");
      }
    } else {
      history.push("/register");
    }
  };

  /**
   * @name handleSignOut
   * @desciption dispatches the signout action that logs out the current user
   * @returns none
   */
  const handleSignOut = () => {
    dispatch(signedin(false));
    dispatch(
      signedinUser({
        author: "",
      })
    );
  };

  return (
    <Signin className="signin">
      {signedIn ? (
        <SigninContainer className="signin__c">
          <SignedInMessage className="signin__c__message">
            You are already signed in
          </SignedInMessage>
          <ButtonComponent
            type="cancel"
            label="Sign Out"
            className="signin__c__sign-out"
            handleClick={() => debounce(handleSignOut(), 500)}
          >
            <span>Sign Out</span>
          </ButtonComponent>
        </SigninContainer>
      ) : (
        <SigninContainer className="signin__c">
          <Email className="signin__c__email">
            <label htmlFor="email" className="signin__c__email__label">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              placeholder="Enter email"
              className="signin__c__email__input"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </Email>
          <Password className="signin__c__password">
            <label htmlFor="password" className="signin__c__password__label">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Enter password"
              className="signin__c__password__input"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </Password>
          <ButtonComponent
            type="check"
            label="Submit"
            className="signin__c__submit"
            disabled={email.length === 0 || password.length === 0}
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
