import { StyledButton } from "../styles/Button.styles";

function Button({ label, onSelect }) {
  return <StyledButton onClick={onSelect}>{label}</StyledButton>;
}

export default Button;
