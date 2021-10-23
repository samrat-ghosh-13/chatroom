// styled components
import styled from "styled-components";

// css with styled components
const Footer = styled.footer`
  background: #f7f7f7;
  border-top: 1px solid #ededed;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
`;

const Div = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: #00243d;
`;

const Span = styled.span`
  margin-left: 4px;
  margin-right: 8px;
`;

const Anchor = styled.a`
  margin: 0 4px;
`;

/**
 * @name FooterComponent
 * @description method to create the footer component
 * @returns footer component
 */
const FooterComponent = () => {
  return (
    <article>
      <Footer className="app__footer" data-testid="app__footer">
        <Div
          className="app__footer__contents"
          data-testid="app__footer__contents"
        >
          Made with <Span className="app__footer__contents__logo">❤️</Span> by
          <Anchor
            href="https://www.linkedin.com/in/samratat/"
            target="_blank"
            rel="noreferrer"
          >
            Samrat Ghosh
          </Anchor>
          © 2021
        </Div>
      </Footer>
    </article>
  );
};

export default FooterComponent;
