import { StyledCategory } from "../styles/Category.styles";

interface CategoryProps {
  children: React.ReactNode;
}

export default function Category({ children }: CategoryProps) {
  return <StyledCategory>{children}</StyledCategory>;
}
