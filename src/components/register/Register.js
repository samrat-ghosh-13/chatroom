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
  addUsersAsync,
} from "../../features/messages/messageSlice.js";

// components
import ButtonComponent from "../button/Button";
import { toast } from "react-toastify";

const Register = styled.div`
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

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  background: #f7f7f7;
`;

const Name = styled.div`
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

const Email = styled.div`
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

const Password = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  & input {
    padding: 12px;
    border: none;
    border-radius: 4px;
    :focus {
      border: 0.5px solid #e74c3c;
    }
  }
`;

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const users = useSelector(getUsers);

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

  const handleSubmit = async () => {
    if (email in users) {
      toast.warning("You are already registered with us, please proceed to sign in.");
      history.push("/signin");
    } else {
      await dispatch(
        addUsersAsync({
          user: {
            name: name,
            password: password,
            email: email,
          },
        })
      );
      history.push("/signin");
    }
  };

  return (
    <Register>
      <RegisterContainer>
        <Name>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </Name>
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
          disabled={
            email.length === 0 || password.length === 0 || name.length === 0
          }
          handleClick={() => debounce(handleSubmit(), 500)}
        >
          <span>Submit</span>
        </ButtonComponent>
      </RegisterContainer>
    </Register>
  );
};

export default RegisterComponent;
