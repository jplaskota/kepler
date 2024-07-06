import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: transparent;
  font-size: 1.2rem;
  font-family: "Urbanist", sans-serif;
  color: #dbd9d2;
  margin: 0 10px;
  border: 1px solid transparent;
  border-bottom: 1px solid
    ${(props) => (props.$isSelected ? "#dbd9d2" : "transparent")};
  cursor: pointer;
  transition: 0.4s;
`;
