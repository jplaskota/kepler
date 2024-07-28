import { StyledButton } from "../styles/Button.styles";

interface ButtonProps {
  label: string;
  onSelect: () => void;
  isSelected: boolean;
}

export default function Button({ label, onSelect, isSelected }: ButtonProps) {
  return (
    <StyledButton $isSelected={isSelected} onClick={onSelect}>
      <span>{label}</span>
    </StyledButton>
  );
}
