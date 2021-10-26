// styled components
import styled from "styled-components";

// redux
import { useSelector, useDispatch } from "react-redux";

// react router
import { useHistory } from "react-router-dom";

// redux actions and selectors
import {
  getSigninState,
  signedin,
  signedinUser,
} from "../../features/messages/messageSlice.js";

// components
import ButtonComponent from "../button/Button";

// utils
import { debounce } from "../../utils/utils";

// css with styled components
const Header = styled.header`
  background: #f7f7f7;
  border-bottom: 1px solid #cfcfcf;
  color: #000;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  padding: 0 24px;
  max-width: 1240px;
  margin: 0 auto;
`;

const ContentsLeft = styled.div`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
  color: #0000ff;
`;

const ContentsRight = styled.div`
  display: flex;
`;

/**
 * @name HeaderComponent
 * @description method to create the header component
 * @returns header component
 */
const HeaderComponent = () => {
  // gets the states from the store
  const signedIn = useSelector(getSigninState);

  // instantiating dispatch
  const dispatch = useDispatch();

  // instantiating history
  const history = useHistory();

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

  /**
   * @name handleSignIn
   * @desciption redirects the user based on selection to sign in
   * @returns none
   */
  const handleSignIn = () => {
    history.push("/signin");
  };

  /**
   * @name handleRegister
   * @desciption redirects the user based on selection to register
   * @returns none
   */
  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <article>
      <Header className="app__header" data-testid="app__header">
        <Contents className="app__header__contents">
          <ContentsLeft
            className="app__header__contents__left"
            onClick={() => console.log("/")}
          >
            <p className="app__header__contents__left__text">Message Boards</p>
          </ContentsLeft>
          <ContentsRight className="app__header__contents__right">
            {signedIn ? (
              <ButtonComponent
                type="cancel"
                label="Sign Out"
                handleClick={() => debounce(handleSignOut(), 500)}
              >
                <span>Sign out</span>
              </ButtonComponent>
            ) : (
              <>
                <ButtonComponent
                  type="cancel"
                  label="Sign Out"
                  handleClick={() => debounce(handleSignIn(), 500)}
                >
                  <span>Sign in</span>
                </ButtonComponent>
                <ButtonComponent
                  type="check"
                  label="Register"
                  handleClick={() => debounce(handleRegister(), 500)}
                >
                  <span>Register</span>
                </ButtonComponent>
              </>
            )}
          </ContentsRight>
        </Contents>
      </Header>
    </article>
  );
};

export default HeaderComponent;
