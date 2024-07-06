import { StyledCategory } from "../styles/Category.styles";

interface CategoryProps {
  children: React.ReactNode;
}

function Category({ children }: CategoryProps) {
  return <StyledCategory>{children}</StyledCategory>;
}

export default Category;
