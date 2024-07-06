import { StyledButton } from "../styles/Button.styles";

function Button({ label, onSelect, isSelected }) {
  return (
    <StyledButton $isSelected={isSelected} onClick={onSelect}>
      {label}
    </StyledButton>
  );
}

export default Button;
