import styled from "styled-components";

export const StyledButton = styled.button`
  height: fit-content;
  width: 70px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  border: none;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.4s;

  span {
    font-size: 1.2rem;
    font-family: "Urbanist", sans-serif;
    color: #dbd9d2;
    padding: 2px 5px;
    border: 1px solid transparent;
    border-bottom: 1px solid
      ${(props) => (props.$isSelected ? "#dbd9d2" : "transparent")};
  }
`;

// export const StyledButton = styled.button`
//   height: 35px;
//   width: 80px;
//   background-color: ${(props) =>
//     props.$isSelected ? "#dbd9d2" : "transparent"};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   transition: 0.4s;

//   span {
//     font-size: 1.2rem;
//     font-family: "Urbanist", sans-serif;
//     color: ${(props) => (props.$isSelected ? "black" : "#dbd9d2")};
//     padding: 2px 5px;
//   }
// `;
