// styled components
import styled from "styled-components";

// prop-types
import { node, string, bool, func, oneOf } from "prop-types";

// css with styled components
const Button = styled.button`
  border: 1px solid #000;
  border-radius: 40px;
  padding: 8px;
  color: #fff;
  width: 160px;
  margin-left: ${(props) => (props.type === "cancel" ? "0" : "16px")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background: ${(props) => (props.type === "cancel" ? "#000" : "#0000FF")};
`;

const Span = styled.span`
  color: #fff;
`;

/**
 * @name ButtonComponent
 * @description method to create the button component
 * @param {*} classname
 * @param {*} type
 * @param {*} size
 * @param {*} children
 * @param {*} disabled
 * @param {*} handleClick
 * @param {*} ...props (custom props)
 * @returns button component
 */
const ButtonComponent = ({
  type,
  classname,
  children,
  disabled,
  size,
  handleClick,
  label,
  ...props
}) => {
  return (
    <Button
      data-testid="button"
      className={`button ${classname} ${size} ${type}`}
      size={size}
      type={type}
      disabled={disabled}
      onClick={(event) => handleClick(event)}
      aria-label={label}
      {...props}
    >
      <Span className="button__text" data-testid="button__text">
        {children}
      </Span>
    </Button>
  );
};

ButtonComponent.propTypes = {
  children: node.isRequired,
  disabled: bool,
  handleClick: func.isRequired,
  classname: string,
  type: string,
  size: oneOf([
    "button--medium",
    "button--large",
    "button--extra-large",
    "button--small",
    "button--extra-small",
  ]),
};

ButtonComponent.defaultProps = {
  disabled: false,
  classname: "",
  type: "",
  size: "button--medium",
  label: "button",
};

export default ButtonComponent;
