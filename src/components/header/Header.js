// styled components
import styled from "styled-components";

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
  z-index: 9999;
`;

const Contents = styled.div`
  display: flex;
  justify-content: flex-start;
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
  color: #0000FF;
`;

/**
 * @name HeaderComponent
 * @description method to create the header component
 * @returns header component
 */
const HeaderComponent = () => {
  return (
    <article>
      <Header className="app__header" data-testid="app__header">
        <Contents className="app__header__contents">
          <ContentsLeft
            className="app__header__contents__left"
            onClick={() => console.log("/")}
          >
            <p className="app__header__contents__left__text">
              Message Boards
            </p>
          </ContentsLeft>
        </Contents>
      </Header>
    </article>
  );
};

export default HeaderComponent;
