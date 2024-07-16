import { StyledButton } from "../styles/Button.styles";

interface ButtonProps {
  label: string;
  onSelect: () => void;
  isSelected: boolean;
}

function Button({ label, onSelect, isSelected }: ButtonProps) {
  return (
    <StyledButton $isSelected={isSelected} onClick={onSelect}>
      <span>{label}</span>
    </StyledButton>
  );
}

export default Button;
