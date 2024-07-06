import { StyledButton } from "../styles/Button.styles";

function Button({ label, onSelect, isSelected }) {
  return (
    <StyledButton $isSelected={isSelected} onClick={onSelect}>
      <span>{label}</span>
    </StyledButton>
  );
}

export default Button;
